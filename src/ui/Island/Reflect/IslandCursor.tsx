import React from "react"
import CursorLabel, { CursorLabelProps } from "./CursorLabel"

export default function IslandCursor({
  cursor,
  userInfo,
  extraCursor,
}: CursorLabelProps) {
  if (!cursor) return null

  return (
    <>
      {extraCursor && (
        <svg
          style={{
            position: "absolute",
            left: cursor.x,
            top: cursor.y,
          }}
          xmlns="http://www.w3.org/2000/svg"
          width="23"
          height="25"
          viewBox="0 0 23 25"
          fill="none"
        >
          <g filter="url(#filter0_d_5997_16004)">
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M12.8407 12.5161L17.4865 10.8649L5 4L8.64025 17.7764L11.3663 13.668L14.63 17.8454L16.1044 16.6935L12.8407 12.5161Z"
              fill="#363B3E"
            />
            <path
              d="M13.6618 12.7549L17.654 11.3361L18.7031 10.9632L17.7274 10.4268L5.24089 3.56185L4.21854 2.99978L4.51659 4.12773L8.15684 17.9042L8.44129 18.9806L9.05688 18.0529L11.3994 14.5225L14.236 18.1532L14.5439 18.5472L14.9379 18.2394L16.4122 17.0875L16.8063 16.7797L16.4984 16.3857L13.6618 12.7549Z"
              stroke="white"
            />
          </g>
          <defs>
            <filter
              id="filter0_d_5997_16004"
              x="0.437012"
              y="0"
              width="22.4829"
              height="24.1855"
              filterUnits="userSpaceOnUse"
              colorInterpolationFilters="sRGB"
            >
              <feFlood floodOpacity="0" result="BackgroundImageFix" />
              <feColorMatrix
                in="SourceAlpha"
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 127 0"
                result="hardAlpha"
              />
              <feOffset dy="1" />
              <feGaussianBlur stdDeviation="1.5" />
              <feColorMatrix
                type="matrix"
                values="0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0 0.25 0"
              />
              <feBlend
                mode="normal"
                in2="BackgroundImageFix"
                result="effect1_dropShadow_5997_16004"
              />
              <feBlend
                mode="normal"
                in="SourceGraphic"
                in2="effect1_dropShadow_5997_16004"
                result="shape"
              />
            </filter>
          </defs>
        </svg>
      )}
      <CursorLabel
        cursor={cursor}
        userInfo={userInfo}
        extraCursor={extraCursor}
      />
    </>
  )
}
