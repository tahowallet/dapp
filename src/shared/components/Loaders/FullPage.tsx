import React from "react"
import { animated } from "@react-spring/web"
import { useVisibilityTransition } from "shared/hooks"

// Source: https://codepen.io/Vlad-Todirut/pen/LYMdvao
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
          zIndex: 999,
          pointerEvents: loaded ? "none" : "all",
        }}
      >
        <div className="demo">
          <div className="circle">
            <div className="inner" />
          </div>
          <div className="circle">
            <div className="inner" />
          </div>
          <div className="circle">
            <div className="inner" />
          </div>
          <div className="circle">
            <div className="inner" />
          </div>
          <div className="circle">
            <div className="inner" />
          </div>
        </div>
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
            z-index: 999;
          }

          .demo {
            width: 220px;
            height: 224px;
            border-radius: 100%;
            -webkit-animation: spin 5s infinite linear;
            animation: spin 5s infinite linear;
          }

          .circle {
            width: 100%;
            height: 100%;
            position: absolute;
          }

          .circle .inner {
            width: 100%;
            height: 100%;
            border-radius: 100%;
            border: 11px solid rgba(237, 154, 38, 0.9);
            border-right: none;
            border-top: none;
            backgroudn-clip: padding;
            box-shadow: inset 0px 0px 10px rgba(237, 154, 38, 0.5);
          }

          .loading_text {
            text-align: center;
            color: var(--secondary-s1-70);
            margin-top: 20px;
          }

          @-webkit-keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }

          @keyframes spin {
            from {
              transform: rotate(0deg);
            }
            to {
              transform: rotate(360deg);
            }
          }
          .circle:nth-of-type(0) {
            transform: rotate(0deg);
          }
          .circle:nth-of-type(0) .inner {
            -webkit-animation: spin 3s infinite linear;
            animation: spin 3s infinite linear;
          }

          .circle:nth-of-type(1) {
            transform: rotate(70deg);
          }
          .circle:nth-of-type(1) .inner {
            -webkit-animation: spin 3s infinite linear;
            animation: spin 3s infinite linear;
          }

          .circle:nth-of-type(2) {
            transform: rotate(140deg);
          }
          .circle:nth-of-type(2) .inner {
            -webkit-animation: spin 3s infinite linear;
            animation: spin 3s infinite linear;
          }
        `}
      </style>
    </>
  )
}
