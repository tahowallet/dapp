import { providers, Contract } from "ethers"
import { ReadTransactionBuilder, SeasonInfo } from "shared/types"
import { gameAbi, tahoDeployerAbi } from "./abi"

export const getTahoDeployerContract: ReadTransactionBuilder<
  null,
  Contract
> = async (provider: providers.Provider) =>
  new Contract(CONTRACT_TahoDeployer, tahoDeployerAbi, provider)

export const getGameContract: ReadTransactionBuilder<null, Contract> = async (
  provider: providers.Provider
) => {
  const tahoDeployerContract = await getTahoDeployerContract(provider, null)
  const gameAddress = await tahoDeployerContract.GAME()
  return new Contract(gameAddress, gameAbi, provider)
}

export const getSeasonInfo: ReadTransactionBuilder<null, SeasonInfo> = async (
  provider
) => {
  const gameContract = await getGameContract(provider, null)
  const seasonInfo = await gameContract.seasonInfo()

  const season = seasonInfo[0].toNumber()
  const seasonStartTimestamp = seasonInfo[1].toNumber()
  const isInterSeason = seasonInfo[2]

  return {
    season,
    seasonStartTimestamp,
    isInterSeason,
    durationInWeeks: Number(process.env.SEASON_LENGTH_IN_WEEKS ?? "8"),
  }
}
