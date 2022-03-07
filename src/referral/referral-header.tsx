import { forestBackgroundCssFragment } from "layout/backgrounds";
import { green80, green95, textLight } from "layout/colors";
import {
  segmentFontFamily,
  fontTitle64CssFragment,
  fontSubTitleCssFragment,
} from "layout/fonts";
import { mediumScreenQuery } from "layout/layout";
import { css } from "linaria";
import React, { ReactNode } from "react";
import { ReferrerInfo } from "referral/referral";

export function ReferralHeader({ referrer }: { referrer: ReferrerInfo }) {
  return (
    <div
      className={css`
        ${mediumScreenQuery} {
          ${forestBackgroundCssFragment}
        }

        padding: 0 0 2rem;
      `}
    >
      <header
        className={css`
          padding: 2rem;
        `}
      >
        <img
          className={css`
            ${mediumScreenQuery} {
              display: none;
            }
          `}
          width="40"
          height="40"
          src={require("../common/tally-logo-small.svg")}
        />
        <img
          className={css`
            display: none;

            ${mediumScreenQuery} {
              display: unset;
            }
          `}
          width="226"
          height="80"
          src={require("../common/tally-logo.svg")}
        />
      </header>
      <h1
        className={css`
          margin: 0;
          padding: 0 1rem;
          ${fontTitle64CssFragment}
          color: ${textLight};
          text-align: center;

          ${mediumScreenQuery} {
            padding: 0 2rem;
          }
        `}
      >
        Welcome to the first web3 wallet
        <br />
        owned by its users.
      </h1>
      <div
        className={css`
          display: flex;
          flex-flow: column;
          margin: 2rem 0;

          ${mediumScreenQuery} {
            margin: 5rem 1rem;
          }
        `}
      >
        <div
          className={css`
            width: 100%;
            max-width: 60rem;
            margin: 0 auto;
            padding: 3rem 1rem;
            border: solid 1px ${green80};
            background: center / cover
              url(${require("./referral-banner-background.svg")});

            ${mediumScreenQuery} {
              border-radius: 2rem;
            }
          `}
        >
          <div
            className={css`
              display: grid;
              grid: 1fr 2rem 1fr / auto;
              gap: 0;
              width: fit-content;
              margin: 0 auto;
              border-radius: 1.25rem;
              ${fontSubTitleCssFragment}
              color: ${textLight};

              ${mediumScreenQuery} {
                grid: auto / 1fr 6rem 1fr;
                width: auto;
                background: ${green95};
              }
            `}
          >
            <BannerItem>You&rsquo;re invited to Tally by:</BannerItem>
            <div
              className={css`
                display: flex;
                align-items: center;
                justify-content: center;
              `}
            >
              <img
                className={css`
                  position: relative;
                  margin: -1rem;
                  width: 3rem;
                  height: 3rem;
                  border-radius: 2.5rem;
                  background: black;

                  ${mediumScreenQuery} {
                    width: 5rem;
                    height: 5rem;
                  }
                `}
                src={`https://effigy.im/a/${referrer.input}.png`}
              />
            </div>

            <BannerItem>
              <>
                {referrer.name ? (
                  referrer.name
                ) : (
                  <>
                    {referrer.input.slice(0, 8)}...{referrer.input.slice(-4)}
                  </>
                )}
              </>
            </BannerItem>
          </div>
        </div>
      </div>
    </div>
  );
}

function BannerItem({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        padding: 0.5rem 1rem;
        border-radius: 1.25rem;
        background: ${green95};
        text-align: center;

        ${mediumScreenQuery} {
          padding: 1rem 2rem;
          text-align: unset;
        }
      `}
    >
      {children}
    </div>
  );
}
