import { Contract } from "ethers"
import {
  Eligibility,
  ReadTransactionBuilder,
  WriteTransactionBuilder,
} from "../types"
import { claimWithFriendsAbi } from "./abi"
import { getTahoDeployerContract } from "./game"

export const getClaimWithFriendsContract: ReadTransactionBuilder<
  null,
  Contract
> = async (provider) => {
  const tahoDeployer = await getTahoDeployerContract(provider, null)

  const claimWithFriendsAddress = await tahoDeployer.CLAIM_WITH_FRIENDS()

  return new Contract(claimWithFriendsAddress, claimWithFriendsAbi, provider)
}

export const claim: WriteTransactionBuilder<{
  eligibility: Eligibility
}> = async (provider, account, { eligibility }) => {
  if (eligibility.index === null || eligibility.proof === null) return null

  const claimWithFriends = await getClaimWithFriendsContract(provider, null)

  return claimWithFriends.populateTransaction.claim(
    eligibility.index,
    account,
    eligibility.amount,
    eligibility.proof
  )
}

export const claimWithReferral: WriteTransactionBuilder<{
  eligibility: Eligibility
  referralAccount: string
}> = async (provider, account, { eligibility, referralAccount }) => {
  if (eligibility.index === null || eligibility.proof === null) return null

  const claimWithFriends = await getClaimWithFriendsContract(provider, null)

  return claimWithFriends.populateTransaction.claimWithCommunityCode(
    eligibility.index,
    account,
    eligibility.amount,
    eligibility.proof,
    referralAccount
  )
}

export const hasAlreadyClaimed: ReadTransactionBuilder<
  { eligibility: Eligibility },
  boolean
> = async (provider, { eligibility }) => {
  if (eligibility.index === null || eligibility.proof === null) return false

  const claimWithFriends = await getClaimWithFriendsContract(provider, null)

  return claimWithFriends.isClaimed(eligibility.index)
}
