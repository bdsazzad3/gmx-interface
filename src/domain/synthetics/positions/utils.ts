import { BigNumber } from "ethers";
import { BASIS_POINTS_DIVISOR, MAX_LEVERAGE, USD_DECIMALS } from "lib/legacy";
import { expandDecimals, formatAmount } from "lib/numbers";
import { MarketsData, getMarket, getMarketName } from "../markets";
import { TokenPrices, TokensData, convertToUsdByPrice, formatUsdAmount, getTokenData } from "../tokens";
import { AggregatedPositionData, PositionsData } from "./types";
import { NATIVE_TOKEN_ADDRESS } from "config/tokens";
import { PositionsUpdates } from "../contractEvents";
import { getPositionUpdate } from "../contractEvents/utils";

export function getPosition(positionsData: PositionsData, positionKey?: string) {
  if (!positionKey) return undefined;

  return positionsData[positionKey];
}

export function getPositionKey(account?: string, market?: string, collateralToken?: string, isLong?: boolean) {
  if (!account || !market || !collateralToken || isLong === undefined) return undefined;

  return `${account}-${market}-${collateralToken}-${isLong}`;
}

export function parsePositionKey(positionKey: string) {
  const [account, market, collateralToken, isLong] = positionKey.split("-");

  return { account, market, collateralToken, isLong: isLong === "true" };
}

export function getAggregatedPositionData(
  positionsData: PositionsData,
  marketsData: MarketsData,
  tokensData: TokensData,
  pendingUpdates: PositionsUpdates,
  contractUpdates: PositionsUpdates,
  positionKey?: string
): AggregatedPositionData | undefined {
  const position = getPosition(positionsData, positionKey);

  if (!position) return undefined;

  const pendingUpdate = getPositionUpdate(pendingUpdates, positionKey, { maxAge: 600 * 1000 });

  const contractUpdate = getPositionUpdate(contractUpdates, positionKey, {
    maxIncreasedAtBlock: position.increasedAtBlock,
    maxDecreasedAtBlock: position.decreasedAtBlock,
  });

  if (contractUpdate) {
    const sign = contractUpdate.isIncrease ? 1 : -1;
    position.sizeInUsd = position.sizeInUsd.add(contractUpdate.sizeDeltaUsd?.mul(sign) || 0);
    position.collateralAmount = position.collateralAmount.add(contractUpdate.collateralDeltaAmount?.mul(sign) || 0);
  }

  const market = getMarket(marketsData, position?.marketAddress);

  const collateralToken = getTokenData(tokensData, position?.collateralTokenAddress);
  const pnlToken = getTokenData(tokensData, position.isLong ? market?.longTokenAddress : market?.shortTokenAddress);
  const indexToken = getTokenData(
    tokensData,
    market?.isIndexWrapped ? NATIVE_TOKEN_ADDRESS : market?.indexTokenAddress
  );

  const marketName = getMarketName(marketsData, tokensData, position?.marketAddress, false, false);

  const markPrice = position.isLong ? indexToken?.prices?.minPrice : indexToken?.prices?.maxPrice;
  const pnlPrice = getPriceForPnl(indexToken?.prices, position.isLong, false);
  const averagePrice = indexToken?.prices?.minPrice.add(indexToken?.prices?.maxPrice).div(2);

  const collateralPrice = getPriceForPnl(collateralToken?.prices, position.isLong, false);

  const entryPrice = indexToken
    ? position.sizeInUsd.div(position.sizeInTokens).mul(expandDecimals(1, indexToken.decimals))
    : undefined;

  const currentValueUsd =
    indexToken && pnlPrice ? convertToUsdByPrice(position.sizeInTokens, indexToken.decimals, pnlPrice) : undefined;

  const collateralUsd =
    collateralToken && collateralPrice
      ? convertToUsdByPrice(position.collateralAmount, collateralToken.decimals, collateralPrice)
      : undefined;

  const pnl = currentValueUsd?.sub(position.sizeInUsd).mul(position.isLong ? 1 : -1);

  const pnlPercentage = collateralUsd && pnl ? pnl.mul(BASIS_POINTS_DIVISOR).div(collateralUsd) : undefined;

  const pendingFundingFeesUsd =
    collateralPrice && collateralToken
      ? convertToUsdByPrice(position.pendingFundingFees.fundingFeeAmount, collateralToken.decimals, collateralPrice)
      : undefined;

  const totalPendingFeesUsd = pendingFundingFeesUsd
    ? position.pendingBorrowingFees.add(pendingFundingFeesUsd)
    : undefined;

  const netValue = pnl && collateralUsd ? collateralUsd.add(pnl).sub(position.pendingBorrowingFees) : undefined;

  const collateralUsdAfterFees = totalPendingFeesUsd ? collateralUsd?.sub(totalPendingFeesUsd) : undefined;
  const pnlAfterFees = totalPendingFeesUsd ? pnl?.sub(totalPendingFeesUsd) : undefined;

  const pnlAfterFeesPercentage =
    collateralUsdAfterFees && pnlAfterFees
      ? pnlAfterFees.mul(BASIS_POINTS_DIVISOR).div(collateralUsdAfterFees)
      : undefined;

  const hasLowCollateral = collateralUsdAfterFees?.lt(expandDecimals(1, USD_DECIMALS));

  const leverage = getLeverage({
    sizeUsd: position.sizeInUsd,
    collateralUsd,
  });

  const liqPrice = getLiquidationPrice({
    sizeUsd: position.sizeInUsd,
    collateralUsd,
    averagePrice,
    isLong: position.isLong,
    // TODO: liquidationFee?
    feesUsd: totalPendingFeesUsd,
  });

  return {
    ...position,
    marketName,
    indexToken,
    collateralToken,
    pnlToken,
    currentValueUsd,
    collateralUsd,
    collateralUsdAfterFees,
    hasLowCollateral,
    averagePrice,
    markPrice,
    pnl,
    pnlPercentage,
    pnlAfterFees,
    pnlAfterFeesPercentage,
    netValue,
    leverage,
    liqPrice,
    entryPrice,
    pendingFundingFeesUsd,
    totalPendingFeesUsd,
    pendingUpdate,
  };
}

