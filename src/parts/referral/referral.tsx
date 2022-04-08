import { useLocation, useNavigate } from "@reach/router";
import { css } from "linaria";
import { hunterGreen } from "parts/layout/colors";
import { Layout } from "parts/layout/layout";
import SEO from "parts/layout/seo";
import { ReferralBanner } from "parts/referral/referral-banner";
import { ReferralBonusBanner } from "parts/referral/referral-bonus-banner";
import { ReferralContinueOnDesktop } from "parts/referral/referral-continue-on-desktop";
import { ReferralFaq } from "parts/referral/referral-faq";
import { ReferralHeaderBar } from "parts/referral/referral-header-bar";
import { ReferralHeaderContainer } from "parts/referral/referral-header-container";
import { ReferralHowToClaim } from "parts/referral/referral-how-to-claim";
import { ReferralNoDrop } from "parts/referral/referral-no-drop";
import { ReferralTitle } from "parts/referral/referral-title";
import { ReferralTokenDrop } from "parts/referral/referral-token-drop";
import { ReferralWhyTally } from "parts/referral/referral-why-tally";
import React, { useEffect } from "react";

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

  if (referrer === null) return null;

  const isEnsName = referrer.indexOf(".") !== -1;
  const name = isEnsName ? referrer : null;
  const address = isEnsName ? null : referrer;

  return (
    <Layout>
      <SEO title={`${name ?? `Someone`} invited you to Tally Ho!`} />
      <div
        className={css`
          display: flex;
          flex-direction: column;
          background: ${hunterGreen};
          font-size: 18px;
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
    </Layout>
  );
}
