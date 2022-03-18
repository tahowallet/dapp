import { useLocation, useNavigate } from "@reach/router";
import { Layout } from "layout/layout";
import React, { useEffect } from "react";
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

  if (referrer === null) return null;

  const isEnsName = referrer.indexOf(".") !== -1;
  const name = isEnsName ? referrer : null;
  const address = isEnsName ? null : referrer;

  return (
    <Layout title={`${name ?? `Someone`} invited you to Tally Ho!`}>
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
    </Layout>
  );
}
