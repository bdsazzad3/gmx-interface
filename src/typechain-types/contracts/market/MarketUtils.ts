/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import type { BaseContract, BigNumber, BytesLike, CallOverrides, PopulatedTransaction, Signer, utils } from "ethers";
import type { FunctionFragment, Result } from "@ethersproject/abi";
import type { Listener, Provider } from "@ethersproject/providers";
import type { TypedEventFilter, TypedEvent, TypedListener, OnEvent, PromiseOrValue } from "../../common";

export interface MarketUtilsInterface extends utils.Interface {
  functions: {
    "NO_SWAP()": FunctionFragment;
    "SWAP_COLLATERAL_TOKEN_TO_PNL_TOKEN()": FunctionFragment;
    "SWAP_PNL_TOKEN_TO_COLLATERAL_TOKEN()": FunctionFragment;
  };

  getFunction(
    nameOrSignatureOrTopic: "NO_SWAP" | "SWAP_COLLATERAL_TOKEN_TO_PNL_TOKEN" | "SWAP_PNL_TOKEN_TO_COLLATERAL_TOKEN"
  ): FunctionFragment;

  encodeFunctionData(functionFragment: "NO_SWAP", values?: undefined): string;
  encodeFunctionData(functionFragment: "SWAP_COLLATERAL_TOKEN_TO_PNL_TOKEN", values?: undefined): string;
  encodeFunctionData(functionFragment: "SWAP_PNL_TOKEN_TO_COLLATERAL_TOKEN", values?: undefined): string;

  decodeFunctionResult(functionFragment: "NO_SWAP", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "SWAP_COLLATERAL_TOKEN_TO_PNL_TOKEN", data: BytesLike): Result;
  decodeFunctionResult(functionFragment: "SWAP_PNL_TOKEN_TO_COLLATERAL_TOKEN", data: BytesLike): Result;

  events: {};
}

export interface MarketUtils extends BaseContract {
  connect(signerOrProvider: Signer | Provider | string): this;
  attach(addressOrName: string): this;
  deployed(): Promise<this>;

  interface: MarketUtilsInterface;

  queryFilter<TEvent extends TypedEvent>(
    event: TypedEventFilter<TEvent>,
    fromBlockOrBlockhash?: string | number | undefined,
    toBlock?: string | number | undefined
  ): Promise<Array<TEvent>>;

  listeners<TEvent extends TypedEvent>(eventFilter?: TypedEventFilter<TEvent>): Array<TypedListener<TEvent>>;
  listeners(eventName?: string): Array<Listener>;
  removeAllListeners<TEvent extends TypedEvent>(eventFilter: TypedEventFilter<TEvent>): this;
  removeAllListeners(eventName?: string): this;
  off: OnEvent<this>;
  on: OnEvent<this>;
  once: OnEvent<this>;
  removeListener: OnEvent<this>;

  functions: {
    NO_SWAP(overrides?: CallOverrides): Promise<[string]>;

    SWAP_COLLATERAL_TOKEN_TO_PNL_TOKEN(overrides?: CallOverrides): Promise<[string]>;

    SWAP_PNL_TOKEN_TO_COLLATERAL_TOKEN(overrides?: CallOverrides): Promise<[string]>;
  };

  NO_SWAP(overrides?: CallOverrides): Promise<string>;

  SWAP_COLLATERAL_TOKEN_TO_PNL_TOKEN(overrides?: CallOverrides): Promise<string>;

  SWAP_PNL_TOKEN_TO_COLLATERAL_TOKEN(overrides?: CallOverrides): Promise<string>;

  callStatic: {
    NO_SWAP(overrides?: CallOverrides): Promise<string>;

    SWAP_COLLATERAL_TOKEN_TO_PNL_TOKEN(overrides?: CallOverrides): Promise<string>;

    SWAP_PNL_TOKEN_TO_COLLATERAL_TOKEN(overrides?: CallOverrides): Promise<string>;
  };

  filters: {};

  estimateGas: {
    NO_SWAP(overrides?: CallOverrides): Promise<BigNumber>;

    SWAP_COLLATERAL_TOKEN_TO_PNL_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;

    SWAP_PNL_TOKEN_TO_COLLATERAL_TOKEN(overrides?: CallOverrides): Promise<BigNumber>;
  };

  populateTransaction: {
    NO_SWAP(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SWAP_COLLATERAL_TOKEN_TO_PNL_TOKEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;

    SWAP_PNL_TOKEN_TO_COLLATERAL_TOKEN(overrides?: CallOverrides): Promise<PopulatedTransaction>;
  };
}
