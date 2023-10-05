import { ethers } from "ethers"
import { gameParametersAbi, tahoDeployerAbi } from "shared/contracts/abi"

const TAHO_MULTISIG = "0xe8746F8728D152FCc9F6549C2baBAa79f5BF2E08"

const localhostProvider = new ethers.providers.JsonRpcProvider(
  process.env.LOCALHOST_RPC_URL
)

const impersonate = (address: string) =>
  localhostProvider.send("hardhat_impersonateAccount", [address])

const stopImpersonating = (address: string) =>
  localhostProvider.send("hardhat_stopImpersonatingAccount", [address])

const setBalance = (address: string, balance: string) =>
  localhostProvider.send("hardhat_setBalance", [address, balance])

// eslint-disable-next-line import/prefer-default-export
export async function setQuickUnstaking() {
  await impersonate(TAHO_MULTISIG)
  await setBalance(TAHO_MULTISIG, "0x1000000000000")

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
