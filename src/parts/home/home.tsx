import { css } from "linaria";
import { DownloadCta } from "parts/download-cta/donwload-cta";
import { Header } from "parts/header/header";
import { HomeFeatures } from "parts/home/features/home-features";
import { HomeDownloadAndClaim } from "parts/home/home-download-and-claim";
import { HomeTryTallyHo } from "parts/home/home-try-tally-ho";
import { HomeLaunch } from "parts/home/launch/home-launch";
import { HomeProductHero } from "parts/home/product-hero/home-product-hero";
import { HomeRewards } from "parts/home/rewards/home-rewards";
import { canvas, gold20, gold5, green120 } from "parts/layout/colors";
import { Layout2 } from "parts/layout/layout";
import SEO from "parts/layout/seo";
import React from "react";

export function Home() {
  return (
    <Layout2>
      <SEO />

      <Header />

      <div
        className={css`
          background: bottom / 100% auto no-repeat
              url(${require("./home-separator-wave.svg")}),
            ${canvas};
          padding: 6rem 0;
        `}
      >
        <HomeProductHero />
        <div id="download">
          <HomeTryTallyHo />
          <DownloadCta />
        </div>
      </div>

      <div
        className={css`
          background: bottom -38px center / auto no-repeat url(${require("./home-separator-stars-light.svg")}),
            ${gold20};
          padding: 6rem 0;
        `}
      >
        <HomeFeatures />
      </div>

      <div
        className={css`
          background: top / auto no-repeat
              url(${require("./home-separator-stars-dark.svg")}),
            bottom -1px center / 100% auto no-repeat url(${require("./home-separator-trees.svg")}),
            ${canvas};
          padding: 6rem 0 12rem;
        `}
      >
        <HomeLaunch />
      </div>

      <div
        className={css`
          background: ${green120};
          padding: 6rem 0;
        `}
      >
        <HomeRewards />
      </div>

      <div
        className={css`
          background: top / 100% auto no-repeat
              url(${require("./home-separator-wave-2.svg")}),
            bottom / 100% auto no-repeat
              url(${require("../footer/footer-separator.svg")}),
            ${gold5};
          padding: 12rem 0 20rem;
        `}
      >
        <HomeDownloadAndClaim />
        <DownloadCta />
      </div>
    </Layout2>
  );
}
