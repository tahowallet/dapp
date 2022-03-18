import { mediumScreenQuery } from "layout/layout";
import { css } from "linaria";
import React from "react";
export function ReferralHeaderBar() {
  return (<header className={css`
        padding: 2rem;
      `}>
    <img className={css`
          ${mediumScreenQuery} {
            display: none;
          }
        `} width="40" height="40" src={require("../common/tally-logo-small.svg")} />
    <img className={css`
          display: none;

          ${mediumScreenQuery} {
            display: unset;
          }
        `} width="226" height="80" src={require("../common/tally-logo.svg")} />
  </header>);
}
