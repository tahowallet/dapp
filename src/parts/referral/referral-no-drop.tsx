import { textGreen20, textGreen40, textLight, trophyGold } from "parts/layout/colors";
import {
  fontSubTitleCssFragment,
  fontTitle36CssFragment,
  fontTitle50CssFragment,
  segmentFontFamily,
} from "parts/layout/fonts";
import { mediumScreenQuery } from "parts/layout/layout";
import { css } from "linaria";
import React, { ReactNode } from "react";

export function ReferralNoDrop() {
  return (
    <div
      className={css`
        position: relative;
        display: grid;
        grid: auto-flow auto / auto;
        max-width: 70rem;
        margin: 0 auto;
        padding: 2rem 1rem;

        ${mediumScreenQuery} {
          padding: 8rem 2rem 2rem;
          grid: auto-flow auto / 1fr 1fr;
        }
      `}
    >
      <img
        width="575"
        height="550"
        className={css`
          flex: 1;
          min-width: 0;
          width: 100%;
          height: auto;
          margin: auto;

          ${mediumScreenQuery} {
            grid-area: 2 / 2 / 3 / 3;
          }
        `}
        src={require("./referral-no-drop-illo.svg")}
      />
      <div
        className={css`
          ${mediumScreenQuery} {
            grid-area: 1 / 1 / 2 / 3;
          }
        `}
      >
        <h2
          className={css`
            margin: 0;
            ${fontTitle50CssFragment}
            color: ${textLight};
            text-align: center;
          `}
        >
          No DOGGO to claim?
        </h2>
        <p
          className={css`
            ${fontSubTitleCssFragment}
            text-align: center;
            color: ${trophyGold};
            max-width: 36rem;
            margin: 1rem auto;
          `}
        >
          Don't worry! There are three ways to earn DOGGO. All from right inside
          your Tally wallet:
        </p>
      </div>
      <div
        className={css`
          display: flex;
          flex-flow: column;

          ${mediumScreenQuery} {
            flex-flow: row-reverse;
          }
        `}
      >
        <ul
          className={css`
            flex: 1;
            margin: 0;
            padding: 0;
          `}
        >
          <Item
            title="Earn"
            body={
              <>
                Deposit your favorite DeFi tokens into Yearn strategies to earn
                DOGGO.
              </>
            }
          />
          <Item
            title="Swap rewards"
            body={
              <>
                Earn rewards every time you swap tokens with Tally Ho! Rewards
                are calculated and distributed every week.
              </>
            }
          />
          <Item
            title="Refer friends"
            body={
              <>
                Share Tally Ho! with a friend and if they&rsquo;re in the token
                drop, you both get a 5% bonus.
              </>
            }
          />
        </ul>
      </div>
    </div>
  );
}

function Item({ title, body }: { title: ReactNode; body: ReactNode }) {
  return (
    <li
      className={css`
        position: relative;
        list-style: none;
        display: flex;
        flex-flow: column;
        min-width: 0;
        margin: 2rem 0;
      `}
    >
      <h3
        className={css`
          margin: 1rem 0;
          ${fontTitle36CssFragment}
          color: ${textGreen20};
        `}
      >
        {title}
      </h3>
      <p
        className={css`
          flex: 1;
          margin: 0;
          font: 18px / 26px ${segmentFontFamily};
          color: ${textGreen40};
        `}
      >
        {body}
      </p>
    </li>
  );
}
