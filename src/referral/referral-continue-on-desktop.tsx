import { gold20, hunterGreen } from "layout/colors";
import {
  fontTitle50CssFragment,
  segmentFontFamily,
  fontSubTitleCssFragment,
} from "layout/fonts";
import { mediumScreenQuery } from "layout/layout";
import { css } from "linaria";
import React from "react";

export function ReferralContinueOnDesktop() {
  return (
    <div
      className={css`
        display: flex;
        flex-flow: column;
        background: no-repeat top / 100vw auto
            url(${require("./gold-forest-background.svg")}),
          no-repeat linear-gradient(to bottom, transparent 40vw, ${gold20} 40vw);
        margin: -30vw 0 0;
        padding: 60vw 2rem 2rem;
        color: ${hunterGreen};
        text-align: center;

        ${mediumScreenQuery} {
          display: none;
        }
      `}
    >
      <img
        width="120"
        height="92"
        className={css`
          margin: 0 auto;
        `}
        src={require("./referral-continue-on-desktop.svg")}
      />
      <h2
        className={css`
          ${fontTitle50CssFragment}
        `}
      >
        Use desktop to claim
      </h2>
      <p
        className={css`
          font: 14px / 1.33 ${segmentFontFamily};
        `}
      >
        The Tally extension that you need to check if you are eligible and claim
        is only available on desktop browsers.
      </p>
    </div>
  );
}
