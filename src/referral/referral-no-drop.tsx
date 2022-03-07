import {
  green120,
  textGreen20,
  textGreen40,
  textLight,
  trophyGold,
} from "layout/colors";
import {
  segmentFontFamily,
  fontSubTitleCssFragment,
  fontTitle36CssFragment,
  fontTitle50CssFragment,
} from "layout/fonts";
import { ghostButtonCssFragment } from "layout/ghost-button";
import { mediumScreenQuery } from "layout/layout";
import { css } from "linaria";
import React, { ReactNode } from "react";

export function ReferralNoDrop() {
  return (
    <div
      className={css`
        max-width: 60rem;
        margin: 0 auto;
        padding: 0 1rem;

        ${mediumScreenQuery} {
          padding: 0 2rem;
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
        Don&rsquo;t have a drop
      </h2>
      <p
        className={css`
          ${fontSubTitleCssFragment}
          text-align: center;
          color: ${trophyGold};
        `}
      >
        Don&rsquo;t worry, there are other ways to earn Tally
      </p>
      <ul
        className={css`
          display: grid;
          grid: auto-flow auto / auto;
          gap: 1rem;
          padding: 0;

          ${mediumScreenQuery} {
            grid: auto / auto-flow 1fr;
          }
        `}
      >
        <Item
          title="Share bonus link"
          body={
            <>
              You can share your bonus link to receive 5% bonus everytime
              somebody claims Tally using your bonus link
            </>
          }
          imageSrc={require("./referral-no-drop-item-1-share-link.svg")}
          ctaHref="#TODO"
          ctaLabel="Read more"
        />
        <Item
          title="Earn with Vaults"
          body={
            <>
              You can enter one of our Vaults and earn Tally tokens by doing so.
              The longer you stay the more you make.
            </>
          }
          imageSrc={require("./referral-no-drop-item-2-earn.svg")}
          ctaHref="#TODO"
          ctaLabel="Try it out"
        />
      </ul>
    </div>
  );
}

function Item({
  title,
  body,
  imageSrc,
  ctaHref,
  ctaLabel,
}: {
  title: ReactNode;
  body: ReactNode;
  imageSrc: string;
  ctaHref: string;
  ctaLabel: ReactNode;
}) {
  return (
    <li
      className={css`
        position: relative;
        list-style: none;
        display: flex;
        flex-flow: column;
        min-width: 0;
        text-align: center;
      `}
    >
      <div
        className={css`
          display: flex;
          flex: 1;
          flex-flow: column;
          padding: 1.5rem 1.5rem 0;
          background: linear-gradient(
              to bottom,
              rgba(51, 81, 78, 0.2) 8rem,
              ${green120}
            ),
            ${green120};
          box-shadow: 0px 16px 16px rgb(0 20 19 / 4%),
            0px 6px 8px rgb(0 20 19 / 14%), 0px 2px 4px rgb(0 20 19 / 24%);
          border-radius: 1rem;

          ${mediumScreenQuery} {
            padding: 2rem 2rem 0;
          }
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
            font: 18px / 26px ${segmentFontFamily};
            color: ${textGreen40};
          `}
        >
          {body}
        </p>
        <img src={imageSrc} />
      </div>
      <div
        className={css`
          display: flex;
          margin: 2rem 0;
        `}
      >
        <a
          className={css`
            display: block;
            align-self: center;
            margin: 0 auto;

            ${ghostButtonCssFragment}
          `}
          href={ctaHref}
          target="_blank"
        >
          {ctaLabel}
        </a>
      </div>
    </li>
  );
}
