import {
  green120,
  green80,
  semanticSuccess,
  textGreen40,
  textLight,
} from "parts/layout/colors";
import {
  fontTitle36CssFragment,
  fontTitle50CssFragment,
  segmentFontFamily,
} from "parts/layout/fonts";
import { ghostButtonCssFragment } from "parts/layout/ghost-button";
import { mediumScreenQuery } from "parts/layout/layout";
import { css } from "linaria";
import React, { ReactNode } from "react";

export function ReferralTokenDrop() {
  return (
    <div
      className={css`
        background: no-repeat top right / min(160%, 60rem) auto
            url(${require("./token-drop-background.svg")}),
          ${green120};

        ${mediumScreenQuery} {
          background: no-repeat top / 80rem auto
              url(${require("./token-drop-background.svg")}),
            ${green120};
        }
      `}
    >
      <div
        className={css`
          display: flex;
          flex-flow: column;
          max-width: 60rem;
          margin: 2rem auto 8rem;
          padding: min(55%, 20rem) 1.5rem 0;

          ${mediumScreenQuery} {
            text-align: unset;
            padding: 6rem 2rem 0;
          }
        `}
      >
        <div
          className={css`
            display: flex;
            flex-flow: column;
            margin: 0 auto;

            ${mediumScreenQuery} {
              margin: 0;
            }
          `}
        >
          <div
            className={css`
              display: flex;
              flex: 1;
              flex-flow: column;
              align-items: center;
              max-width: 30rem;

              ${mediumScreenQuery} {
                align-items: flex-start;
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
              Token drop
            </h2>
            <p
              className={css`
                font: 14px / 24px ${segmentFontFamily};
                color: ${textGreen40};

                ${mediumScreenQuery} {
                  font: 18px / 26px ${segmentFontFamily};
                }
              `}
            >
              We&rsquo;re launching DOGGO with the largest fair launch in
              history. It&rsquo;s the only way to make sure the DAO stays
              credibly neutral. Over 3 million Ethereum addresses are eligible
              to claim DOGGO. If you&rsquo;ve used MetaMask Swaps or popular
              DeFi apps like UniSwap, you&rsquo;re in the drop.
              <br />
              Act fast! While 3 million addresses have been distributed DOGGO,
              only the first 250,000 will be able to claim.
            </p>
            <ul
              className={css`
                display: flex;
                padding: 0;
              `}
            >
              <Stat value="3 Million" title="Eligible addresses" />
              <Stat value="250,000" title="Users can claim" />
            </ul>

            <a
              className={css`
                display: block;
                margin: 1rem 0;
                ${ghostButtonCssFragment}
              `}
              href="#TODO"
            >
              Who&rsquo;s in the token drop?
            </a>
          </div>
        </div>
      </div>
    </div>
  );
}

function Stat({ value, title }: { value: ReactNode; title: ReactNode }) {
  return (
    <li
      className={css`
        position: relative;
        list-style: none;
        display: flex;
        flex-flow: row;
        border-radius: 1.25rem;

        &::after {
          content: "";
          display: block;
          border-left: 1px solid ${green80};
          height: 100%;
          margin: 0 2rem;
        }

        &:last-child::after {
          content: none;
        }
      `}
    >
      <div
        className={css`
          display: flex;
          flex-flow: column;
        `}
      >
        <div
          className={css`
            ${fontTitle36CssFragment}
            letter-spacing: -0.045em;
            font-feature-settings: "pnum" on, "lnum" on;
            color: ${semanticSuccess};
          `}
        >
          {value}
        </div>
        <div
          className={css`
            font: 18px / 26px ${segmentFontFamily};
            color: ${textGreen40};
          `}
        >
          {title}
        </div>
      </div>
    </li>
  );
}
