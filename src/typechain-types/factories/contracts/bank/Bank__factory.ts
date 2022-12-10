/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { Bank, BankInterface } from "../../../contracts/bank/Bank";

const _abi = [
  {
    inputs: [
      {
        internalType: "contract RoleStore",
        name: "_roleStore",
        type: "address",
      },
      {
        internalType: "contract DataStore",
        name: "_dataStore",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "NativeTokenTransferError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TokenTransferError",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "msgSender",
        type: "address",
      },
      {
        internalType: "string",
        name: "role",
        type: "string",
      },
    ],
    name: "Unauthorized",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: false,
        internalType: "address",
        name: "prevGov",
        type: "address",
      },
      {
        indexed: false,
        internalType: "address",
        name: "nextGov",
        type: "address",
      },
    ],
    name: "SetGov",
    type: "event",
  },
  {
    inputs: [],
    name: "dataStore",
    outputs: [
      {
        internalType: "contract DataStore",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gov",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address payable",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "recoverNativeToken",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "roleStore",
    outputs: [
      {
        internalType: "contract RoleStore",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "_gov",
        type: "address",
      },
    ],
    name: "setGov",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
    ],
    name: "transferOut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "token",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "address",
        name: "receiver",
        type: "address",
      },
      {
        internalType: "bool",
        name: "shouldUnwrapNativeToken",
        type: "bool",
      },
    ],
    name: "transferOut",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    stateMutability: "payable",
    type: "receive",
  },
];

