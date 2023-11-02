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
  selectRealms,
  selectPopulationById,
  selectDisplayedPopulationById,
  setRealmDisplayedPopulation,
} from "redux-state"
import { SECOND } from "shared/constants"
import {
  fetchLeaderboardData,
  fetchPopulation,
  fetchUnclaimedXp,
  fetchXpAllocatable,
  initRealmsDataFromContracts,
  initSeasonInfoData,
} from "redux-state/thunks/island"
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

// Used to fetch all necessary data for the game to load
export function useGameLoadDataFetch() {
  const dispatch = useDappDispatch()
  const provider = useArbitrumProvider()
  const [hasAlreadyCalled, setHasAlreadyCalled] = useState(false)

  useEffect(() => {
    if (!provider || hasAlreadyCalled) return

    const fetchData = async () => {
      await dispatch(initSeasonInfoData())
      await dispatch(initRealmsDataFromContracts())
    }

    fetchData()
    setHasAlreadyCalled(true)
  }, [provider, hasAlreadyCalled, dispatch])
}

// Used to fetch remaining game data
export function useGameDataFetch() {
  const dispatch = useDappDispatch()
  const provider = useArbitrumProvider()
  const account = useDappSelector(selectWalletAddress)
  const realms = useDappSelector(selectRealms)
  const [hasAlreadyCalled, setHasAlreadyCalled] = useState(false)
  const [hasAlreadyFetchedForAccount, setHasAlreadyFetchedForAccount] =
    useState<string | null>(null)

  // Account agnostic data
  useEffect(() => {
    if (!provider || hasAlreadyCalled || Object.keys(realms).length === 0)
      return

    const fetchData = async () => {
      await dispatch(fetchPopulation(true))
      await dispatch(fetchXpAllocatable())
    }

    fetchData()
    setHasAlreadyCalled(true)
  }, [provider, hasAlreadyCalled, realms, dispatch])

  // Account specific data
  useEffect(() => {
    const fetchData = async () => {
      await dispatch(fetchWalletBalances())
      await dispatch(fetchLeaderboardData())
      await dispatch(fetchUnclaimedXp())
    }

    if (
      account &&
      hasAlreadyCalled &&
      account !== hasAlreadyFetchedForAccount
    ) {
      fetchData()
      setHasAlreadyFetchedForAccount(account)
    }
  }, [dispatch, hasAlreadyFetchedForAccount, hasAlreadyCalled, account])
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

export function usePopulationBubble(realmId: string): {
  showBubble: boolean
  setShowBubble: (newValue: boolean) => void
} {
  const population = useDappSelector((state) =>
    selectPopulationById(state, realmId)
  )
  const displayedPopulation = useDappSelector((state) =>
    selectDisplayedPopulationById(state, realmId)
  )
  const dispatch = useDappDispatch()

  const [showBubble, setShowBubble] = useState(false)

  const populationCallback = useCallback(async () => {
    if (population < displayedPopulation) {
      await dispatch(
        setRealmDisplayedPopulation({
          id: realmId,
          population,
        })
      )
    } else if (population > displayedPopulation) {
      setShowBubble(true)
      await dispatch(
        setRealmDisplayedPopulation({
          id: realmId,
          population: displayedPopulation + 1,
        })
      )
    }
  }, [population, displayedPopulation, dispatch, realmId])

  useInterval(populationCallback, population ? SECOND * 10 : null)
  return { showBubble, setShowBubble }
}
