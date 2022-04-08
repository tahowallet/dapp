import { css } from "linaria";
import { DownloadCta } from "parts/download-cta/donwload-cta";
import { Header } from "parts/header/header";
import { AskOurCommunity } from "parts/ask-our-community/ask-our-community";
import { LaunchFaqs } from "parts/launch/faqs/launch-faqs";
import { LaunchRewards } from "parts/launch/rewards/launch-rewards";
import { gold20, gold5, trophyGold } from "parts/layout/colors";
import { Layout2 } from "parts/layout/layout";
import SEO from "parts/layout/seo";
import * as styles from "parts/layout/styles";
import React from "react";
import { LaunchClaim } from "./claim/launch-claim";
import { LaunchHeader } from "./header/launch-header";

export function Launch() {
  return (
    <Layout2>
      <SEO />

      <Header />
        <LaunchHeader />


      <div
        className={css`
          background: ${gold20};
          padding: 12rem 0;
        `}
      >
        <LaunchClaim />
        <DownloadCta />
      </div>

      <div
        className={css`
          background: ${gold5};
          padding: 12rem 0;
          border-block: 1px dashed ${trophyGold};
        `}
      >
        <LaunchRewards />
      </div>

      <div
        className={css`
          ${styles.lightFadeBackground}
        `}
      >
        <LaunchFaqs />
      </div>

      <div
        className={css`
          padding: 0 0 12rem;
        `}
      >
        <AskOurCommunity />
      </div>

      <div
        className={css`
          background: bottom / 100% auto no-repeat
              url(${require("../footer/footer-separator.svg")}),
            ${gold5};
          padding: 12rem 0 20rem;
        `}
      ></div>
    </Layout2>
  );
}
