import React, { useEffect, useState } from "react";
import { ReferralGetTally } from "referral/referral-get-tally";
import { ReferralHowToOpenTally } from "./referral-how-to-open-tally";

declare global {
  interface Window {
    tally?: {
      isTally: boolean;
    };
  }
}

export function useHasTally() {
  const [hasTally, setHasTally] = useState(false);

  useEffect(() => {
    setHasTally(window?.tally?.isTally ?? false);
  });

  return hasTally;
}

export function ReferralCTA() {
  return useHasTally() ? <ReferralHowToOpenTally /> : <ReferralGetTally />;
}
