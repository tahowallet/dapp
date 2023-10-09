import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useState,
  useCallback,
} from "react"
import {
  fetchWalletBalances,
  useDappDispatch,
  selectStakeUnlockTime,
  useDappSelector,
  selectWalletAddress,
} from "redux-state"
import {
  fetchLeaderboardData,
  fetchPopulation,
  fetchUnclaimedXp,
  initRealmsDataFromContracts,
} from "redux-state/thunks/island"
import { SECOND } from "shared/constants"
import { useArbitrumProvider } from "./wallets"
import { useInterval } from "./helpers"

export const IslandContext = React.createContext<
  MutableRefObject<IslandContextType>
>({
  current: {
    onRealmClick: () => {},
  },
})

export type IslandContextType = {
  onRealmClick: (id: string) => void
}

export function useIslandContext() {
  return useContext(IslandContext)
}

export function useFetchRealmsContracts() {
  const dispatch = useDappDispatch()
  const provider = useArbitrumProvider()
  const account = useDappSelector(selectWalletAddress)
  const [hasAlreadyFetched, setHasAlreadyFetched] = useState(false)
  const [hasAlreadyFetchedForAccount, setHasAlreadyFetchedForAccount] =
    useState<string | null>(null)

  // Account agnostic data
  useEffect(() => {
    if (!provider || hasAlreadyFetched) return

    const fetchData = async () => {
      await dispatch(initRealmsDataFromContracts())
      await dispatch(fetchPopulation())

      setHasAlreadyFetched(true)
    }

    fetchData()
  }, [provider, hasAlreadyFetched, dispatch])

  // Account specific data
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchWalletBalances())
      await dispatch(fetchLeaderboardData())
      await dispatch(fetchUnclaimedXp())

      setHasAlreadyFetchedForAccount(account)
    }
    if (
      account &&
      hasAlreadyFetched &&
      account !== hasAlreadyFetchedForAccount
    ) {
      fetchData()
    }
  }, [dispatch, hasAlreadyFetchedForAccount, hasAlreadyFetched, account])
}

const calculateTimeLeft = (stakeUnlockTime: number | null) =>
  stakeUnlockTime ? stakeUnlockTime - Date.now() : null
const calculateIntervalTime = (timeRemaining: number | null) =>
  timeRemaining && timeRemaining > 0 ? SECOND : null

/**
 * Returns the time remaining until the user can unstake their tokens.
 * It tracks if a user's stake is locked or not, runs a timer,
 * stops and resumes the timer based on the `stakeUnlockTime` value.
 */
export function useStakeCooldownPeriod() {
  const stakeUnlockTime = useDappSelector(selectStakeUnlockTime)
  const [timeRemaining, setTimeRemaining] = useState(
    calculateTimeLeft(stakeUnlockTime)
  )
  const [intervalTime, setIntervalTime] = useState(() =>
    calculateIntervalTime(timeRemaining)
  )

  const intervalCallback = useCallback(() => {
    setTimeRemaining(calculateTimeLeft(stakeUnlockTime))
  }, [stakeUnlockTime])

  useEffect(() => {
    const newTimeRemaining = calculateTimeLeft(stakeUnlockTime)

    setTimeRemaining(newTimeRemaining)
    setIntervalTime(calculateIntervalTime(newTimeRemaining))
  }, [stakeUnlockTime])

  useInterval(intervalCallback, intervalTime)

  return { hasCooldown: !!timeRemaining && timeRemaining > 0, timeRemaining }
}
