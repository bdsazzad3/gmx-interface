import DataStore from "abis/DataStore.json";
import GlvReader from "abis/GlvReader.json";
import TokenAbi from "abis/Token.json";

import { getContract } from "config/contracts";
import {
  glvMaxMarketTokenBalanceAmountKey,
  glvMaxMarketTokenBalanceUsdKey,
  glvShiftLastExecutedAtKey,
  glvShiftMinIntervalKey,
  isGlvMarketDisabledKey,
} from "config/dataStore";
import { getTokenBySymbol, TOKENS } from "config/tokens";
import { MulticallRequestConfig, useMulticall } from "lib/multicall";
import { getGlvMarketName, MarketInfo, MarketsInfoData } from "../markets";
import { TokenData, TokensData } from "./types";

export type GlvList = {
  glv: {
    glvToken: string;
    longToken: string;
    shortToken: string;
  };
  markets: string[];
}[];

export type GlvPoolsData = {
  [key in string]: GlvPoolInfo;
};

export interface GlvPoolInfo extends MarketInfo {
  isGlv: true;
  marketTokenAddress: string;
  indexTokenAddress: string;
  longTokenAddress: string;
  shortTokenAddress: string;
  markets: GlvMarket[];
  glvShiftLastExecutedAt: bigint;
  glvShiftMinInterval: bigint;
}

export interface GlvMarket {
  address: string;
  isDisabled: boolean;
  maxMarketTokenBalanceUsd: bigint;
  glvMaxMarketTokenBalanceAmount: bigint;
  gmBalance: bigint;
}

type GlvsRequestConfig = MulticallRequestConfig<{
  glvs: {
    calls: {
      list: {
        methodName: string;
        params: [string, number, number];
      };
    };
  };
}>;

