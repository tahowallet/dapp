import { Wallet, ethers } from "ethers"
import { realmAbi, tahoDeployerAbi } from "shared/contracts/abi"

const contractsWithNames = [
  { prefix: "FRAX", name: "Frax" },
  { prefix: "GALXE", name: "Galxe" },
  { prefix: "ARBITRUM", name: "Arbitrum" },
  { prefix: "CYBERCONNECT", name: "Cyberconnect" },
  { prefix: "GITCOIN", name: "Gitcoin" },
]
const tenderlyProvider = new ethers.providers.JsonRpcProvider(
  process.env.TENDERLY_RPC_URL
)

const privateKey = process.env.TENDERLY_PRIVATE_KEY

// eslint-disable-next-line import/prefer-default-export
export async function rename() {
  if (!privateKey) {
    throw new Error("TENDERLY_PRIVATE_KEY is not set")
  }

  const tahoDeployer = new ethers.Contract(
    CONTRACT_TahoDeployer,
    tahoDeployerAbi,
    tenderlyProvider
  )

  const signer = new Wallet(privateKey, tenderlyProvider)

  contractsWithNames.forEach(async ({ prefix, name }) => {
    const realmAddress = await tahoDeployer[`${prefix}_REALM`]()

    const realmContract = new ethers.Contract(
      realmAddress,
      realmAbi,
      tenderlyProvider
    )
    const oldName = await realmContract.name()

    const populatedTx = await realmContract.populateTransaction.updateName(name)

    const tx = await signer.sendTransaction(populatedTx)

    await tx.wait()

    const newName = await realmContract.name()

    // eslint-disable-next-line no-console
    console.log(
      "Changed realm name from",
      oldName.toString(),
      "to",
      newName.toString()
    )
  })
}
