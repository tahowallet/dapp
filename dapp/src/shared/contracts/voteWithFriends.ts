import { PopulatedTransaction, providers } from "ethers"
import { Eligibility } from "../types"
import {
  TahoDeployer__factory,
  VoteWithFriends__factory,
} from "../../../typechain"

async function getVoteWithFriendsContract(provider: providers.Provider) {
  const tahoDeployer = TahoDeployer__factory.connect(
    CONTRACT_TahoDeployer,
    provider
  )

  const voteWithFriendsAddress = await tahoDeployer.VOTE_WITH_FRIENDS()

  return VoteWithFriends__factory.connect(voteWithFriendsAddress, provider)
}

export async function claim(
  provider: providers.Provider,
  account: string,
  eligibility: Eligibility
): Promise<PopulatedTransaction | null> {
  if (eligibility.index === null || eligibility.proof === null) return null

  const voteWithFriends = await getVoteWithFriendsContract(provider)

  return voteWithFriends.populateTransaction.claim(
    eligibility.index,
    account,
    eligibility.amount,
    eligibility.proof
  )
}

export async function claimWithCommunityCode(
  provider: providers.Provider,
  account: string,
  eligibility: Eligibility,
  referralAccount: string
): Promise<PopulatedTransaction | null> {
  if (eligibility.index === null || eligibility.proof === null) return null

  const voteWithFriends = await getVoteWithFriendsContract(provider)

  return voteWithFriends.populateTransaction.claimWithCommunityCode(
    eligibility.index,
    account,
    eligibility.amount,
    eligibility.proof,
    referralAccount
  )
}

export async function hasAlreadyClaimed(
  provider: providers.Provider,
  eligibility: Eligibility
): Promise<boolean> {
  if (eligibility.index === null || eligibility.proof === null) return false

  const voteWithFriends = await getVoteWithFriendsContract(provider)

  return voteWithFriends.isClaimed(eligibility.index)
}
