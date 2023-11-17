import { RefObject, useCallback, useEffect, useState } from "react"
import {
  selectDisplayedPopulationById,
  selectMaxDisplayedPopulation,
  selectPopulationById,
  selectRealms,
  selectSortedDisplayedPopulation,
  setRealmDisplayedPopulation,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import { SECOND } from "shared/constants"
import { calculatePopulationIconsPositions, randomInteger } from "shared/utils"
import { useInterval } from "./helpers"

export function useDisplayedPopulation() {
  const realms = useDappSelector(selectRealms)
  const dispatch = useDappDispatch()

  useEffect(() => {
    Object.entries(realms).forEach(
      ([id, { population, displayedPopulation }]) => {
        if (population < displayedPopulation || !displayedPopulation) {
          dispatch(setRealmDisplayedPopulation({ id, population }))
        }
      }
    )
  }, [realms, dispatch])
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
  const [delay] = useState(randomInteger(5, 15) * SECOND) // Generate random intervals for realms

  const populationCallback = useCallback(() => {
    if (population > displayedPopulation) {
      dispatch(
        setRealmDisplayedPopulation({
          id: realmId,
          population: displayedPopulation + 1,
        })
      )

      setShowBubble(true)
    }
  }, [population, displayedPopulation, dispatch, realmId])

  useInterval(populationCallback, population ? delay : null)
  return { showBubble, setShowBubble }
}

export function usePopulationIconPositions(ref: RefObject<HTMLDivElement>) {
  const realmsData = useDappSelector(selectSortedDisplayedPopulation)
  const maxPopulation = useDappSelector(selectMaxDisplayedPopulation)

  const [positions, setPositions] = useState<number[]>([])

  useEffect(() => {
    if (!realmsData.length || !ref.current) return

    const { width } = ref.current.getBoundingClientRect()

    const pos = calculatePopulationIconsPositions(
      width,
      realmsData,
      maxPopulation
    )

    setPositions(pos)
  }, [realmsData, maxPopulation, ref])

  return positions
}
