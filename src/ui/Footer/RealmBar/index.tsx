import React, { useEffect, useRef, useState } from "react"
import populationIcon from "shared/assets/icons/people.svg"
import Icon from "shared/components/Icon"
import Tooltip from "shared/components/Tooltip"
import {
  calculateRealmsByPopulationIconPositions,
  separateThousandsByComma,
} from "shared/utils"
import {
  selectMaxPopulation,
  selectSortedPopulation,
  selectTotalPopulation,
  useDappSelector,
} from "redux-state"
import RealmBarIcon from "./RealmBarIcon"

export default function RealmsBar() {
  const realmsData = useDappSelector(selectSortedPopulation)
  const totalPopulation = useDappSelector(selectTotalPopulation)
  const maxPopulation = useDappSelector(selectMaxPopulation)

  const [positions, setPositions] = useState<number[]>([])
  const progressBarRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (!realmsData.length || !maxPopulation || !progressBarRef.current) return

    const { width } = progressBarRef.current.getBoundingClientRect()
    const pos = calculateRealmsByPopulationIconPositions(
      width,
      realmsData,
      maxPopulation
    )

    setPositions(pos)
  }, [realmsData, maxPopulation, progressBarRef])

  return (
    <>
      <div className="bar">
        <div className="top_bar">
          <div className="row_center">
            <Icon
              src={populationIcon}
              type="image"
              color="currentColor"
              width="24px"
              height="24px"
              style={{ marginRight: 5 }}
            />
            <p style={{ color: "var(--secondary-s1-60)" }}>
              Realms by population
            </p>
            <Tooltip positionY="top" positionX="center" gap="5px">
              TBD
            </Tooltip>
          </div>
          <div className="row_center" style={{ gap: 4 }}>
            <p style={{ color: "var(--secondary-s1-60)" }}>Total:</p>
            <p className="total_value">
              {separateThousandsByComma(totalPopulation)}
            </p>
          </div>
        </div>
        <div className="progress_bar" ref={progressBarRef}>
          {realmsData.map((realm, index) => (
            <RealmBarIcon
              key={realm.id}
              position={positions[index]}
              population={realm.population}
              name={realm.name}
            />
          ))}
        </div>
      </div>
      <style jsx>
        {`
          .bar {
            position: absolute;
            bottom: 0;
            left: 50%;
            transform: translateX(-50%);
            border-top-left-radius: 48px;
            border-top-right-radius: 48px;
            background: rgba(13, 35, 33, 0.8);
            width: 661px;
            padding: 8px 32px 16px;
          }
          .top_bar {
            margin-bottom: 3px;
            display: flex;
            width: 100%;
            justify-content: space-between;
          }
          .progress_bar {
            background: var(--primary-p1-80);
            border-radius: 48px;
            height: 40px;
            width: 100%;
            position: relative;
          }
          .total_value {
            font-size: 22px;
            font-weight: 600;
            line-height: 32px;
            margin-right: 15px;
          }
        `}
      </style>
    </>
  )
}
