import React from "react"
import { useVisibilityTransition } from "shared/hooks"
import { animated } from "@react-spring/web"
import GoldenCircleSpinner from "./Loaders/GoldenCircleSpinner"

export default function FullPageLoader({ loaded }: { loaded: boolean }) {
  const transition = useVisibilityTransition(!loaded)

  return (
    <>
      <animated.div
        style={{
          ...transition,
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(179deg, #0d2321 0.77%, #153d3b 101%)",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          overflow: "hidden",
          position: "fixed",
          inset: 0,
          zIndex: 950,
          pointerEvents: loaded ? "none" : "all",
        }}
      >
        <GoldenCircleSpinner />
        <div className="loading_text">
          <p>Loading your experience...</p>
        </div>
      </animated.div>
      <style jsx>
        {`
          .container {
            width: 100vw;
            height: 100vh;
            background: linear-gradient(179deg, #0d2321 0.77%, #153d3b 101%);
            justify-content: center;
            overflow: hidden;
            position: fixed;
            inset: 0;
          }
          .loading_text {
            text-align: center;
            color: var(--secondary-s1-70);
            margin-top: 20px;
          }
        `}
      </style>
    </>
  )
}
