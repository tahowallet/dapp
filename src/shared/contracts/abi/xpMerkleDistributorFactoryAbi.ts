import { ContractInterface } from "ethers"

export default [
  {
    inputs: [
      {
        internalType: "contract Game",
        name: "_game",
        type: "address",
      },
      {
        internalType: "contract GameParameters",
        name: "_gameParameters",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "constructor",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "allocated",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "allocatable",
        type: "uint256",
      },
    ],
    name: "AllocationExceedsAllowance",
    type: "error",
  },
  {
    inputs: [
      {
        internalType: "uint256",
        name: "xpSeason",
        type: "uint256",
      },
      {
        internalType: "uint256",
        name: "currentGameSeason",
        type: "uint256",
      },
      {
        internalType: "bool",
        name: "isBetweenSeasons",
        type: "bool",
      },
    ],
    name: "CannotDistributeXpAfterSeasonEnded",
    type: "error",
  },
  {
    anonymous: false,
    inputs: [
      {
        indexed: true,
        internalType: "address",
        name: "realm",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "xp",
        type: "address",
      },
      {
        indexed: true,
        internalType: "address",
        name: "distributor",
        type: "address",
      },
      {
        indexed: false,
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "MerkleDistributorCreated",
    type: "event",
  },
  {
    inputs: [],
    name: "game",
    outputs: [
      {
        internalType: "contract Game",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
  {
    inputs: [],
    name: "gameParameters",
    outputs: [
      {
        internalType: "contract GameParameters",
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
        internalType: "contract Xp",
        name: "xp",
        type: "address",
      },
      {
        internalType: "bytes32",
        name: "merkleRoot",
        type: "bytes32",
      },
      {
        internalType: "uint256",
        name: "amount",
        type: "uint256",
      },
    ],
    name: "newDistribution",
    outputs: [
      {
        internalType: "address",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "seasonWeek",
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
        internalType: "contract Xp",
        name: "xp",
        type: "address",
      },
    ],
    name: "xpAllocatable",
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
        name: "",
        type: "address",
      },
    ],
    name: "xpAllocated",
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
] as ContractInterface
