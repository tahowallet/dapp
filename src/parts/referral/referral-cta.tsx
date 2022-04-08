import React, { useEffect, useState } from "react";
import { ReferralGetTally } from "parts/referral/referral-get-tally";
import { ReferralHowToOpenTally } from "parts/referral/referral-how-to-open-tally";

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
