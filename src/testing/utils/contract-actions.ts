import { ethers } from "ethers"
import { REALMS_WITH_CONTRACT_NAME } from "shared/constants"
import {
  gameAbi,
  gameParametersAbi,
  realmAbi,
  tahoDeployerAbi,
} from "shared/contracts/abi"

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

export async function startSeason() {
  await impersonate(TAHO_MULTISIG)
  await setBalance(TAHO_MULTISIG, "0x1000000000000")

  const tahoDeployer = new ethers.Contract(
    CONTRACT_TahoDeployer,
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

export async function createXPtokens() {
  await startSeason()
  await impersonate(TAHO_MULTISIG)
  await setBalance(TAHO_MULTISIG, "0x100000000000000000000")

  const signer = localhostProvider.getSigner(TAHO_MULTISIG)

  const tahoDeployer = new ethers.Contract(
    CONTRACT_TahoDeployer,
    tahoDeployerAbi,
    localhostProvider
  )

  const xpAddresses = await Promise.all(
    Object.values(REALMS_WITH_CONTRACT_NAME).map(async ({ name }) => {
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
