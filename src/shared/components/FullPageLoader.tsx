import React from "react"
import GoldenCircleSpinner from "./Loaders/GoldenCircleSpinner"

export default function FullPageLoader() {
  return (
    <>
      <div className="container column_center">
        <GoldenCircleSpinner />
        <div className="loading_text">
          <p>Loading your experience...</p>
        </div>
      </div>
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
