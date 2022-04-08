import { css } from "linaria";
import {
  semanticLink,
  semanticSuccess,
  textCanvas40,
  trophyGold,
} from "parts/layout/colors";
import * as styles from "parts/layout/styles";
import React from "react";

export function LaunchRewards() {
  return (
    <div
      className={css`
        ${styles.sectionWideLayout}

        text-align: center;
      `}
    >
      <div
        className={css`
          ${styles.darkGoldTextContainer}
        `}
      >
        <h2>No DOGGO to claim?</h2>
        <p>
          Don&rsquo;t worry! There are three ways to earn DOGGO.
          <br />
          All from right inside your Tally Ho! wallet.
        </p>
      </div>
      <div
        className={css`
          background: right / auto no-repeat
            url(${require("./launch-rewards-illo.svg")});
          padding: 4rem;
          padding-right: 50%;
          text-align: left;
          color: ${textCanvas40};

          h3 {
            margin: 2rem 0 1rem;
          }
        `}
      >
        <h3
          className={css`
            color: ${trophyGold};
          `}
        >
          Earn
        </h3>
        <p>
          Deposit your favorite DeFi tokens into Yearn strategies to earn TALLY
          Ho!
        </p>
        <h3
          className={css`
            color: ${semanticLink};
          `}
        >
          Swap rewards{" "}
          <span
            className={css`
              ${styles.pillLayout}
              ${styles.pillFont}
              ${styles.bodyGoldColor}
                    
              border: 1px solid ${trophyGold};
              vertical-align: middle;
              margin-left: 2rem;
            `}
          >
            Coming soon
          </span>
        </h3>
        <p>
          Earn rewards every time you swap tokens with Tally Ho! Rewards are
          calculated and distributed every week.
        </p>
        <h3
          className={css`
            color: ${semanticSuccess};
          `}
        >
          Refer friends
        </h3>
        <p>
          Share Tally Ho! with a friend and if they&rsquo;re in the token drop,
          you both get a 5% bonus.
        </p>
      </div>
    </div>
  );
}
