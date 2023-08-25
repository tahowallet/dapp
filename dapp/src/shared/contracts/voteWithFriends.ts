import { providers } from "ethers"
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

export async function claim(provider: providers.Provider, account: string) {
  const voteWithFriends = await getVoteWithFriendsContract(provider)
  // TODO
  const eligibility = {
    index: account,
    amount: 100,
    proof: ["0x0"],
  }

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
  //   elibibility: {}
  referralAccount: string
) {
  const voteWithFriends = await getVoteWithFriendsContract(provider)
  // TODO
  const eligibility = {
    index: account,
    amount: 100,
    proof: ["0000"],
  }

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
  account: string
) {
  const voteWithFriends = await getVoteWithFriendsContract(provider)
  const eligibilityIndex = account // TODO

  return voteWithFriends.isClaimed(eligibilityIndex)
}
