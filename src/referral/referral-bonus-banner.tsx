import { green120, semanticSuccess, green80 } from "layout/colors";
import { segmentFontFamily } from "layout/fonts";
import { css } from "linaria";
import React from "react";
import { mediumScreenQuery } from "layout/layout";

export function ReferralBonusBanner() {
  return (
    <div
      className={css`
        display: flex;
        flex-flow: column;
        margin: -4rem 0;
        padding: 0 2rem 6rem;

        ${mediumScreenQuery} {
          background-color: ${green120};
        }
      `}
    >
      <div
        className={css`
          display: flex;
          flex-flow: row;
          align-items: center;
          gap: 0.5rem;
          margin: 2rem auto;
          padding: 1rem;
          border: 1px solid ${green80};
          border-radius: 2rem;
          color: ${semanticSuccess};
          font: 400 20px / 24px ${segmentFontFamily};
          letter-spacing: 0.02em;
        `}
      >
        <img width={24} height={24} src={require("./icon-bonus.svg")} />
        <span>5% bonus will be applied</span>
      </div>
    </div>
  );
}
