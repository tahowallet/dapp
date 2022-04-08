import { css } from "linaria";
import * as colors from "parts/layout/colors";
import * as styles from "parts/layout/styles";
import React from "react";

export function HomeRewards() {
  return (
    <div
      className={css`
        ${styles.sectionWideLayout}
        ${styles.lightTextContainer}
        text-align: center;
      `}
    >
      <h2>So. Many. Rewards.</h2>
      <p>
        Shape Tally&rsquo;s future and benefit from future revenue <br /> by
        holding DOGGO. Three ways to earn.
      </p>
      <div
        className={css`
          display: grid;
          grid: auto / auto-flow 1fr;
          align-items: center;
          gap: 1rem;
          padding: 8rem 0;

          & > div {
            ${styles.tileLayout}
            ${styles.tileDarkBackground}
            padding: 2rem 0;
            min-height: 26rem;

            h3 {
              padding: 2rem 4rem;
            }

            border: 1px solid ${colors.green80};
          }
        `}
      >
        <div>
          <h3>
            Earn <br /> by Gifting
          </h3>
          <img src={require("./home-reward-1-earn.svg")} />
        </div>
        <div>
          <h3>
            High <br /> APR Vaults
          </h3>
          <img src={require("./home-reward-2-vaults.svg")} />
        </div>
        <div>
          <h3>
            Rebates on <br /> Swaps
          </h3>
          <img src={require("./home-reward-3-swap.svg")} />
        </div>
      </div>
      <div>
        <a
          className={css`
            display: inline-block;
            ${styles.buttonLayout}
            ${styles.buttonFont}
            ${styles.titleDarkColor}
            background-color: ${colors.semanticSuccess};
          `}
          href="#TODO"
          target="_blank"
        >
          Earn Rewards
        </a>
      </div>
    </div>
  );
}
