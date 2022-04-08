import { css } from "linaria";
import * as backgrounds from "parts/layout/backgrounds";
import {
  hunterGreen,
  semanticSuccess,
  textGreen40,
  trophyGold,
} from "parts/layout/colors";
import * as styles from "parts/layout/styles";
import React from "react";

export function LaunchHeader() {
  return (
    <div
      className={css`
        background: top / auto no-repeat url(${require("./launch-illo.svg")}),
          top / auto no-repeat url(${require("./launch-background.svg")}),
          bottom / 100% auto no-repeat
            url(${require("./launch-separator-trees.svg")});
        padding: 24rem 0 4rem;
      `}
    >
      <div
        className={css`
          ${styles.sectionWideLayout}
          ${styles.darkTextContainer}
  
        text-align: center;
        `}
      >
        <h2>
          The biggest fair launch in history
          <br />
          &amp; all yours to claim.
        </h2>
        <p
          className={css`
            ${styles.textLayout}
          `}
        >
          On March 21, DOGGO tokens were released in the biggest fair launch in
          history. Over 3 million Ethereum addresses have tokens to claim.
        </p>
        <div
          className={css`
            display: grid;
            grid: auto / auto-flow 1fr;
            gap: 1rem;
            width: 100%;
            padding: 6rem 0;
            ${styles.darkGoldTextContainer}

            & > div {
              display: flex;
              flex-flow: column;
              padding: 0 1rem;

              &:not(:last-child) {
                border-right: 1px solid ${trophyGold};
              }

              & > .number {
                ${styles.showcaseFont}
                color: ${hunterGreen};
                margin: -0.5rem 0 -1.5rem;
              }

              & > .support {
                ${styles.title2Font}
                flex: 1;
                color: ${textGreen40};
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
            <div className="number">250</div>
            <div className="support">Thousand</div>
            <div>First Users Can Claim</div>
          </div>
        </div>
        <div
          className={css`
            display: flex;
            justify-content: center;
            gap: 1rem;
            margin: 8rem 0;
          `}
        >
          <a
            className={css`
              ${styles.buttonLayout}
              ${styles.buttonFont}
              ${styles.buttonShadow}
                  
              background-color: ${semanticSuccess};
            `}
            target="_blank"
            href="#TODO"
          >
            Claim your DOGGO now
          </a>
          <a
            className={css`
              ${styles.buttonLayout}
              ${styles.buttonFont}
                
              color: ${trophyGold};
              border: 1px solid ${trophyGold};

              &::after {
                content: "";
                background: right / auto no-repeat
                  url("../../icons/icon-new-tab.svg");
                padding-left: 1.5rem;
              }
            `}
            target="_blank"
            href="#TODO"
          >
            Learn more about the fair launch
          </a>
        </div>
        <div
          className={css`
            ${styles.tileLayout}
            ${styles.tileShadow}
            ${styles.textLayout}
      
            position: relative;
            text-align: left;
            padding: 0.5rem 4rem;
            background: top 1rem left 1rem no-repeat
                url(${require("./launch-act-fast-star.svg")}),
              ${backgrounds.tile};
          `}
        >
          <p>Act fast!</p>
          <p>
            3 million addresses have been distributed DOGGO, only the first
            250,000 will be able to claim.
          </p>
        </div>
      </div>
    </div>
  );
}