export function getLiquidationPrice(p: {
  sizeUsd?: BigNumber;
  collateralUsd?: BigNumber;
  feesUsd?: BigNumber;
  averagePrice?: BigNumber;
  isLong?: boolean;
}) {
  if (!p.sizeUsd || !p.collateralUsd || !p.averagePrice) return undefined;

  const liqPriceForFees = getLiquidationPriceFromDelta({
    liquidationAmountUsd: p.feesUsd,
    sizeUsd: p.sizeUsd,
    collateralUsd: p.collateralUsd,
    averagePrice: p.averagePrice,
    isLong: p.isLong,
  });

  const liqPriceForMaxLeverage = getLiquidationPriceFromDelta({
    liquidationAmountUsd: p.sizeUsd.mul(BASIS_POINTS_DIVISOR).div(MAX_LEVERAGE),
    sizeUsd: p.sizeUsd,
    collateralUsd: p.collateralUsd,
    averagePrice: p.averagePrice,
    isLong: p.isLong,
  });

  if (!liqPriceForFees) {
    return liqPriceForMaxLeverage;
  }

  if (!liqPriceForMaxLeverage) {
    return liqPriceForFees;
  }

  if (p.isLong) {
    // return the higher price
    return liqPriceForFees.gt(liqPriceForMaxLeverage) ? liqPriceForFees : liqPriceForMaxLeverage;
  }

  // return the lower price
  return liqPriceForFees.lt(liqPriceForMaxLeverage) ? liqPriceForFees : liqPriceForMaxLeverage;
}

export function getLiquidationPriceFromDelta(p: {
  liquidationAmountUsd?: BigNumber;
  sizeUsd?: BigNumber;
  collateralUsd?: BigNumber;
  averagePrice?: BigNumber;
  isLong?: boolean;
}) {
  if (!p.sizeUsd || !p.collateralUsd || !p.averagePrice || !p.liquidationAmountUsd) {
    return undefined;
  }

  if (p.liquidationAmountUsd.gt(p.collateralUsd)) {
    const liquidationDelta = p.liquidationAmountUsd.sub(p.collateralUsd);
    const priceDelta = liquidationDelta.mul(p.averagePrice).div(p.sizeUsd);

    return p.isLong ? p.averagePrice.add(priceDelta) : p.averagePrice.sub(priceDelta);
  }

  const liquidationDelta = p.collateralUsd.sub(p.liquidationAmountUsd);
  const priceDelta = liquidationDelta.mul(p.averagePrice).div(p.sizeUsd);

  return p.isLong ? p.averagePrice.sub(priceDelta) : p.averagePrice.add(priceDelta);
}

export function getLeverage(p: { sizeUsd?: BigNumber; collateralUsd?: BigNumber }) {
  if (!p.sizeUsd?.gt(0) || !p.collateralUsd?.gt(0)) {
    return undefined;
  }

  return p.sizeUsd.mul(BASIS_POINTS_DIVISOR).div(p.collateralUsd);
}

export function getPriceForPnl(tokenPrices?: TokenPrices, isLong?: boolean, maximize?: boolean) {
  if (!tokenPrices) return undefined;

  if (isLong) {
    return maximize ? tokenPrices.maxPrice : tokenPrices.minPrice;
  }

  return maximize ? tokenPrices.minPrice : tokenPrices.maxPrice;
}

export function formatPnl(pnl?: BigNumber, pnlPercentage?: BigNumber) {
  const sign = pnl && pnl.lt(0) ? "-" : "+";

  return `${sign}${formatUsdAmount(pnl?.abs())} (${sign}${formatAmount(pnlPercentage?.abs(), 2, 2)}%)`;
}

export function formatLeverage(leverage?: BigNumber) {
  if (!leverage) return "...";

  return `${formatAmount(leverage, 4, 2)}x`;
}
