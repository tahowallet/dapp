import { RefObject, useCallback, useEffect, useState } from "react"
import {
  selectDisplayedPopulationById,
  selectMaxDisplayedPopulation,
  selectPopulationById,
  selectSortedDisplayedPopulation,
  setRealmDisplayedPopulation,
  useDappDispatch,
  useDappSelector,
} from "redux-state"
import { SECOND } from "shared/constants"
import { calculatePopulationIconsPositions, randomInteger } from "shared/utils"
import { useInterval } from "./helpers"

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
  // Generate random intervals for realms
  const [delay] = useState(randomInteger(5, 15) * SECOND)

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
