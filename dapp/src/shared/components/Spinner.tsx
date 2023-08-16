import React from "react"
import classNames from "classnames"

type SpinnerProps = {
  /**
   * @default "medium"
   */
  size?: "small" | "medium"
}

export default function Spinner(props: SpinnerProps) {
  const { size = "medium" } = props

  return (
    <div className={classNames("spinner", size)}>
      <style jsx>
        {`
          .spinner {
            width: 28px;
            height: 28px;
            border-radius: 50%;
            border: 2px solid var(--secondary-s1-40);
            border-top-color: transparent;
            box-sizing: border-box;
            animation: spinner 1s linear infinite;
          }
          @keyframes spinner {
            to {
              transform: rotate(360deg);
            }
          }
          .small {
            width: 14px;
            height: 14px;
            animation: spinner 0.8s linear infinite;
          }
        `}
      </style>
    </div>
  )
}
