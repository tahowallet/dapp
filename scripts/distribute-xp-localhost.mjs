import { ethers } from "ethers"
import realmAbi from "../src/shared/contracts/abi/realmAbi"

// TODO: make it a script argument
const MERKLE_ROOT = ""
const AMOUNT = 0
const MERKLE_DATA_URL = ""
const REALM_ADDRESS = ""

const TAHO_MULTISIG = "0xe8746F8728D152FCc9F6549C2baBAa79f5BF2E08"
const localhostProvider = new ethers.providers.JsonRpcProvider(
  "http://localhost:8545"
)

const impersonate = (address) =>
  localhostProvider.send("hardhat_impersonateAccount", [address])

const stopImpersonating = (address) =>
  localhostProvider.send("hardhat_stopImpersonatingAccount", [address])

async function main() {
  if (!MERKLE_ROOT || !AMOUNT || !REALM_ADDRESS) {
    // eslint-disable-next-line no-console
    console.error("Missing arguments")
    process.exit(1)
  }

  await impersonate(TAHO_MULTISIG)
  const signer = localhostProvider.getSigner(TAHO_MULTISIG)

  const realmContract = new ethers.Contract(
    REALM_ADDRESS,
    realmAbi,
    localhostProvider
  )

  const populatedTx = await realmContract.populateTransaction.distributeXp(
    MERKLE_ROOT,
    AMOUNT,
    MERKLE_DATA_URL
  )

  const tx = await signer.sendTransaction(populatedTx)

  await tx.wait()

  await stopImpersonating(TAHO_MULTISIG)
}

main()