export function useGlvPoolsInfo(
  enabled: boolean,
  deps: {
    marketsInfoData: MarketsInfoData | undefined;
    tokensData: TokensData | undefined;
    chainId: number;
    account: string | undefined;
  }
) {
  const { marketsInfoData, tokensData, chainId, account } = deps;
  const dataStoreAddress = getContract(chainId, "DataStore");
  const glvReaderAddress = getContract(chainId, "GlvReader");

  const { data: glvs, isLoading: isLoadingGlvs } = useMulticall<GlvsRequestConfig, GlvList>(
    chainId,
    "useGlvTokenMarkets",
    {
      key: enabled ? ["glvMarkets", chainId] : undefined,
      request: () => {
        return {
          glvs: {
            contractAddress: glvReaderAddress,
            abi: GlvReader.abi,
            calls: {
              list: {
                methodName: "getGlvInfoList",
                params: [dataStoreAddress, 0, 100],
              },
            },
          },
        };
      },
      parseResponse(result) {
        return result.data.glvs.list.returnValues as GlvList;
      },
    }
  );

  const shouldRequest = enabled && glvs && marketsInfoData && tokensData && account;

  const { data: glvPoolsInfo, isLoading: isLoadingGlvsInfo } = useMulticall<{}, GlvPoolsData | undefined>(
    chainId,
    "useGlvMarketsInfos",
    {
      key: shouldRequest ? ["glvMarketsInfos", chainId, glvs, account] : shouldRequest,
      request: () => {
        if (!shouldRequest) {
          return {};
        }

        const request = glvs.reduce((acc, { glv, markets }) => {
          acc[glv.glvToken + "-prices"] = {
            contractAddress: glvReaderAddress,
            abi: GlvReader.abi,
            calls: {
              glvTokenPriceMin: {
                methodName: "getGlvTokenPrice",
                params: [
                  dataStoreAddress,
                  markets,
                  markets.map((market) => {
                    return [
                      marketsInfoData[market].indexToken.prices.minPrice,
                      marketsInfoData[market].indexToken.prices.maxPrice,
                    ];
                  }),
                  [tokensData[glv.longToken].prices.maxPrice, tokensData[glv.longToken].prices.minPrice],
                  [tokensData[glv.shortToken].prices.maxPrice, tokensData[glv.shortToken].prices.minPrice],
                  glv.glvToken,
                  false,
                ],
              },
              glvTokenPriceMax: {
                methodName: "getGlvTokenPrice",
                params: [
                  dataStoreAddress,
                  markets,
                  markets.map((market) => {
                    return [
                      marketsInfoData[market].indexToken.prices.minPrice,
                      marketsInfoData[market].indexToken.prices.maxPrice,
                    ];
                  }),
                  [tokensData[glv.longToken].prices.maxPrice, tokensData[glv.longToken].prices.minPrice],
                  [tokensData[glv.shortToken].prices.maxPrice, tokensData[glv.shortToken].prices.minPrice],
                  glv.glvToken,
                  true,
                ],
              },
            },
          };

          acc[glv.glvToken + "-tokenData"] = {
            contractAddress: glv.glvToken,
            abi: TokenAbi.abi,
            calls: {
              totalSupply: {
                methodName: "totalSupply",
                params: [],
              },
              balance: {
                methodName: "balanceOf",
                params: [account],
              },
            },
          };

          acc[glv.glvToken + "-info"] = {
            contractAddress: dataStoreAddress,
            abi: DataStore.abi,
            calls: {
              glvShiftLastExecutedAt: {
                methodName: "getUint",
                params: [glvShiftLastExecutedAtKey(glv.glvToken)],
              },
              glvShiftMinInterval: {
                methodName: "getUint",
                params: [glvShiftMinIntervalKey(glv.glvToken)],
              },
            },
          };

          markets.forEach((market) => {
            acc[glv.glvToken + "-" + market + "-info"] = {
              contractAddress: dataStoreAddress,
              abi: DataStore.abi,
              calls: {
                maxMarketTokenBalanceUsd: {
                  methodName: "getUint",
                  params: [glvMaxMarketTokenBalanceUsdKey(glv.glvToken, market)],
                },
                glvMaxMarketTokenBalanceAmount: {
                  methodName: "getUint",
                  params: [glvMaxMarketTokenBalanceAmountKey(glv.glvToken, market)],
                },
                isGlvMarketDisabled: {
                  methodName: "getBool",
                  params: [isGlvMarketDisabledKey(glv.glvToken, market)],
                },
              },
            };
          });

          markets.forEach((market) => {
            acc[glv.glvToken + "-" + market + "-gm-balance"] = {
              contractAddress: market,
              abi: TokenAbi.abi,
              calls: {
                balance: {
                  methodName: "balanceOf",
                  params: [glv.glvToken],
                },
              },
            };
          });

          return acc;
        }, {});

        return request;
      },
      parseResponse({ data }) {
        if (!glvs || !marketsInfoData || !tokensData || !account) {
          return undefined;
        }

        const result: GlvPoolsData = {};
        glvs.forEach(({ glv, markets }) => {
          const pricesMax = data[glv.glvToken + "-prices"].glvTokenPriceMax.returnValues;
          const pricesMin = data[glv.glvToken + "-prices"].glvTokenPriceMax.returnValues;
          const [priceMin, usdAmountMin, totalSupply] = pricesMax;
          const [priceMax, usdAmountMax] = pricesMin;

          const glvName = getGlvMarketName(chainId, glv.glvToken);

          const tokenConfig = getTokenBySymbol(chainId, "GLV");

          const indexToken: TokenData = {
            ...tokenConfig,
            address: glv.glvToken,
            prices: {
              minPrice: priceMin,
              maxPrice: priceMax,
            },
            totalSupply: totalSupply,
            // @todo
            usdAmountMax: usdAmountMax,
            usdAmountMin: usdAmountMin,
            balance: data[glv.glvToken + "-tokenData"].balance.returnValues[0],
            ...data[glv.glvToken + "-tokenData"].returnValues,
          };

          result[glv.glvToken] = {
            ...glv,
            ...data[glv.glvToken + "-info"].returnValues,
            isGlv: true,
            indexToken: indexToken,
            longToken: tokensData[glv.longToken],
            shortToken: tokensData[glv.shortToken],
            isSpotOnly: false,
            indexTokenAddress: glv.glvToken,
            marketTokenAddress: glv.glvToken,
            longTokenAddress: glv.longToken,
            shortTokenAddress: glv.shortToken,
            totalSupply,
            name: glvName,
            isDisabled: markets.every(
              (market) => data[glv.glvToken + "-" + market + "-info"].isGlvMarketDisabled.returnValues[0]
            ),
            markets: markets.map((market) => {
              const marketData = data[glv.glvToken + "-" + market + "-info"];
              const marketBalance = data[glv.glvToken + "-" + market + "-gm-balance"].balance.returnValues[0];
              return {
                address: market,
                isDisabled: marketData.isGlvMarketDisabled.returnValues[0],
                maxMarketTokenBalanceUsd: marketData.maxMarketTokenBalanceUsd.returnValues[0],
                glvMaxMarketTokenBalanceAmount: marketData.glvMaxMarketTokenBalanceAmount.returnValues[0],
                gmBalance: marketBalance,
              };
            }),
          };
        });
        return result;
      },
    }
  );

  return {
    glvPoolsInfo,
    isLoading: isLoadingGlvs || isLoadingGlvsInfo,
  };
}
