import { providers, Contract } from "ethers"
import { ReadTransactionBuilder, SeasonInfo } from "shared/types"
import { DAY, SEASON_START_DATE } from "shared/constants"
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
  const seasonStartTimestamp = new Date(SEASON_START_DATE).getTime()
  const isInterSeason = seasonInfo[2]

  const durationInWeeks = Number(process.env.SEASON_LENGTH_IN_WEEKS ?? "8")
  const seasonEndTimestamp = seasonStartTimestamp + durationInWeeks * 7 * DAY

  return {
    season,
    seasonStartTimestamp,
    seasonEndTimestamp,
    durationInWeeks,
    isInterSeason,
  }
}
