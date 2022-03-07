import { useLocation, useNavigate } from "@reach/router";
import { Layout } from "layout/layout";
import React, { useEffect } from "react";
import { ReferralContinueOnDesktop } from "referral/referral-continue-on-desktop";
import { ReferralFaq } from "referral/referral-faq";
import { ReferralNoDrop } from "referral/referral-no-drop";
import { ReferralTokenDrop } from "referral/referral-token-drop";
import { ReferralHeader } from "./referral-header";
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
    <Layout title={`${name ?? `Someone`} invited you to Tally!`}>
      <ReferralHeader referrer={{ input: referrer, name, address }} />
      <ReferralContinueOnDesktop />
      <ReferralWhyTally />
      <ReferralHowToClaim />
      <ReferralTokenDrop />
      <ReferralNoDrop />
      <ReferralFaq />
    </Layout>
  );
}
