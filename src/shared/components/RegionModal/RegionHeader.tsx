import React from "react"

import Icon from "shared/components/Icon"

import iconCommunity from "shared/assets/icons/people.svg"
import iconStar from "shared/assets/icons/star.svg"
import { getRegionData } from "shared/constants"
import {
  RegionCutout,
  RegionBackgroundCutout,
} from "shared/components/RegionCutout"
import { selectDisplayedRegionId, useDappSelector } from "redux-state"

export const mockData = {
  details:
    "KryptoKeep is the meeting place of explorers that have tried out the Keep Network",
  pop: 34_350,
  xpfn: "NFT Collector",
} as const

export default function RegionHeader() {
  const regionId = useDappSelector(selectDisplayedRegionId)

  if (!regionId) return null

  const data = { ...mockData, ...getRegionData(regionId) }

  return (
    <header className="column">
      <div className="region_header_bg">
        <RegionBackgroundCutout />
      </div>
      <div className="region_thumb">
        <RegionCutout />
      </div>
      <h1>{data.name}</h1>
      <div className="region_details_header column">
        <div className="tags row">
          <div className="tag column">
            <span
              style={{ color: "var(--semantic-info)" }}
              className="tag_label row"
            >
              <Icon
                src={iconCommunity}
                height="24px"
                width="24px"
                color="currentColor"
              />
              Population
            </span>
            <span>{data.pop}</span>
          </div>
          <div className="tag column">
            <span
              style={{ color: "var(--semantic-success)" }}
              className="tag_label row"
            >
              <Icon
                src={iconStar}
                height="18px"
                width="18px"
                color="currentColor"
              />
              XP Function
            </span>
            <span>{data.xpfn}</span>
          </div>
        </div>
        <p className="region_description">{data.details}</p>
      </div>
      <style jsx>
        {`
          header {
            user-select: none;
            gap: 32px;
          }

          .region_details_header {
            max-width: 385px;
            gap: 16px;
          }

          .region_header_bg {
            position: absolute;
            z-index: -1;
            top: 0;
            left: 0;
            right: 0;
            border-radius: 16px;
            overflow: hidden;
          }

          .tags {
            gap: 24px;
          }
          .tag_label {
            align-items: center;
            gap: 4px;
          }

          .region_thumb {
            position: absolute;
            right: 0;
            top: 0;
            transform: translateY(-48px);
          }

          .region_description {
            color: var(--secondary-s1-70);
          }
        `}
      </style>
    </header>
  )
}
