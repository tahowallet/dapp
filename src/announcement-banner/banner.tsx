import { BannerConfig } from "announcement-banner/banner-config";
import React from "react";

export function Banner({ config }: { config: BannerConfig }) {
  return (
    <div
      style={{
        padding: `1rem 2rem`,
        backgroundColor: config.colorScheme.background,
        color: config.colorScheme.foreground,
        textAlign: `center`,
        overflow: `hidden`,
        fontSize: `0.875rem`,
        fontFamily: `Helvetica,sans-serif`,
      }}
    >
      <div
        style={{
          float: `right`,
          padding: `1rem`,
          margin: `-1rem 0`,
          marginRight: `-2rem`,
          background: `none`,
          cursor: `pointer`,
        }}
        attr-onclick="this.parentElement.remove()"
      >
        &times;
      </div>
      <img
        style={{ margin: `-0.5rem -0.5rem -2.5rem` }}
        src={`${
          process.env.NODE_ENV === "development"
            ? `http://localhost:8000`
            : `https://tally.cash`
        }/banner-icon.svg`}
      />
      We&rsquo;re partnering with Tally Ho! The community-owned Web3 wallet.
      {config.referrer ? (
        <> Join through our DAO for a bonus on your token drop.</>
      ) : null}{" "}
      <a
        style={{ color: config.colorScheme.foreground }}
        target="_blank"
        href={
          config.referrer
            ? `https://tallyho.org/claim/${config.referrer}`
            : `https://tallyho.org/`
        }
      >
        {config.referrer ? <>Claim now</> : <>Try it now</>}
      </a>
    </div>
  );
}
