import { green80, green95, semanticSuccess, textLight } from "layout/colors";
import { fontSubTitleCssFragment, segmentFontFamily } from "layout/fonts";
import { mediumScreenQuery } from "layout/layout";
import { css } from "linaria";
import React, { ReactNode } from "react";
import { ReferrerInfo } from "referral/referral";

export function ReferralBanner({ referrer }: { referrer: ReferrerInfo }) {
  return (
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
          <BannerItem>You&rsquo;re invited to Tally Ho by:</BannerItem>
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
