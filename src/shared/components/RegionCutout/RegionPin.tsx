import React from "react"
import {
  selectStakingRegionId,
  useDappSelector,
  selectDisplayedRegionId,
} from "redux-state"
import portrait from "shared/assets/portrait.png"

export default function RegionPin() {
  const stakingRegionId = useDappSelector(selectStakingRegionId)
  const displayedRegionId = useDappSelector(selectDisplayedRegionId)

  if (stakingRegionId !== displayedRegionId) return null

  return (
    <>
      <div className="region_pin">
        <img src={portrait} height={59} width={59} alt="Portrait" />
        <svg
          xmlns="http://www.w3.org/2000/svg"
          width="75"
          height="87"
          viewBox="0 0 75 87"
          fill="none"
        >
          <path
            fillRule="evenodd"
            clipRule="evenodd"
            d="M55.3036 69.9604C55.3122 69.9317 55.3317 69.9075 55.358 69.8929C63.5208 65.3558 69.9946 57.7601 72.9037 48.1125C78.8368 28.4363 67.6957 7.67583 48.0195 1.74276C28.3433 -4.1903 7.58288 6.95073 1.64982 26.6269C-1.25402 36.2571 -0.0678506 46.147 4.20722 54.4312C4.22533 54.4663 4.23315 54.5058 4.2297 54.5451C4.22602 54.5871 4.23518 54.6292 4.25597 54.6659L21.4645 85.0245C21.9915 85.9541 23.1561 86.3053 24.1091 85.8219L55.2454 70.0298C55.2735 70.0156 55.2945 69.9905 55.3036 69.9604Z"
            fill="url(#paint0_linear_3181_22588)"
          />
          <defs>
            <linearGradient
              id="paint0_linear_3181_22588"
              x1="48.0195"
              y1="1.74276"
              x2="22.6272"
              y2="85.9531"
              gradientUnits="userSpaceOnUse"
            >
              <stop stopColor="#023935" />
              <stop offset="1" stopColor="#002825" />
            </linearGradient>
          </defs>
        </svg>
      </div>
      <style jsx>{`
        .region_pin {
          position: absolute;
          z-index: 2;
          left: 50%;
          bottom: 50%;
          transform: translateX(-50%);
          height: 87px;
        }
        .region_pin img {
          position: absolute;
          height: 59px;
          width: 59px;
          border-radius: 50%;
          overflow: hidden;
          left: 8px;
          top: 8px;
        }
      `}</style>
    </>
  )
}
