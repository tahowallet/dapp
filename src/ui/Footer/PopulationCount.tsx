import React from "react"
import Icon from "shared/components/Media/Icon"
import { separateThousandsByComma } from "shared/utils"
import populationIcon from "shared/assets/icons/people.svg"
import { selectTotalPopulation, useDappSelector } from "redux-state"
import { useVisibilityTransition } from "shared/hooks"
import { animated } from "@react-spring/web"

export default function PopulationCount() {
  const population = useDappSelector(selectTotalPopulation)
  const transition = useVisibilityTransition(population > 0)

  if (!population || process.env.IS_PORTAL_CLOSED === "true") return null

  return (
    <>
      <animated.div
        style={{
          ...transition,
          position: "absolute",
          left: "50%",
          transform: "translateX(-50%)",
          bottom: 13,
          textAlign: "center",
        }}
        className="population_count"
      >
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
          {separateThousandsByComma(population, 0)}
        </p>
      </animated.div>
      <style jsx>{`
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
