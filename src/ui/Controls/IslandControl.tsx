import React from "react"
import {
  selectIslandOverlay,
  setIslandOverlay,
  useDappDispatch,
  useDappSelector,
} from "redux-state"

function IslandControlIcon() {
  const isOverlay = useDappSelector(selectIslandOverlay)

  return (
    <svg
      width="32"
      height="32"
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      style={{ position: "relative", zIndex: 2 }}
    >
      <circle
        cx="8"
        cy="8"
        r="2"
        fill={isOverlay !== "none" ? "#11BEA9" : "#0D2321"}
      />
      <circle cx="16" cy="8" r="2" fill="#0D2321" />
      <circle cx="24" cy="8" r="2" fill="#0D2321" />
      <circle cx="9" cy="16" r="2" fill="#0D2321" />
      <circle
        cx="16"
        cy="16"
        r="2"
        fill={isOverlay !== "none" ? "#3CC5EE" : "#0D2321"}
      />
      <circle cx="24" cy="16" r="2" fill="#0D2321" />
      <circle
        cx="8"
        cy="24"
        r="2"
        fill={isOverlay !== "none" ? "#F2B824" : "#0D2321"}
      />
      <circle cx="16" cy="24" r="2" fill="#0D2321" />
      <circle cx="24" cy="24" r="2" fill="#0D2321" />
      <defs>
        <filter
          id="filter0_b_2911_18797"
          x="-52"
          y="-52"
          width="138"
          height="138"
          filterUnits="userSpaceOnUse"
          colorInterpolationFilters="sRGB"
        >
          <feFlood floodOpacity="0" result="BackgroundImageFix" />
          <feGaussianBlur in="BackgroundImageFix" stdDeviation="26" />
          <feComposite
            in2="SourceAlpha"
            operator="in"
            result="effect1_backgroundBlur_2911_18797"
          />
          <feBlend
            mode="normal"
            in="SourceGraphic"
            in2="effect1_backgroundBlur_2911_18797"
            result="shape"
          />
        </filter>
      </defs>
    </svg>
  )
}

export default function IslandControl() {
  const isOverlay = useDappSelector(selectIslandOverlay)
  const dispatch = useDappDispatch()

  return (
    <>
      <button
        type="button"
        className="map_control button_reset center"
        onClick={() =>
          dispatch(setIslandOverlay(isOverlay === "none" ? "dark" : "none"))
        }
      >
        <IslandControlIcon />
      </button>
      <style jsx>
        {`
          .map_control {
            width: 34px;
            height: 34px;
            padding: 0;
            background: var(--secondary-s1-20);
            border-radius: 4px;
            border: 1px solid var(--secondary-s1-50);
            transition: all 0.3s;
            position: relative;
          }
          .map_control:hover {
            border: 1px solid var(--secondary-s1-70);
          }
          .map_control::after {
            content: "";
            position: absolute;
            opacity: 0;
            inset: 0;
            background: var(--secondary-s1-10);
            transition: opacity 0.3s;
          }
          .map_control:hover::after {
            opacity: 1;
          }
        `}
      </style>
    </>
  )
}
