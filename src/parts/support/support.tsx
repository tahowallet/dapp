import { css } from "linaria";
import { AskOurCommunity } from "parts/ask-our-community/ask-our-community";
import { Header } from "parts/header/header";
import { LaunchFaqs } from "parts/launch/faqs/launch-faqs";
import { Layout2 } from "parts/layout/layout";
import SEO from "parts/layout/seo";
import * as styles from "parts/layout/styles";
import { SupportHeader } from "parts/support/header/support-header";
import React from "react";
import { SupportFaqs } from 'parts/support/faqs/support-faqs';

export function Support() {
  return (
    <Layout2>
      <SEO />

      <Header />

      <div
        className={css`
          background: bottom / 100% auto no-repeat
              url(${require("./support-header-separator.svg")}),
              calc(50% + 24rem) calc(100% - 1.5rem) / auto no-repeat
              url(${require("./support-header-illo.svg")});
          padding: 4rem 0 8rem;
        `}
      >
        <SupportHeader />
      </div>

      <div
        className={css`
          ${styles.lightFadeBackground}
        `}
      >
        <SupportFaqs />
      </div>

      <div
        className={css`
          padding: 0 0 12rem;
        `}
      >
        <AskOurCommunity />
      </div>
    </Layout2>
  );
}
