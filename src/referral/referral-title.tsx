import { textLight } from "layout/colors";
import { fontTitle64CssFragment } from "layout/fonts";
import { css } from "linaria";
import React from "react";

export function ReferralTitle() {
  return (
    <h1
      className={css`
        max-width: 60rem;
        margin: 0 auto;
        padding: 0 2rem;
        ${fontTitle64CssFragment}
        color: ${textLight};
        text-align: center;
      `}
    >
      Ready for a web3 wallet you actually own?
    </h1>
  );
}
