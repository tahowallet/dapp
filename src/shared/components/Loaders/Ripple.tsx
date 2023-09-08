import classNames from "classnames"
import React from "react"

export default function Ripple({
  size = "4px",
  disabled = false,
}: {
  size?: string
  disabled?: boolean
}) {
  const styles: React.CSSProperties & Record<string, string> = {
    "--size": size,
  }

  return (
    <div style={styles} className={classNames("ripple", { disabled })}>
      <div />
      <div />
      <div />
      <style jsx>
        {`
          .ripple {
            --size: 4px;
            display: flex;
            gap: calc(var(--size) * 1.2);
            --ripple-color: var(--off-white);
          }

          .ripple.disabled div {
            opacity: 0.7;
            animation: none;
          }

          .ripple div {
            width: var(--size);
            height: var(--size);
            border-radius: 50%;
            background: var(--ripple-color);
            animation: grow 1.5s ease-in-out infinite;
            transform-origin: center;
          }

          .ripple div:nth-child(1) {
            animation-delay: 0s;
          }

          .ripple div:nth-child(2) {
            animation-delay: 0.3s;
          }

          .ripple div:nth-child(3) {
            animation-delay: 0.6s;
          }

          @keyframes grow {
            0%,
            100% {
              opacity: 0.5;
              transform: scale(1);
            }

            50% {
              opacity: 1;
              transform: scale(1.75);
            }
          }
        `}
      </style>
    </div>
  )
}
