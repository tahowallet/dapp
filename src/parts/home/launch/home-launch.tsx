import { css } from "linaria";
import * as colors from "parts/layout/colors";
import * as styles from "parts/layout/styles";
import React from "react";

export function HomeLaunch() {
  return (
    <div
      className={css`
        ${styles.sectionWideLayout}
        ${styles.darkTextContainer}
        text-align: center;
      `}
    >
      <div
        className={css`
          width: fit-content;
          margin: 0 auto;
        `}
      >
        <img
          width="316"
          height="286"
          src={require("./home-launch-illo.svg")}
          className={css`
            margin: -50% 0 20%;
          `}
        />
      </div>
      <h2>Biggest fair launch in history.</h2>
      <p
        className={css`
          ${styles.textLayout}
        `}
      >
        On March 21, the DOGGO token was distributed to 3 million Ethereum
        addresses. If you&rsquo;ve used MetaMask Swaps or popular DeFi apps like
        UniSwap, you&rsquo;re in the drop.
      </p>

      <div
        className={css`
          display: grid;
          grid: auto / auto-flow 1fr;
          gap: 1rem;
          width: 100%;
          padding: 2rem 0;
          ${styles.darkGoldTextContainer}

          & > div {
            display: flex;
            flex-flow: column;
            border: 1px solid ${colors.trophyGold};
            padding: 2rem 1rem;

            ${styles.tileLayout}
            ${styles.tileLightBackground}
              ${styles.tileShadow}

              & > .number {
              ${styles.showcaseFont}
              color: ${colors.hunterGreen};
              margin: -0.5rem 0 -1.5rem;
            }

            & > .support {
              ${styles.title2Font}
              flex: 1;
              color: ${colors.textGreen40};
            }
          }
        `}
      >
        <div>
          <div className="number">15+</div>
          <div className="support">Billion</div>
          <div>$DOGGO distributed</div>
        </div>
        <div>
          <div className="number">3</div>
          <div className="support">Million</div>
          <div>Unique Addresses</div>
        </div>
        <div>
          <div>The first</div>
          <div className="number">250</div>
          <div className="support">Thousand</div>
          <div>are eligible</div>
        </div>
      </div>
      <p>Download Tally Ho to see if you&rsquo;re eligible.</p>
      <a
        className={css`
          ${styles.buttonFont}
          ${styles.buttonLayout}
          ${styles.buttonShadow}
          display: inline-block;
          background-color: ${colors.semanticSuccess};
        `}
        href="#download"
      >
        Download &amp; Claim
      </a>
      <div
        className={css`
          display: flex;
          ${styles.tileLayout}
          ${styles.tileLightBackground}
          ${styles.tileShadow}
          margin: 6rem 0;
          padding: 2rem 3.5rem;
          gap: 2rem;
        `}
      >
        <div
          className={css`
            flex: 1;
            text-align: left;
          `}
        >
          <div>From our blog</div>
          <h3>Who&rsquo;s in the merkledrop?</h3>
        </div>
        <div
          className={css`
            ${styles.pillLayout}
            border: 1px solid ${colors.trophyGold};
            color: ${colors.trophyGold};
            margin: auto 0;
          `}
        >
          Read more
        </div>
      </div>
    </div>
  );
}
