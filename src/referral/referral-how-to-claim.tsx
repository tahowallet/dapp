import {
  green80,
  hunterGreen,
  textGreen20,
  textGreen40,
  textLight,
  trophyGold,
} from "layout/colors";
import {
  fontSubTitleCssFragment,
  fontTitle32CssFragment,
  fontTitle50CssFragment,
  segmentFontFamily,
} from "layout/fonts";
import { mediumScreenQuery } from "layout/layout";
import { css } from "linaria";
import React, { ReactNode } from "react";
import { hasTally, ReferralCTA } from "referral/referral-cta";

export function ReferralHowToClaim() {
  return (
    <div
      className={css`
        display: flex;
        flex-flow: column;
        padding: 0 1rem;

        ${mediumScreenQuery} {
          padding: 0 2rem;
        }
      `}
    >
      <h2
        className={css`
          text-align: center;
          ${fontTitle50CssFragment}
          color: ${textLight};
        `}
      >
        How to claim DOGGO
      </h2>
      <div
        className={css`
          width: 100%;
          max-width: 64rem;
          margin: 0 auto;
        `}
      >
        <ol
          className={css`
            display: flex;
            flex-flow: row wrap;
            gap: 3rem 1.5rem;
            width: 100%;
            padding: 0;
          `}
        >
          {hasTally ? (
            <Step
              title="Open Tally Ho!"
              imageSrc={require("./step-1-open.svg")}
              body={
                <>
                  Click on the extension icon or use the shortcut bellow to to
                  open Tally Ho!
                </>
              }
            />
          ) : (
            <Step
              title="Install Tally Ho"
              imageSrc={require("./step-1-install.svg")}
              body={
                <>
                  We&rsquo;ve included a link bellow. This is the only way to
                  see if you&rsquo;re eligible.
                </>
              }
            />
          )}
          <Step
            title="Add your wallet"
            imageSrc={require("./step-2-add-wallet.svg")}
            body={
              <>
                Import any wallet you&rsquo;ve used with MetaMask Swaps or
                popular DeFi dApps like Uniswap.
              </>
            }
          />
          <Step
            title="Claim your DOGGO!"
            imageSrc={require("./step-3-claim.svg")}
            body={
              <>
                Your friend&rsquo;s referral code will be automatically applied
                for a{" "}
                <strong
                  className={css`
                    color: ${textGreen20};
                  `}
                >
                  5% bonus 🙌
                </strong>
              </>
            }
          />
        </ol>
        <ReferralCTA />
      </div>
    </div>
  );
}

function Step({
  title,
  imageSrc,
  body,
}: {
  title: string;
  imageSrc: string;
  body: ReactNode;
}) {
  return (
    <li
      className={css`
        position: relative;
        list-style: none;
        display: list-item;
        flex: 1 0 min(16rem, 60vw);
        min-width: 0;
        max-width: 28rem;
        margin: 0 auto;
        padding: 1rem;
        border: 1.5px solid ${green80};
        border-radius: 1.25rem;
        text-align: center;

        &::before {
          content: counter(list-item);
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          text-align: center;
          width: 3rem;
          height: 3rem;
          margin: -1.5rem auto;
          border: 1.5px solid ${green80};
          border-radius: 1.5rem;
          background: ${hunterGreen};
          ${fontSubTitleCssFragment}
          line-height: 3rem;
          vertical-align: middle;
          color: ${textGreen20};
        }
      `}
    >
      <div
        className={css`
          display: flex;
          flex-flow: column;
        `}
      >
        <h3
          className={css`
            ${fontTitle32CssFragment}
            color: ${trophyGold};
          `}
        >
          {title}
        </h3>
        <img
          width="242"
          height="132"
          className={css`
            min-width: 0;
            max-width: 242px;
            width: 100%;
            height: auto;
            margin: -1rem auto -2.5rem;
          `}
          src={imageSrc}
        />
        <p
          className={css`
            font: 18px / 26px ${segmentFontFamily};
            color: ${textGreen40};
            padding: 0 0.75rem;
          `}
        >
          {body}
        </p>
      </div>
    </li>
  );
}
