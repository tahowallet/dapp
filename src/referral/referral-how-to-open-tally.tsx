import { green80, textGreen60, trophyGold } from "layout/colors";
import { fontTitle32CssFragment, segmentFontFamily } from "layout/fonts";
import { largeScreenQuery } from "layout/layout";
import { css } from "linaria";
import React, { ReactNode } from "react";

export function ReferralHowToOpenTally() {
  return (
    <div
      className={css`
        display: flex;
        flex-flow: column;
        align-items: center;
        justify-content: space-between;
        gap: 1rem 2rem;
        margin: 3rem 0;
        padding-bottom: 2rem;
        border-bottom: 1px dashed ${green80};

        ${largeScreenQuery} {
          flex-flow: row;
          align-items: flex-end;
        }
      `}
    >
      <h3
        className={css`
          margin: 0;
          ${fontTitle32CssFragment}
          color: ${trophyGold};
        `}
      >
        Open Tally Ho using keyboard
      </h3>
      <div
        className={css`
          display: flex;
          flex-flow: row wrap;
          gap: 2rem 0;
          font: 18px / 26px ${segmentFontFamily};
          color: ${textGreen60};
        `}
      >
        <KeyCombination label="Mac">
          <Key>
            <img
              width="20"
              height="13"
              alt="option"
              src={require("./mac-key-option.svg")}
            />
          </Key>
          <KeyCombiner />
          <Key>
            <img
              width="19"
              height="17"
              alt="shift"
              src={require("./mac-key-shift.svg")}
            />
          </Key>
          <KeyCombiner />
          <Key>T</Key>
        </KeyCombination>
        <span
          className={css`
            align-self: flex-end;
            margin: 0.5rem 2rem;
          `}
        >
          {" "}
          or{" "}
        </span>
        <KeyCombination label="Windows">
          <Key>alt</Key>
          <KeyCombiner />
          <Key>shift</Key>
          <KeyCombiner />
          <Key>T</Key>
        </KeyCombination>
      </div>
    </div>
  );
}

export function KeyCombination({
  label,
  children,
}: {
  label: ReactNode;
  children: ReactNode;
}) {
  return (
    <div
      className={css`
        display: flex;
        flex-flow: column;
        gap: 0.25rem;
      `}
    >
      <div>{label}</div>
      <div
        className={css`
          display: flex;
        `}
      >
        {children}
      </div>
    </div>
  );
}

export function KeyCombiner() {
  return (
    <span
      className={css`
        margin: 0.5rem 0.75rem;
      `}
    >
      {" "}
      +{" "}
    </span>
  );
}

export function Key({ children }: { children: ReactNode }) {
  return (
    <span
      className={css`
        display: inline-flex;
        align-items: center;
        justify-content: center;
        min-width: 2.625rem;
        padding: 0.25rem 0.5rem;
        border: 1px solid ${textGreen60};
        border-radius: 4px;
        font: 20px / 26px ${segmentFontFamily};
        color: white;
      `}
    >
      {children}
    </span>
  );
}
