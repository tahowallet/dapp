import { green120, hunterGreen, textGreen40, textLight } from "layout/colors";
import { fontTitle50CssFragment, segmentFontFamily } from "layout/fonts";
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
        padding: 0 1.5rem;
        background: linear-gradient(180deg, ${green120} 25%, ${hunterGreen});

        ${mediumScreenQuery} {
          padding: 0 3rem;
        }
      `}
    >
      <div
        className={css`
          display: flex;
          flex-flow: column-reverse;
          gap: 2rem;
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
              font: 14px / 24px ${segmentFontFamily};
              color: ${textGreen40};

              ${mediumScreenQuery} {
                font: 18px / 26px ${segmentFontFamily};
              }
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
            Say hello to Tally Ho!
          </h2>
          <p>
            Tally Ho! is the first community-owned wallet for web3. Unlike every
            other wallet, Tally Ho! is owned by a DAO. That means it&rsquo;s
            designed to enrich the web3 community—not corporate shareholders.
          </p>
          <p>If you own DOGGO tokens, you&rsquo;re an owner.</p>
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
                margin: 2rem 0;
                ${ghostButtonCssFragment}
              `}
              href="/"
              target="_blank"
            >
              Learn more
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
