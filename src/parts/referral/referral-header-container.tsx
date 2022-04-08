import { green120 } from "parts/layout/colors";
import { mediumScreenQuery } from "parts/layout/layout";
import { css } from "linaria";
import React, { ReactNode } from "react";

export function ReferralHeaderContainer({ children }: { children: ReactNode }) {
  return (
    <div
      className={css`
        ${mediumScreenQuery} {
          background: no-repeat bottom / max(100vw, 120rem) auto
              url(${require("./forest-background.svg")}),
            no-repeat top left / contain
              linear-gradient(
                to top,
                ${green120} -32rem,
                rgb(255 255 255 / 0.12) 0,
                rgb(255 255 255 / 0) 48rem
              );
        }

        padding: 0 0 2rem;
      `}
    >
      {children}
    </div>
  );
}
