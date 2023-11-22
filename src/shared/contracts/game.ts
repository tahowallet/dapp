import { providers, Contract } from "ethers"
import { ReadTransactionBuilder, SeasonInfo } from "shared/types"
import { DAY } from "shared/constants"
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

  // Season start data is accessible through .env
  // Date requires ms, whereas block.timestamp is in s
  // const seasonStartTimestamp = seasonInfo[1].toNumber() * 1000

  const seasonStartTimestamp = process.env.SEASON_START_DATE
    ? new Date(process.env.SEASON_START_DATE).getTime()
    : Date.now()

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
