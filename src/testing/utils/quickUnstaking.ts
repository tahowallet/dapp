import { ethers } from "ethers"
import { gameParametersAbi, tahoDeployerAbi } from "shared/contracts/abi"

const TAHO_MULTISIG = process.env.TAHO_MULTISIG_ADDRESS

const localhostProvider =
  process.env.USE_LOCALHOST_FORK === "true"
    ? new ethers.providers.JsonRpcProvider(process.env.LOCALHOST_RPC_URL)
    : null

const impersonate = (address: string) =>
  localhostProvider?.send("hardhat_impersonateAccount", [address])

const stopImpersonating = (address: string) =>
  localhostProvider?.send("hardhat_stopImpersonatingAccount", [address])

const setBalance = (address: string, balance: string) =>
  localhostProvider?.send("hardhat_setBalance", [address, balance])

// eslint-disable-next-line import/prefer-default-export
export async function setQuickUnstaking() {
  if (!localhostProvider) {
    throw new Error(
      "Can't test quick unstaking without a localhost fork, set USE_LOCALHOST_FORK=true"
    )
  }

  if (!TAHO_MULTISIG) {
    throw new Error(
      "Can't test quick unstaking without a TAHO_MULTISIG_ADDRESS set in .env"
    )
  }

  await impersonate(TAHO_MULTISIG)
  await setBalance(TAHO_MULTISIG, "0x1000000000000000")

  const tahoDeployer = new ethers.Contract(
    CONTRACT_TahoDeployer,
    tahoDeployerAbi,
    localhostProvider
  )

  const gameParamsAddress = await tahoDeployer.GAME_PARAMETERS()
  const contract = new ethers.Contract(
    gameParamsAddress,
    gameParametersAbi,
    localhostProvider
  )

  const oldLockTime = await contract.stakeLockTime()

  const signer = localhostProvider.getSigner(TAHO_MULTISIG)

  const populatedTx = await contract.populateTransaction.updateStakeLockTime(
    ethers.BigNumber.from(60)
  )

  const tx = await signer.sendTransaction(populatedTx)

  await tx.wait()

  const newLockTime = await contract.stakeLockTime()

  // eslint-disable-next-line no-console
  console.log(
    "Changed lock time from",
    oldLockTime.toString(),
    "seconds to",
    newLockTime.toString(),
    "seconds"
  )

  await stopImpersonating(TAHO_MULTISIG)
}
