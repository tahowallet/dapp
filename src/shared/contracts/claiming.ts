import { Contract, PopulatedTransaction, providers } from "ethers"
import { Eligibility } from "../types"
import { voteWithFriendsAbi } from "./abi"
import { getTahoDeployerContract } from "./game"

async function getVoteWithFriendsContract(provider: providers.Provider) {
  const tahoDeployer = getTahoDeployerContract(provider)

  const voteWithFriendsAddress = await tahoDeployer.VOTE_WITH_FRIENDS()

  return new Contract(voteWithFriendsAddress, voteWithFriendsAbi, provider)
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
