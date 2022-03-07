import {
  green80,
  semanticSuccess,
  textGreen40,
  textLight,
} from "layout/colors";
import {
  segmentFontFamily,
  fontTitle50CssFragment,
  fontTitle58CssFragment,
} from "layout/fonts";
import { ghostButtonCssFragment } from "layout/ghost-button";
import { mediumScreenQuery } from "layout/layout";
import { css } from "linaria";
import React, { ReactNode } from "react";

export function ReferralTokenDrop() {
  return (
    <div
      className={css`
        max-width: 48rem;
        margin: 8rem auto;
        padding: 0 1rem;
        text-align: center;

        ${mediumScreenQuery} {
          text-align: unset;
          padding: 0 2rem;
        }
      `}
    >
      <div
        className={css`
          display: flex;
          flex-flow: column;

          ${mediumScreenQuery} {
            flex-flow: row;
            align-items: center;
          }
        `}
      >
        <div
          className={css`
            display: flex;
            flex: 1;
            flex-flow: column;
            align-items: center;

            ${mediumScreenQuery} {
              align-items: flex-start;
            }
          `}
        >
          <img
            className={css`
              margin: -2rem -2rem 2rem;
              width: auto;
              min-width: 0;
              max-width: 60vw;
              height: auto;
            `}
            width="322"
            height="185"
            src={require("./referral-token-drop-logo.svg")}
          />
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
              font: 18px / 26px ${segmentFontFamily};
              color: ${textGreen40};
            `}
          >
            We dropped 40,000,000 Tally tokens to 3,000,000 Defi users, that
            used: **List of things that make you eligible.**
            <br />
            Only the first 250,000 users are eligible to claim.
          </p>
        </div>
        <ul
          className={css`
            flex: 1;
            padding: 0;
            text-align: center;

            ${mediumScreenQuery} {
              text-align: right;
            }
          `}
        >
          <Stat value="40,000,000" title="TALLY tokens" />
          <Stat value="3,000,000" title="Users in token drop" />
          <Stat value="250,000" title="Users that can claim" />
        </ul>
      </div>
      <a
        className={css`
          display: inline-block;
          margin: 1rem 0;
          ${ghostButtonCssFragment}
        `}
        href="#TODO"
      >
        Read more
      </a>
    </div>
  );
}

function Stat({ value, title }: { value: ReactNode; title: ReactNode }) {
  return (
    <li
      className={css`
        position: relative;
        list-style: none;
        display: flex list-item;
        flex-flow: column;
        border-radius: 1.25rem;

        &::after {
          content: "";
          display: inline-block;
          border-top: 1px solid ${green80};
          width: 8rem;
          margin: 1rem 0;
        }

        &:last-child::after {
          content: none;
        }
      `}
    >
      <div
        className={css`
          ${fontTitle58CssFragment}
          letter-spacing: -0.045em;
          font-feature-settings: "pnum" on, "lnum" on;
          color: ${semanticSuccess};
        `}
      >
        {value}
      </div>
      <div
        className={css`
          font: 22px / 26px ${segmentFontFamily};
          color: ${textGreen40};
        `}
      >
        {title}
      </div>
    </li>
  );
}
