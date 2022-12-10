/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { SwapUtils, SwapUtilsInterface } from "../../../contracts/swap/SwapUtils";

const _abi = [
  {
    inputs: [
      {
        internalType: "uint256",
        name: "outputAmount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "minOutputAmount",
        type: "uint256",
      },
    ],
    name: "InsufficientSwapOutputAmount",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "string",
        name: "reason",
        type: "string",
      },
    ],
    name: "SwapReverted",
    type: "event",
  },
];

const _bytecode =
  "0x60566037600b82828239805160001a607314602a57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe73000000000000000000000000000000000000000030146080604052600080fdfea2646970667358221220f54810b2b95322c075f75d70ac70eb5cc9ab72e07f0bf9139ad8b6585e9a8a9464736f6c63430008100033";

type SwapUtilsConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: SwapUtilsConstructorParams): xs is ConstructorParameters<typeof ContractFactory> =>
  xs.length > 1;

export class SwapUtils__factory extends ContractFactory {
  constructor(...args: SwapUtilsConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<SwapUtils> {
    return super.deploy(overrides || {}) as Promise<SwapUtils>;
  }
  override getDeployTransaction(overrides?: Overrides & { from?: PromiseOrValue<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): SwapUtils {
    return super.attach(address) as SwapUtils;
  }
  override connect(signer: Signer): SwapUtils__factory {
    return super.connect(signer) as SwapUtils__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): SwapUtilsInterface {
    return new utils.Interface(_abi) as SwapUtilsInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): SwapUtils {
    return new Contract(address, _abi, signerOrProvider) as SwapUtils;
  }
}
