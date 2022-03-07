import React from "react";
import { ReferralGetTally } from "referral/referral-get-tally";
import { ReferralHowToOpenTally } from "./referral-how-to-open-tally";

declare global {
  interface Window {
    tally?: {
      isTally: boolean;
    };
  }
}

export const hasTally = window?.tally?.isTally ?? false;

export function ReferralCTA() {
  return hasTally ? <ReferralHowToOpenTally /> : <ReferralGetTally />;
}
