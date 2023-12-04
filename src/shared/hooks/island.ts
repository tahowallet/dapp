import React, {
  MutableRefObject,
  useContext,
  useEffect,
  useState,
  useCallback,
  RefObject,
  SetStateAction,
  Dispatch,
} from "react"
import {
  fetchWalletBalances,
  useDappDispatch,
  selectStakeUnlockTime,
  useDappSelector,
  selectWalletAddress,
  selectRealms,
  selectRealmPanelVisible,
} from "redux-state"
import { LOCAL_STORAGE_DISPLAYED_REALMS, SECOND } from "shared/constants"
import {
  fetchLeaderboardData,
  fetchPopulation,
  fetchUnclaimedXp,
  fetchXpAllocatable,
  initRealmsDataFromContracts,
  initSeasonInfoData,
} from "redux-state/thunks/island"
import { Path } from "konva/lib/shapes/Path"
import { Group } from "konva/lib/Group"
import { KonvaEventObject } from "konva/lib/Node"
import { useArbitrumProvider } from "./wallets"
import { useInterval, useLocalStorageChange } from "./helpers"

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
      await dispatch(fetchPopulation())
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

export function useIslandRealmsPaths(
  pathRef: MutableRefObject<(Path | null)[]>,
  groupRef: RefObject<Group>,
  setFocus: Dispatch<SetStateAction<boolean>>
) {
  const selectedRealmPanelVisible = useDappSelector(selectRealmPanelVisible)

  const onMouseEnter = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage()

      stage
        ?.container()
        .style.setProperty(
          "cursor",
          selectedRealmPanelVisible ? "default" : "pointer"
        )

      groupRef?.current?.zIndex(selectedRealmPanelVisible ? 1 : 2)
      setFocus(true)
    },
    [groupRef, selectedRealmPanelVisible, setFocus]
  )

  const onMouseLeave = useCallback(
    (e: KonvaEventObject<MouseEvent>) => {
      const stage = e.target.getStage()
      stage?.container().style.setProperty("cursor", "default")
      groupRef?.current?.zIndex(1)
      setFocus(false)
    },
    [setFocus, groupRef]
  )

  useEffect(() => {
    pathRef.current.forEach((ref: Path | null) => {
      if (!ref) return () => {}
      ref.on("mouseenter", onMouseEnter)
      ref.on("mouseleave", onMouseLeave)

      return () => {
        ref.off("mouseenter")
        ref.off("mouseleave")
      }
    })
  }, [pathRef, onMouseLeave, onMouseEnter])
}

export function useDisplayedRealms() {
  const { value: displayedRealm, updateStorage: updateDisplayedRealms } =
    useLocalStorageChange<string[]>(LOCAL_STORAGE_DISPLAYED_REALMS)

  const updateDisplayedRealm = useCallback(
    (id: string) => {
      if (displayedRealm) {
        updateDisplayedRealms([...new Set([...displayedRealm, id])])
      } else {
        updateDisplayedRealms([id])
      }
    },
    [displayedRealm, updateDisplayedRealms]
  )

  const isRealmDisplayed = useCallback(
    (id: string) => displayedRealm?.find((realm) => realm === id),
    [displayedRealm]
  )

  return { isRealmDisplayed, updateDisplayedRealm }
}
