import React, {
  MutableRefObject,
  useCallback,
  useContext,
  useEffect,
  useState,
} from "react"
import {
  fetchWalletBalances,
  selectStakeUnlockTime,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import { SECOND } from "shared/constants"
import { initRealmsDataFromContracts } from "redux-state/thunks/island"
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
  const [hasAlreadyFetched, setHasAlreadyFetched] = useState(false)

  useEffect(() => {
    if (!provider || hasAlreadyFetched) return

    const fetchRealms = async () => {
      await dispatch(initRealmsDataFromContracts())
      await dispatch(fetchWalletBalances())
      setHasAlreadyFetched(true)
    }

    fetchRealms()
  }, [provider, hasAlreadyFetched, dispatch])
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
