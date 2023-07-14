import React from "react"
import classnames from "classnames"

type ButtonProps = {
  children: string
  type?: "primary" | "secondary" | "tertiary"
  size?: "medium" | "large"
  isDisabled?: boolean
  isInactive?: boolean
  iconSrc?: string
  onClick?: (event: React.MouseEvent<HTMLButtonElement>) => void
}

export default function Button({
  children,
  type = "primary",
  size = "medium",
  isDisabled = false,
  isInactive = false,
  iconSrc,
  onClick,
}: ButtonProps) {
  return (
    <>
      <button
        type="button"
        onClick={onClick}
        className={classnames({
          button: true,
          primary: type === "primary",
          secondary: type === "secondary",
          tertiary: type === "tertiary",
          medium: size === "medium",
          large: size === "large",
          disabled: isDisabled,
          inactive: isInactive,
        })}
      >
        {children}
        {iconSrc && <span className="icon" />}
      </button>
      <style jsx>
        {`
          .button {
            display: flex;
            width: fit-content;
            align-items: center;
            justify-content: center;
            border: 0;
            cursor: pointer;
            font-style: normal;
            letter-spacing: 0.5px;
            box-sizing: border-box;
            transition: all 100ms;
          }

          .large {
            font-family: "QuincyCF-Regular";
            font-size: 23px;
            font-weight: 700;
            padding: 20px 32px;
            border-radius: 56px;
          }
          .medium {
            font-family: "Segment-Regular";
            font-size: 18px;
            font-weight: 600;
            line-height: 24px;
            padding: 12px 28px;
            border-radius: 28px;
          }

          .secondary.large {
            padding: 18px 30px;
          }
          .secondary.medium {
            padding: 10px 26px;
          }

          .primary {
            color: var(--hunter-green);
            background: var(--trophy-gold);
            box-shadow: 0px 7px 5px 0px rgba(13, 35, 33, 0.5),
              0px 18px 20px 0px rgba(13, 35, 33, 0.5),
              0px 4px 6px 0px rgba(232, 150, 34, 0.4),
              0px 4px 4px 0px rgba(13, 35, 33, 0.45);
          }
          .primary .icon {
            background-color: var(--hunter-green);
          }
          .secondary {
            color: var(--trophy-gold);
            background: transparent;
            border: 2px solid var(--trophy-gold);
          }
          .secondary .icon {
            background-color: var(--trophy-gold);
          }

          .primary:hover,
          .primary:active,
          .secondary:hover,
          .secondary:active {
            color: var(--hunter-green);
            background: var(--gold80);
            box-shadow: 0 0 0 0 transparent;
            border-color: var(--gold80);
          }
          .primary:hover .icon,
          .primary:active .icon,
          .secondary:hover .icon,
          .secondary:active .icon {
            background-color: var(--hunter-green);
          }
          .primary:active,
          .secondary:active {
            background: var(--gold120);
            border-color: var(--gold120);
          }
          .secondary.disabled {
            border-color: var(--green60);
            color: var(--hunter-green);
          }
          .secondary.disabled .icon {
            background-color: var(--hunter-green);
          }

          .tertiary {
            background: transparent;
            color: var(--trophy-gold);
            padding: 4px 0;
          }
          .tertiary .icon {
            background-color: var(--trophy-gold);
          }
          .tertiary:hover {
            color: var(--gold80);
          }
          .tertiary:hover .icon {
            background-color: var(--gold80);
          }
          .tertiary:active {
            color: var(--gold120);
          }
          .tertiary:active .icon {
            background-color: var(--gold120);
          }
          .tertiary.disabled,
          .tertiary.disabled:hover,
          .tertiary.disabled:active {
            color: var(--green60);
            background: transparent;
          }
          .tertiary.disabled .icon {
            background-color: var(--green60);
          }

          .disabled,
          .disabled:hover,
          .disabled:active {
            pointer-events: none;
            background: var(--green60);
            box-shadow: 0 0 0 0 transparent;
            cursor: auto !important;
          }

          .inactive,
          .inactive:hover,
          .inactive:active {
            pointer-events: none;
            opacity: 0.5;
            cursor: auto !important;
          }

          .icon {
            -webkit-mask-image: url(${iconSrc});
            mask-image: url(${iconSrc});
            -webkit-mask-size: cover;
            mask-size: cover;
            margin-left: 8px;
          }
          .medium .icon {
            width: 16px;
            height: 16px;
          }
          .large .icon {
            width: 24px;
            height: 24px;
          }
        `}
      </style>
    </>
  )
}
