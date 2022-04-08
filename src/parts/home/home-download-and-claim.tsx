import { darkTextContainer, sectionWideLayout } from "parts/layout/styles";
import { css } from "linaria";
import React from "react";

export function HomeDownloadAndClaim() {
  return (
    <div
      className={css`
        ${sectionWideLayout}
        ${darkTextContainer}
        text-align: center;
      `}
    >
      <h2>
        Download &amp; claim <br /> your DOGGO now.
      </h2>
      <p>A loyal friend for your favorite browser.</p>
    </div>
  );
}
