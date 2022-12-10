/* Autogenerated file. Do not edit manually. */
/* tslint:disable */
/* eslint-disable */
import { Signer, utils, Contract, ContractFactory, Overrides } from "ethers";
import type { Provider, TransactionRequest } from "@ethersproject/providers";
import type { PromiseOrValue } from "../../../common";
import type { WNT, WNTInterface } from "../../../contracts/mock/WNT";

const _abi = [
  {
    inputs: [],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "TransferFailed",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Approval",
    type: "event",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "value",
        type: "uint256",
      },
    ],
    name: "Transfer",
    type: "event",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "owner",
        type: "address",
      },
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
    ],
    name: "allowance",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "approve",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
    ],
    name: "balanceOf",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "burn",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "decimals",
    outputs: [
      {
        internalType: "uint8",
        name: "",
        type: "uint8",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "subtractedValue",
        type: "uint256",
      },
    ],
    name: "decreaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "deposit",
    outputs: [],
    stateMutability: "payable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "spender",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "addedValue",
        type: "uint256",
      },
    ],
    name: "increaseAllowance",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "account",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "mint",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "name",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "symbol",
    outputs: [
      {
        internalType: "string",
        name: "",
        type: "string",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "totalSupply",
    outputs: [
      {
        internalType: "uint256",
        name: "",
        type: "uint256",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transfer",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "address",
        name: "from",
        type: "address",
      },
      {
        internalType: "address",
        name: "to",
        type: "address",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "transferFrom",
    outputs: [
      {
        internalType: "bool",
        name: "",
        type: "bool",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "withdraw",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
];

const _bytecode =
  "0x60806040523480156200001157600080fd5b506040518060400160405280601481526020017f57726170706564204e617469766520546f6b656e0000000000000000000000008152506040518060400160405280600381526020016215d39560ea1b815250816003908162000075919062000132565b50600462000084828262000132565b505050620001fe565b634e487b7160e01b600052604160045260246000fd5b600181811c90821680620000b857607f821691505b602082108103620000d957634e487b7160e01b600052602260045260246000fd5b50919050565b601f8211156200012d57600081815260208120601f850160051c81016020861015620001085750805b601f850160051c820191505b81811015620001295782815560010162000114565b5050505b505050565b81516001600160401b038111156200014e576200014e6200008d565b62000166816200015f8454620000a3565b84620000df565b602080601f8311600181146200019e5760008415620001855750858301515b600019600386901b1c1916600185901b17855562000129565b600085815260208120601f198616915b82811015620001cf57888601518255948401946001909101908401620001ae565b5085821015620001ee5787850151600019600388901b60f8161c191681555b5050505050600190811b01905550565b610c68806200020e6000396000f3fe6080604052600436106100b85760003560e01c806306fdde03146100bd578063095ea7b3146100e857806318160ddd1461011857806323b872dd146101375780632e1a7d4d14610157578063313ce56714610179578063395093511461019557806340c10f19146101b557806370a08231146101d557806395d89b411461020b5780639dc29fac14610220578063a457c2d714610240578063a9059cbb14610260578063d0e30db014610280578063dd62ed3e14610288575b600080fd5b3480156100c957600080fd5b506100d26102a8565b6040516100df9190610a5e565b60405180910390f35b3480156100f457600080fd5b50610108610103366004610ac8565b61033a565b60405190151581526020016100df565b34801561012457600080fd5b506002545b6040519081526020016100df565b34801561014357600080fd5b50610108610152366004610af2565b610354565b34801561016357600080fd5b50610177610172366004610b2e565b610378565b005b34801561018557600080fd5b50604051601281526020016100df565b3480156101a157600080fd5b506101086101b0366004610ac8565b6103fd565b3480156101c157600080fd5b506101776101d0366004610ac8565b61041f565b3480156101e157600080fd5b506101296101f0366004610b47565b6001600160a01b031660009081526020819052604090205490565b34801561021757600080fd5b506100d2610429565b34801561022c57600080fd5b5061017761023b366004610ac8565b610438565b34801561024c57600080fd5b5061010861025b366004610ac8565b610442565b34801561026c57600080fd5b5061010861027b366004610ac8565b6104bd565b6101776104cb565b34801561029457600080fd5b506101296102a3366004610b69565b6104d7565b6060600380546102b790610b9c565b80601f01602080910402602001604051908101604052809291908181526020018280546102e390610b9c565b80156103305780601f1061030557610100808354040283529160200191610330565b820191906000526020600020905b81548152906001019060200180831161031357829003601f168201915b5050505050905090565b600033610348818585610502565b60019150505b92915050565b600033610362858285610627565b61036d8585856106a1565b506001949350505050565b610382338261085d565b604051600090339083908381818185875af1925050503d80600081146103c4576040519150601f19603f3d011682016040523d82523d6000602084013e6103c9565b606091505b50509050806103f957604051630e21dcbb60e11b8152336004820152602481018390526044015b60405180910390fd5b5050565b60003361034881858561041083836104d7565b61041a9190610bec565b610502565b6103f98282610991565b6060600480546102b790610b9c565b6103f9828261085d565b6000338161045082866104d7565b9050838110156104b05760405162461bcd60e51b815260206004820152602560248201527f45524332303a2064656372656173656420616c6c6f77616e63652062656c6f77604482015264207a65726f60d81b60648201526084016103f0565b61036d8286868403610502565b6000336103488185856106a1565b6104d53334610991565b565b6001600160a01b03918216600090815260016020908152604080832093909416825291909152205490565b6001600160a01b0383166105645760405162461bcd60e51b8152602060048201526024808201527f45524332303a20617070726f76652066726f6d20746865207a65726f206164646044820152637265737360e01b60648201526084016103f0565b6001600160a01b0382166105c55760405162461bcd60e51b815260206004820152602260248201527f45524332303a20617070726f766520746f20746865207a65726f206164647265604482015261737360f01b60648201526084016103f0565b6001600160a01b0383811660008181526001602090815260408083209487168084529482529182902085905590518481527f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92591015b60405180910390a3505050565b600061063384846104d7565b9050600019811461069b578181101561068e5760405162461bcd60e51b815260206004820152601d60248201527f45524332303a20696e73756666696369656e7420616c6c6f77616e636500000060448201526064016103f0565b61069b8484848403610502565b50505050565b6001600160a01b0383166107055760405162461bcd60e51b815260206004820152602560248201527f45524332303a207472616e736665722066726f6d20746865207a65726f206164604482015264647265737360d81b60648201526084016103f0565b6001600160a01b0382166107675760405162461bcd60e51b815260206004820152602360248201527f45524332303a207472616e7366657220746f20746865207a65726f206164647260448201526265737360e81b60648201526084016103f0565b6001600160a01b038316600090815260208190526040902054818110156107df5760405162461bcd60e51b815260206004820152602660248201527f45524332303a207472616e7366657220616d6f756e7420657863656564732062604482015265616c616e636560d01b60648201526084016103f0565b6001600160a01b03808516600090815260208190526040808220858503905591851681529081208054849290610816908490610bec565b92505081905550826001600160a01b0316846001600160a01b0316600080516020610c138339815191528460405161085091815260200190565b60405180910390a361069b565b6001600160a01b0382166108bd5760405162461bcd60e51b815260206004820152602160248201527f45524332303a206275726e2066726f6d20746865207a65726f206164647265736044820152607360f81b60648201526084016103f0565b6001600160a01b038216600090815260208190526040902054818110156109315760405162461bcd60e51b815260206004820152602260248201527f45524332303a206275726e20616d6f756e7420657863656564732062616c616e604482015261636560f01b60648201526084016103f0565b6001600160a01b0383166000908152602081905260408120838303905560028054849290610960908490610bff565b90915550506040518281526000906001600160a01b03851690600080516020610c138339815191529060200161061a565b6001600160a01b0382166109e75760405162461bcd60e51b815260206004820152601f60248201527f45524332303a206d696e7420746f20746865207a65726f20616464726573730060448201526064016103f0565b80600260008282546109f99190610bec565b90915550506001600160a01b03821660009081526020819052604081208054839290610a26908490610bec565b90915550506040518181526001600160a01b03831690600090600080516020610c138339815191529060200160405180910390a35050565b600060208083528351808285015260005b81811015610a8b57858101830151858201604001528201610a6f565b506000604082860101526040601f19601f8301168501019250505092915050565b80356001600160a01b0381168114610ac357600080fd5b919050565b60008060408385031215610adb57600080fd5b610ae483610aac565b946020939093013593505050565b600080600060608486031215610b0757600080fd5b610b1084610aac565b9250610b1e60208501610aac565b9150604084013590509250925092565b600060208284031215610b4057600080fd5b5035919050565b600060208284031215610b5957600080fd5b610b6282610aac565b9392505050565b60008060408385031215610b7c57600080fd5b610b8583610aac565b9150610b9360208401610aac565b90509250929050565b600181811c90821680610bb057607f821691505b602082108103610bd057634e487b7160e01b600052602260045260246000fd5b50919050565b634e487b7160e01b600052601160045260246000fd5b8082018082111561034e5761034e610bd6565b8181038181111561034e5761034e610bd656feddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3efa26469706673582212202d9e32e4b5ba56608d40bc0b8433fb84f902efcc1e6be1aed5cbdcae2e55c30864736f6c63430008100033";

type WNTConstructorParams = [signer?: Signer] | ConstructorParameters<typeof ContractFactory>;

const isSuperArgs = (xs: WNTConstructorParams): xs is ConstructorParameters<typeof ContractFactory> => xs.length > 1;

export class WNT__factory extends ContractFactory {
  constructor(...args: WNTConstructorParams) {
    if (isSuperArgs(args)) {
      super(...args);
    } else {
      super(_abi, _bytecode, args[0]);
    }
  }

  override deploy(overrides?: Overrides & { from?: PromiseOrValue<string> }): Promise<WNT> {
    return super.deploy(overrides || {}) as Promise<WNT>;
  }
  override getDeployTransaction(overrides?: Overrides & { from?: PromiseOrValue<string> }): TransactionRequest {
    return super.getDeployTransaction(overrides || {});
  }
  override attach(address: string): WNT {
    return super.attach(address) as WNT;
  }
  override connect(signer: Signer): WNT__factory {
    return super.connect(signer) as WNT__factory;
  }

  static readonly bytecode = _bytecode;
  static readonly abi = _abi;
  static createInterface(): WNTInterface {
    return new utils.Interface(_abi) as WNTInterface;
  }
  static connect(address: string, signerOrProvider: Signer | Provider): WNT {
    return new Contract(address, _abi, signerOrProvider) as WNT;
  }
}
