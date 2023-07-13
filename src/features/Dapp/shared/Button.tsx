import React from "react";
import classnames from "classnames";
import {
  buttonBackgroundGold120,
  buttonBackgroundGold80,
  buttonBackgroundGreen60,
  buttonBackgroundTrophyGold,
  buttonLabelHunterGreen,
} from "shared/styles/colors";
import { buttonLabelQuincy24, buttonLabelSegment18 } from "shared/styles/fonts";

type ButtonProps = {
  children: string;
  type?: "primary" | "secondary" | "tertiary";
  size?: "medium" | "large";
  isDisabled?: boolean;
  iconSrc?: string;
};

export default function Button({
  children,
  type = "primary",
  size = "medium",
  isDisabled = false,
}: ButtonProps) {
  return (
    <>
      <button
        className={classnames({
          button: true,
          primary: type === "primary",
          secondary: type === "secondary",
          tertiary: type === "tertiary",
          medium: size === "medium",
          large: size === "large",
          disabled: isDisabled,
        })}
      >
        {children}
      </button>
      <style>
        {`
          .button {
            border: 0;
            cursor: pointer;
            transition: background 100ms, box-shadow 100ms;
            font-style: normal;
            letter-spacing: 0.5px;
            box-sizing: border-box;
          }
          
          .large {
            font: ${buttonLabelQuincy24};
            font-size: 23px;
            font-weight: 700;
            padding: 20px 24px;
            border-radius: 56px;
          }
          .medium {
            font: ${buttonLabelSegment18};
            font-size: 18px;
            font-weight: 600;
            line-height: 24px;
            padding: 12px 20px;
            border-radius: 28px;
          }

          .secondary.medium {
            padding: 10px 18px;
          }
          .secondary.medium:hover,
          .secondary.medium:active,
          .secondary.medium.disabled {
            padding: 12px 20px;
          }

          .secondary.large {
            padding: 18px 22px;
          }
          .secondary.large:hover,
          .secondary.large:active,
          .secondary.large.disabled {
            padding: 20px 24px;
          }

          .primary {
            color: ${buttonLabelHunterGreen};
            background: ${buttonBackgroundTrophyGold};
            box-shadow: 0px 7px 5px 0px rgba(13, 35, 33, 0.50), 0px 18px 20px 0px rgba(13, 35, 33, 0.50), 0px 4px 6px 0px rgba(232, 150, 34, 0.40), 0px 4px 4px 0px rgba(13, 35, 33, 0.45);
          }
          .secondary {
            color: ${buttonBackgroundTrophyGold};
            background: transparent;
            border: 2px solid ${buttonBackgroundTrophyGold};
          }

          .primary:hover,
          .primary:active,
          .secondary:hover,
          .secondary:active {
            color: ${buttonLabelHunterGreen};
            background: ${buttonBackgroundGold80};
            box-shadow: 0 0 0 0 transparent;
            border: 0;
          }
          .primary:active,
          .secondary:active {
            background: ${buttonBackgroundGold120}
          }
          .secondary.disabled {
            border: 0;
            color: ${buttonLabelHunterGreen};
          }

          .tertiary {
            background: transparent;
            color: ${buttonBackgroundTrophyGold};
            padding: 4px 0;
          }
          .tertiary:hover {
            color: ${buttonBackgroundGold80}
          }
          .tertiary:active {
            color: ${buttonBackgroundGold120}
          }
          .tertiary.disabled,
          .tertiary.disabled:hover,
          .tertiary.disabled:active {
            color: ${buttonBackgroundGreen60};
            background: transparent;
          }

          .disabled,
          .disabled:hover,
          .disabled:active {
            background: ${buttonBackgroundGreen60};
            box-shadow: 0 0 0 0 transparent;
            cursor: auto!important;
          }
        `}
      </style>
    </>
  );
}
