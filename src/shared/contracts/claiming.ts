import { Contract } from "ethers"
import {
  Eligibility,
  ReadTransactionBuilder,
  WriteTransactionBuilder,
} from "../types"
import { voteWithFriendsAbi } from "./abi"
import { getTahoDeployerContract } from "./game"

export const getVoteWithFriendsContract: ReadTransactionBuilder<
  null,
  Contract
> = async (provider) => {
  const tahoDeployer = await getTahoDeployerContract(provider, null)

  const voteWithFriendsAddress = await tahoDeployer.VOTE_WITH_FRIENDS()

  return new Contract(voteWithFriendsAddress, voteWithFriendsAbi, provider)
}

export const claim: WriteTransactionBuilder<{
  eligibility: Eligibility
}> = async (provider, account, { eligibility }) => {
  if (eligibility.index === null || eligibility.proof === null) return null

  const voteWithFriends = await getVoteWithFriendsContract(provider, null)

  return voteWithFriends.populateTransaction.claim(
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

  const voteWithFriends = await getVoteWithFriendsContract(provider, null)

  return voteWithFriends.populateTransaction.claimWithCommunityCode(
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

  const voteWithFriends = await getVoteWithFriendsContract(provider, null)

  return voteWithFriends.isClaimed(eligibility.index)
}
