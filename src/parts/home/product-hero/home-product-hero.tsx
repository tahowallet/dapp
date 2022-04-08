import { css } from "linaria";
import { gold20, semanticSuccess } from "parts/layout/colors";
import * as styles from "parts/layout/styles";
import React from "react";

export function HomeProductHero() {
  return (
    <div
      className={css`
        ${styles.sectionWideLayout}
        background:
            top 20px left 22px / auto no-repeat url(${require("./home-product-hero-background-buttons.svg")}),
            bottom / 100% auto no-repeat url(${require("./home-product-hero-mask-trees.svg")}),
            bottom -50px right / auto min(100%, 40rem) no-repeat url(${require("./home-product-hero.svg")}),
            bottom / cover url(${require("./home-product-hero-background-sunburst.svg")}),
            ${gold20};
        border-radius: 16px;
      `}
    >
      <div
        className={css`
          max-width: 75%;
          padding: 120px 80px 160px;
          ${styles.darkTextContainer}
        `}
      >
        <h1>
          The wallet that
          <br />
          pays you back.
        </h1>
        <p>
          Tally Ho is the first community-owned wallet for web3. <br /> Download
          it now to claim $DOGGO.
        </p>
        <a
          className={css`
            display: inline-block;
            ${styles.buttonLayout}
            ${styles.buttonFont}
            ${styles.buttonShadow}
            ${styles.titleDarkColor}
            background: ${semanticSuccess};
            margin: 1rem 0;
          `}
          href="#download"
        >
          Download Now
        </a>
      </div>
    </div>
  );
}
