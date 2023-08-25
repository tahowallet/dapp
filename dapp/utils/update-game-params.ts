import { ethers } from "ethers"
import * as contracts from "../typechain/index"

const TAHO_MULTISIG = "0xe8746F8728D152FCc9F6549C2baBAa79f5BF2E08"

const main = async () => {
  const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")

  await provider.send("hardhat_impersonateAccount", [TAHO_MULTISIG])

  const contract = contracts.GameParameters__factory.connect(
    "0x4016ACF51Fb6Ebd142b1C37330C2Aa3Bccb72Bf4",
    provider.getSigner(TAHO_MULTISIG)
  )

  await provider.send("hardhat_setBalance", [TAHO_MULTISIG, "0x1000000000000"])

  await contract
    .updateStakeLockTime(ethers.BigNumber.from(20))
    // debugging
    // eslint-disable-next-line no-console
    .catch(console.error)

  await provider.send("hardhat_stopImpersonatingAccount", [TAHO_MULTISIG])
}

main()
