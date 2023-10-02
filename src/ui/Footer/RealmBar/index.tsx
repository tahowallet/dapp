import React, { useRef } from "react"
import populationIcon from "shared/assets/icons/people.svg"
import Icon from "shared/components/Icon"
import Tooltip from "shared/components/Tooltip"
import { separateThousandsByComma } from "shared/utils"
import RealmBarIcon from "./RealmBarIcon"

const MOCKED_DATA = [
  { id: "1", name: "Arbitrum", population: 24000 },
  { id: "2", name: "Arbitrum", population: 22129 },
  { id: "3", name: "Arbitrum", population: 9200 },
  { id: "4", name: "Arbitrum", population: 498 },
  { id: "5", name: "Arbitrum", population: 12 },
]

export default function RealmsBar() {
  const totalPopulation = MOCKED_DATA.map((el) => el.population).reduce(
    (a, b) => a + b
  )

  const sortedData = MOCKED_DATA.sort((a, b) => a.population - b.population)
  const progressBarRef = useRef<HTMLDivElement>(null)

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
            <p
              style={{
                fontSize: 22,
                fontWeight: 600,
                lineHeight: "32px",
                marginRight: 15,
              }}
            >
              {separateThousandsByComma(totalPopulation)}
            </p>
          </div>
        </div>
        <div className="progress_bar" ref={progressBarRef}>
          {sortedData.map((realm, index) => (
            <RealmBarIcon
              progressBar={progressBarRef.current}
              key={realm.id}
              index={index}
              population={realm.population}
              name={realm.name}
              position={realm.population / totalPopulation}
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
        `}
      </style>
    </>
  )
}
