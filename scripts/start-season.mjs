import { ethers } from "ethers"

const TAHO_MULTISIG = "0xe8746F8728D152FCc9F6549C2baBAa79f5BF2E08"
const TAHO_DEPLOYER_CONTRACT = "0xd83972dF6559D9Ce24f892B0e0f636E81af128Fe"

const gameAbi = [
  {
    inputs: [],
    name: "startSeason",
    outputs: [],
    stateMutability: "nonpayable",
    type: "function",
  },
  {
    inputs: [],
    name: "season",
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
]

const tahoDeployerAbi = [
  {
    inputs: [],
    name: "GAME",
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
  await setBalance(TAHO_MULTISIG, "0x100000000000000")

  const tahoDeployer = new ethers.Contract(
    TAHO_DEPLOYER_CONTRACT,
    tahoDeployerAbi,
    localhostProvider
  )

  const signer = localhostProvider.getSigner(TAHO_MULTISIG)
  const gameAddress = await tahoDeployer.GAME()
  const contract = new ethers.Contract(gameAddress, gameAbi, localhostProvider)

  const gamePopulatedTx = await contract.populateTransaction.startSeason()
  const tx = await signer.sendTransaction(gamePopulatedTx)
  await tx.wait()

  const season = await contract.season()

  // eslint-disable-next-line no-console
  console.log("Start of season ", season.toString())

  await stopImpersonating(TAHO_MULTISIG)
}

main()
