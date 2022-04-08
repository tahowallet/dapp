import * as backgrounds from "parts/layout/backgrounds";
import { trophyGold, trophyGold120 } from "parts/layout/colors";
import * as styles from "parts/layout/styles";
import { css } from "linaria";
import React, { ReactNode } from "react";

export function HomeFeatures() {
  return (
    <div
      className={css`
        ${styles.sectionWideLayout}
        ${styles.goldDarkTextContainer}
        text-align: center;
      `}
    >
      <h2>Finally, an alternative to MetaMask</h2>
      <p>
        Tally Ho makes it safe and easy to connect to DeFi and web3.
        <br />
        It&rsquo;s got everything you need from MetaMask, plus lots more to
        love:
      </p>
      <div
        className={css`
          display: grid;
          grid: auto-flow auto / 50% 50%;
          gap: 16px;
          ${styles.darkGoldTextContainer};

          & > div {
            ${styles.tileLayout}
            ${styles.tileShadow}
          }
        `}
      >
        <div
          className={css`
            grid-column: span 2;
            background: bottom / 100% auto no-repeat
                url(${require("./home-feature-1-swap.svg")}),
              ${backgrounds.tile};
            padding: 10rem 6rem;
            padding-right: calc(50% + 6rem);
          `}
        >
          <h3>
            Get paid for <br />
            every Swap.
          </h3>
          <p>
            Tally Ho Swaps are half the price of MetaMask. And you earn DOGGO
            with every trade.
          </p>
        </div>
        <div
          className={css`
            background: bottom / 100% auto no-repeat
                url(${require("./home-feature-2-oss.svg")}),
              ${backgrounds.tile};
            padding: 6rem 6rem 20rem;
          `}
        >
          <h3>Nothing to hide.</h3>
          <p>Unlike MetaMask, Tally Ho is 100% open source.</p>
        </div>
        <div
          className={css`
            background: bottom / 100% auto no-repeat
                url(${require("./home-feature-3-ledger.svg")}),
              ${backgrounds.tile};
            padding: 6rem 6rem 20rem;
          `}
        >
          <h3>Ledger support that actually works.</h3>
          <p>
            Brought to you by a community of developers that listens to users.
          </p>
        </div>
        <div
          className={css`
            grid-column: span 2;
            background: left / 70% auto no-repeat
                url(${require("./home-feature-4-community-avatars.png")}),
              bottom / 100% auto no-repeat
                url(${require("./home-feature-4-community-circles.svg")}),
              ${backgrounds.tile};
            padding: 10rem 6rem;
            padding-left: calc(50% + 6rem);
          `}
        >
          <h3>Owned by a community, not a conglomerate.</h3>
          <p>All wallet fees that go to the Tally Ho community, not bankers.</p>
        </div>
        <div
          className={css`
            grid-column: span 2;
            display: grid;
            grid: auto / auto-flow auto;
            background: ${backgrounds.tile};
            padding: 2rem;
          `}
        >
          <ComingSoon>L2 Support</ComingSoon>
          <ComingSoon>More EVM Chains</ComingSoon>
          <ComingSoon>NFT Gallery</ComingSoon>
        </div>
      </div>
    </div>
  );
}

function ComingSoon({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        display: flex;
        flex-flow: column;
        gap: 2rem;

        &:not(:last-child) {
          border-right: 1px solid ${trophyGold};
        }
      `}
    >
      <div
        className={css`
          align-self: center;
          ${styles.pillLayout}
          ${styles.pillFont}
          background: #ECD2B0;
          color: ${trophyGold120};
        `}
      >
        Coming soon
      </div>
      <h4>{children}</h4>
    </div>
  );
}
