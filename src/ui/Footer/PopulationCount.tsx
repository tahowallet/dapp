import React from "react"
import Icon from "shared/components/Icon"
import { separateThousandsByComma } from "shared/utils"
import populationIcon from "shared/assets/icons/people.svg"
import { selectTotalPopulation, useDappSelector } from "redux-state"

export default function PopulationCount() {
  const population = useDappSelector(selectTotalPopulation)

  if (!population) return null

  return (
    <>
      <div className="population_count">
        <div className="row_center population_label">
          <Icon
            src={populationIcon}
            height="24px"
            width="24px"
            type="image"
            color="currentColor"
          />
          <p>Population</p>
        </div>
        <p style={{ font: "var(--text-h1)" }}>
          {separateThousandsByComma(population)}
        </p>
      </div>
      <style jsx>{`
        .population_count {
          position: absolute;
          left: 50%;
          transform: translateX(-50%);
          bottom: 13px;
          text-align: center;
        }
        .population_label {
          gap: 7px;
        }
        .population_label p {
          color: var(--secondary-s1-60);
        }
      `}</style>
    </>
  )
}