const _bytecode =
  "0x60c060405234801561001057600080fd5b50604051610ec2380380610ec283398101604081905261002f916100cf565b81818161003b33610056565b6001600160a01b039081166080521660a05250610109915050565b600080546001600160a01b038381166001600160a01b031983168117909355604080519190921680825260208201939093527f53351836099c03ffc3b1727d8abd4b0222afa87d4ed76ae3102d51369ef7f785910160405180910390a15050565b6001600160a01b03811681146100cc57600080fd5b50565b600080604083850312156100e257600080fd5b82516100ed816100b7565b60208401519092506100fe816100b7565b809150509250929050565b60805160a051610d72610150600039600081816101140152818161020d01528181610250015281816103f201526106b001526000818160e0015261032c0152610d726000f3fe6080604052600436106100645760003560e01c806312d43a51146100705780632d891fba146100ac5780634a4a7b04146100ce578063660d0d67146101025780636bd3d4511461013657806388d44f4114610156578063cfad57a21461017657600080fd5b3661006b57005b600080fd5b34801561007c57600080fd5b50600054610090906001600160a01b031681565b6040516001600160a01b03909116815260200160405180910390f35b3480156100b857600080fd5b506100cc6100c7366004610ade565b610196565b005b3480156100da57600080fd5b506100907f000000000000000000000000000000000000000000000000000000000000000081565b34801561010e57600080fd5b506100907f000000000000000000000000000000000000000000000000000000000000000081565b34801561014257600080fd5b506100cc610151366004610b20565b6101f6565b34801561016257600080fd5b506100cc610171366004610b5a565b610237565b34801561018257600080fd5b506100cc610191366004610bad565b6102bb565b6101e66040516020016101a890610bd1565b604051602081830303815290604052805190602001206040518060400160405280600a81526020016921a7a72a2927a62622a960b11b815250610315565b6101f18383836103c5565b505050565b6102086040516020016101a890610bd1565b6102337f00000000000000000000000000000000000000000000000000000000000000008383610419565b5050565b6102496040516020016101a890610bd1565b60006102747f00000000000000000000000000000000000000000000000000000000000000006105d0565b9050806001600160a01b0316856001600160a01b03161480156102945750815b156102a9576102a4858585610683565b6102b4565b6102b48585856103c5565b5050505050565b6000546001600160a01b03163314610309576040805163a35b150b60e01b81523360048201526024810191909152600360448201526223a7ab60e91b60648201526084015b60405180910390fd5b610312816106d7565b50565b60405163ac4ab3fb60e01b81526001600160a01b037f0000000000000000000000000000000000000000000000000000000000000000169063ac4ab3fb906103639033908690600401610bf5565b602060405180830381865afa158015610380573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906103a49190610c0e565b61023357338160405163a35b150b60e01b8152600401610300929190610c7b565b306001600160a01b038216036103ed5760405162461bcd60e51b815260040161030090610ca7565b6101f17f0000000000000000000000000000000000000000000000000000000000000000848385610738565b8060000361042657505050565b6000836001600160a01b031663bd02d0f5604051602001610478906020808252601f908201527f4e41544956455f544f4b454e5f5452414e534645525f4741535f4c494d495400604082015260600190565b604051602081830303815290604052805190602001206040518263ffffffff1660e01b81526004016104ac91815260200190565b602060405180830381865afa1580156104c9573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906104ed9190610cd7565b9050600080846001600160a01b0316848490604051600060405180830381858888f193505050503d8060008114610540576040519150601f19603f3d011682016040523d82523d6000602084013e610545565b606091505b5091509150811561055857505050505050565b60008160405160200161056b9190610cf0565b60405160208183030381529060405290507f6c4e9d88878940a822d239187b8b00d62a80dce222d53bc5f1fb072d9c34b681816040516105ab9190610cf0565b60405180910390a18585604051633828654560e11b8152600401610300929190610bf5565b6000816001600160a01b03166321f8a7216040516020016106089060208082526003908201526215d39560ea1b604082015260600190565b604051602081830303815290604052805190602001206040518263ffffffff1660e01b815260040161063c91815260200190565b602060405180830381865afa158015610659573d6000803e3d6000fd5b505050506040513d601f19601f8201168201806040525081019061067d9190610d03565b92915050565b306001600160a01b038216036106ab5760405162461bcd60e51b815260040161030090610ca7565b6101f17f000000000000000000000000000000000000000000000000000000000000000084838561086e565b600080546001600160a01b038381166001600160a01b031983168117909355604080519190921680825260208201939093527f53351836099c03ffc3b1727d8abd4b0222afa87d4ed76ae3102d51369ef7f785910160405180910390a15050565b8015610868576000846001600160a01b031663bd02d0f5610758866108d9565b6040518263ffffffff1660e01b815260040161077691815260200190565b602060405180830381865afa158015610793573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906107b79190610cd7565b90506000806107c886868686610961565b9150915081156107da57505050610868565b6000816040516020016107ed9190610cf0565b60405160208183030381529060405290507f9db60cdf21cde7f760995e23662841725e6aa63be48799796db12b7b2e6b17e28160405161082d9190610cf0565b60405180910390a160405163012f3b8f60e71b81526001600160a01b0380891660048301528716602482015260448101869052606401610300565b50505050565b801561086857604051632e1a7d4d60e01b8152600481018290526001600160a01b03841690632e1a7d4d90602401600060405180830381600087803b1580156108b657600080fd5b505af11580156108ca573d6000803e3d6000fd5b50505050610868848383610419565b6000604051602001610917906020808252601890820152771513d2d15397d514905394d1915497d1d054d7d31253525560421b604082015260600190565b60408051601f198184030181528282528051602091820120908301526001600160a01b03841690820152606001604051602081830303815290604052805190602001209050919050565b60006060600063a9059cbb60e01b8686604051602401610982929190610bf5565b604051602081830303815290604052906001600160e01b0319166020820180516001600160e01b0383818316178352505050509050600080886001600160a01b031686846040516109d39190610d20565b60006040518083038160008787f1925050503d8060008114610a11576040519150601f19603f3d011682016040523d82523d6000602084013e610a16565b606091505b50915091508115610ab7578051600003610a74576001600160a01b0389163b610a745760006040518060400160405280601481526020017310d85b1b081d1bc81b9bdb8b58dbdb9d1c9858dd60621b81525094509450505050610ac0565b60008151118015610a96575080806020019051810190610a949190610c0e565b155b15610aa957600094509250610ac0915050565b600194509250610ac0915050565b60009450925050505b94509492505050565b6001600160a01b038116811461031257600080fd5b600080600060608486031215610af357600080fd5b8335610afe81610ac9565b9250602084013591506040840135610b1581610ac9565b809150509250925092565b60008060408385031215610b3357600080fd5b8235610b3e81610ac9565b946020939093013593505050565b801515811461031257600080fd5b60008060008060808587031215610b7057600080fd5b8435610b7b81610ac9565b9350602085013592506040850135610b9281610ac9565b91506060850135610ba281610b4c565b939692955090935050565b600060208284031215610bbf57600080fd5b8135610bca81610ac9565b9392505050565b6020808252600a908201526921a7a72a2927a62622a960b11b604082015260600190565b6001600160a01b03929092168252602082015260400190565b600060208284031215610c2057600080fd5b8151610bca81610b4c565b60005b83811015610c46578181015183820152602001610c2e565b50506000910152565b60008151808452610c67816020860160208601610c2b565b601f01601f19169290920160200192915050565b6001600160a01b0383168152604060208201819052600090610c9f90830184610c4f565b949350505050565b6020808252601690820152752130b7359d1034b73b30b634b2103932b1b2b4bb32b960511b604082015260600190565b600060208284031215610ce957600080fd5b5051919050565b602081526000610bca6020830184610c4f565b600060208284031215610d1557600080fd5b8151610bca81610ac9565b60008251610d32818460208701610c2b565b919091019291505056fea264697066735822122087ac92f19b7d3843f7c16910c2b0bd3b52285a06b2a778ee666a485ff23c181964736f6c63430008100033";

type BankConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: BankConstructorParams): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class Bank__factory extends ContractFactory {
  constructor(...args: BankConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(
    _roleStore: PromiseOrValue<string>,
    _dataStore: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): Promise<Bank> {
    return super.deploy(_roleStore, _dataStore, overrides || {}) as Promise<Bank>;
  }
  override getDeployTransaction(
    _roleStore: PromiseOrValue<string>,
    _dataStore: PromiseOrValue<string>,
    overrides?: Overrides & { from?: PromiseOrValue<string> }
  ): TransactionRequest {
    return super.getDeployTransaction(_roleStore, _dataStore, overrides || {});
  }
  override attach(address: string): Bank {
    return super.attach(address) as Bank;
  }
  override connect(signer: Signer): Bank__factory {
    return super.connect(signer) as Bank__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): BankInterface {
    return new utils.Interface(_abi) as BankInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): Bank {
    return new Contract(address, _abi, signerOrProvider) as Bank;
  }
}
