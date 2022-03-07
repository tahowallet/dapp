import { green120, hunterGreen, textGreen40, textLight } from "layout/colors";
import { segmentFontFamily, fontTitle50CssFragment } from "layout/fonts";
import { ghostButtonCssFragment } from "layout/ghost-button";
import { mediumScreenQuery } from "layout/layout";
import { css } from "linaria";
import React from "react";

export function ReferralWhyTally() {
  return (
    <div
      className={css`
        display: flex;
        flex-flow: column;
        padding: 0 3rem;
        background: linear-gradient(180deg, ${green120} 25%, ${hunterGreen});
      `}
    >
      <div
        className={css`
          display: flex;
          flex-flow: column-reverse;
          gap: 1rem;
          max-width: 64rem;
          margin: 4rem auto;

          ${mediumScreenQuery} {
            flex-flow: row;
          }
        `}
      >
        <div
          className={css`
            flex: 1;
            min-width: 0;
            margin: auto 0;

            & p {
              font: 18px / 26px ${segmentFontFamily};
              color: ${textGreen40};
            }
          `}
        >
          <h2
            className={css`
              margin: 0;
              ${fontTitle50CssFragment}
              color: ${textLight};
            `}
          >
            Why Tally?
          </h2>
          <p>
            Tally was founded to blow open the doors of Web3 and bring the
            community back into the value proposition of storing and
            facilitating decentralized transactions.
          </p>
          <p>
            When Metamask went private in August of 2020, Tally&rsquo;s
            founder&rsquo;s realized that decentralization was under assault
            from the very proponents of a more open and fair financial system.
          </p>
          <div
            className={css`
              text-align: center;

              ${mediumScreenQuery} {
                text-align: unset;
              }
            `}
          >
            <a
              className={css`
                display: inline-block;
                margin: 4rem 0;
                ${ghostButtonCssFragment}
              `}
              href="/"
              target="_blank"
            >
              Visit the Tally website
            </a>
          </div>
        </div>
        <div
          className={css`
            display: flex;
            flex-flow: column;
            flex: 1;
          `}
        >
          <img
            className={css`
              margin: 0 auto;
              width: 100%;
              max-width: 60vw;
              height: auto;
            `}
            width="466"
            height="725"
            src={require("./referral-browser-illo.svg")}
          />
        </div>
      </div>
    </div>
  );
}
