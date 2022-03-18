import { forestBackgroundCssFragment } from "layout/backgrounds";
import { mediumScreenQuery } from "layout/layout";
import { css } from "linaria";
import React, { ReactNode } from "react";

export function ReferralHeaderContainer({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        ${mediumScreenQuery} {
          ${forestBackgroundCssFragment}
        }

        padding: 0 0 2rem;
      `}
    >
      {children}
    </div>
  );
}
