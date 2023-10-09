import { ethers } from "ethers"

const TAHO_MULTISIG = "0xe8746F8728D152FCc9F6549C2baBAa79f5BF2E08"
const TAHO_DEPLOYER_CONTRACT = "0xd83972dF6559D9Ce24f892B0e0f636E81af128Fe"

const realmAbi = [
  {
    inputs: [],
    name: "createXp",
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
    name: "xp",
    outputs: [
      {
        internalType: "contract Xp",
        name: "",
        type: "address",
      },
    ],
    stateMutability: "view",
    type: "function",
  },
]
const tahoDeployerAbi = [
  {
    inputs: [],
    name: "VAMPIRE_REALM",
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
    inputs: [],
    name: "EDUCATE_REALM",
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
    inputs: [],
    name: "SOCIAL_REALM",
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
    inputs: [],
    name: "CREATORS_REALM",
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
    inputs: [],
    name: "DEFI_REALM",
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
]

const realms = [
  "VAMPIRE_REALM",
  "EDUCATE_REALM",
  "SOCIAL_REALM",
  "CREATORS_REALM",
  "DEFI_REALM",
]

const localhostProvider = new ethers.providers.JsonRpcProvider(
  process.env.LOCALHOST_RPC_URL
)

const impersonate = (address) =>
  localhostProvider.send("hardhat_impersonateAccount", [address])

const stopImpersonating = (address) =>
  localhostProvider.send("hardhat_stopImpersonatingAccount", [address])

const setBalance = (address, balance) =>
  localhostProvider.send("hardhat_setBalance", [address, balance])

// eslint-disable-next-line import/prefer-default-export
export async function main() {
  await impersonate(TAHO_MULTISIG)
  await setBalance(TAHO_MULTISIG, "0x1000000000000000000000")

  const signer = localhostProvider.getSigner(TAHO_MULTISIG)

  const tahoDeployer = new ethers.Contract(
    TAHO_DEPLOYER_CONTRACT,
    tahoDeployerAbi,
    localhostProvider
  )

  const xpAddresses = await Promise.all(
    realms.map(async (name) => {
      const address = await tahoDeployer[name]()
      const contract = new ethers.Contract(address, realmAbi, localhostProvider)

      const populatedTx = await contract.populateTransaction.createXp()
      const tx = await signer.sendTransaction(populatedTx)
      await tx.wait()

      const xpAddress = contract.xp()
      return xpAddress
    })
  )

  // eslint-disable-next-line no-console
  console.log("XP addresses  ", xpAddresses)
  await stopImpersonating(TAHO_MULTISIG)
}

main()
