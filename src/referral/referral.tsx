import { useLocation, useNavigate } from "@reach/router";
import { Footer } from "common/footer";
import { hunterGreen } from "layout/colors";
import { css } from "linaria";
import React, { useEffect } from "react";
import { Helmet } from "react-helmet";
import { ReferralBanner } from "referral/referral-banner";
import { ReferralContinueOnDesktop } from "referral/referral-continue-on-desktop";
import { ReferralFaq } from "referral/referral-faq";
import { ReferralHeaderBar } from "referral/referral-header-bar";
import { ReferralNoDrop } from "referral/referral-no-drop";
import { ReferralTitle } from "referral/referral-title";
import { ReferralTokenDrop } from "referral/referral-token-drop";
import { ReferralBonusBanner } from "./referral-bonus-banner";
import { ReferralHeaderContainer } from "./referral-header-container";
import { ReferralHowToClaim } from "./referral-how-to-claim";
import { ReferralWhyTally } from "./referral-why-tally";

export interface ReferrerInfo {
  input: string;
  address: string | null;
  name: string | null;
}

export function Referral() {
  const referrer = new URLSearchParams(useLocation().search).get("referrer");
  const navigate = useNavigate();

  useEffect(() => {
    if (referrer === null) navigate("/", { replace: true });

    localStorage.referrer = referrer;
  });

  const metaImage = `https://deploy-preview-1--tally-ho-test-claim.netlify.app/claim-image.jpeg`; // FIXME: change URL

  if (referrer === null) {
    const title = `Try Tally Ho!`;
    const metaDescription = `Download the first community-owned web3 wallet.`;

    return (
      <Helmet
        htmlAttributes={{ lang: `en` }}
        title={title}
        meta={[
          { name: `description`, content: metaDescription },
          { property: `og:title`, content: title },
          { property: `og:description`, content: metaDescription },
          { property: `og:image`, content: metaImage },
          { property: `og:type`, content: `website` },
          { name: `twitter:card`, content: `summary_large_image` },
          { name: `twitter:creator`, content: `@thesis_co` },
          { name: `twitter:title`, content: title },
          { name: `twitter:description`, content: metaDescription },
          { name: "twitter:image", content: metaImage },
        ]}
      />
    );
  }

  const isEnsName = referrer.indexOf(".") !== -1;
  const name = isEnsName ? referrer : null;
  const address = isEnsName ? null : referrer;

  return (
    <>
      <Helmet title={`${name ?? `Someone`} invited you to Tally Ho!`} />
      <div
        className={css`
          display: flex;
          flex-flow: column;
          padding-bottom: 40vw;
          background: no-repeat bottom center / 100% auto
              url(${require("../common/footer-background.svg")}),
            ${hunterGreen};

          :global() {
            html {
              height: 100vh;
            }

            * {
              box-sizing: border-box;
            }
          }
        `}
      >
        <ReferralHeaderContainer>
          <ReferralHeaderBar />
          <ReferralTitle />
          <ReferralBanner referrer={{ input: referrer, name, address }} />
        </ReferralHeaderContainer>
        <ReferralBonusBanner />
        <ReferralContinueOnDesktop />
        <ReferralWhyTally />
        <ReferralHowToClaim />
        <ReferralTokenDrop />
        <ReferralNoDrop />
        <ReferralFaq />
      </div>
      <Footer />
    </>
  );
}
