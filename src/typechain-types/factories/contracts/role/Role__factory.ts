/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { Role, RoleInterface } from "../../../contracts/role/Role";

const _abi = [
  {
    inputs: [],
    name: "ADL_KEEPER",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "CONTROLLER",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FEE_KEEPER",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "FROZEN_ORDER_KEEPER",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "LIQUIDATION_KEEPER",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "MARKET_KEEPER",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ORDER_KEEPER",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "PRICING_KEEPER",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "ROUTER_PLUGIN",
    outputs: [
      {
        internalType: "bytes32",
        name: "",
        type: "bytes32",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
];

const _bytecode =
  "0x6102f661003a600b82828239805160001a60731461002d57634e487b7160e01b600052600060045260246000fd5b30600052607381538281f3fe730000000000000000000000000000000000000000301460806040526004361061008d5760003560e01c80635fac3ab1146100925780636ed0f620146100ac5780639b8b49f8146100b45780639ecff617146100bc578063a0074230146100c4578063cf7fb1d0146100cc578063ee0fc121146100d4578063f13c5a4b146100dc578063fd663163146100e4575b600080fd5b61009a6100ec565b60405190815260200160405180910390f35b61009a610136565b61009a610166565b61009a610197565b61009a6101c9565b61009a610200565b61009a61022e565b61009a61025c565b61009a610292565b60405160200161011d906020808252600d908201526c26a0a925a2aa2fa5a2a2a822a960991b604082015260600190565b6040516020818303038152906040528051906020012081565b60405160200161011d906020808252600c908201526b27a92222a92fa5a2a2a822a960a11b604082015260600190565b60405160200161011d906020808252600d908201526c2927aaaa22a92fa8262aa3a4a760991b604082015260600190565b60405160200161011d906020808252600e908201526d282924a1a4a723afa5a2a2a822a960911b604082015260600190565b60405160200161011d90602080825260139082015272232927ad22a72fa7a92222a92fa5a2a2a822a960691b604082015260600190565b60405160200161011d906020808252600a90820152692322a2afa5a2a2a822a960b11b604082015260600190565b60405160200161011d906020808252600a908201526921a7a72a2927a62622a960b11b604082015260600190565b60405160200161011d906020808252601290820152712624a8aaa4a220aa24a7a72fa5a2a2a822a960711b604082015260600190565b60405160200161011d906020808252600a908201526920a2262fa5a2a2a822a960b11b60408201526060019056fea2646970667358221220a5e411b6e987c302a6354476ece4229b31bc38efd6d336b2a1c37c1b2b9de8e564736f6c63430008100033";

type RoleConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: RoleConstructorParams): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Role__factory extends ContractFactory {
  constructor(...args: RoleConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<Role> {
    return super.deploy(overrides || {}) as Promise<Role>;
  }
  override getDeployTransaction(overrides?: Overrides & { from?: PromiseOrValue<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): Role {
    return super.attach(address) as Role;
  }
  override connect(signer: Signer): Role__factory {
    return super.connect(signer) as Role__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): RoleInterface {
    return new utils.Interface(_abi) as RoleInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Role {
    return new Contract(address, _abi, signerOrProvider) as Role;
  }
}
