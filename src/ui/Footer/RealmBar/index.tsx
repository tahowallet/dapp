import React, { useRef } from "react"
import populationIcon from "shared/assets/icons/people.svg"
import Icon from "shared/components/Media/Icon"
import Tooltip from "shared/components/Dialogs/Tooltip"
import { separateThousandsByComma } from "shared/utils"
import {
  selectSortedDisplayedPopulation,
  selectTotalDisplayedPopulation,
  useDappSelector,
} from "redux-state"
import { usePopulationIconPositions } from "shared/hooks"
import RealmBarIcon from "./RealmBarIcon"

export default function RealmsBar() {
  const realmsData = useDappSelector(selectSortedDisplayedPopulation)
  const totalPopulation = useDappSelector(selectTotalDisplayedPopulation)

  const progressBarRef = useRef<HTMLDivElement>(null)

  const positions = usePopulationIconPositions(progressBarRef)

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
            <Tooltip positionY="top" positionX="right" gap="5px">
              This graph provides a visual overview each realm&apos;s standing
              in terms of population relative to others. Hover over each
              Realm&apos;s icon to see the exact population count.
            </Tooltip>
          </div>
          <div className="row_center" style={{ gap: 4 }}>
            <p style={{ color: "var(--secondary-s1-60)" }}>Total:</p>
            <p className="total_value">
              {separateThousandsByComma(totalPopulation, 0)}
            </p>
          </div>
        </div>
        <div className="progress_bar" ref={progressBarRef}>
          {realmsData.map((realm, index) => (
            <RealmBarIcon
              key={realm.id}
              id={realm.id}
              position={positions[index]}
              population={realm.displayedPopulation}
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
