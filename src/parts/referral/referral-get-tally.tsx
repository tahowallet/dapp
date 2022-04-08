import { DownloadButton } from "parts/common/download-cta";
import { chromeDownloadHref } from "parts/common/extension-download-hrefs";
import { css } from "linaria";
import React from "react";

export function ReferralGetTally() {
  return (
    <div
      className={css`
        display: flex;
        margin: 2rem 0;
        justify-content: center;
      `}
    >
      <DownloadButton
        href={chromeDownloadHref}
        text={<>Get Tally Ho for Chrome</>}
        imageSrc={require("../common/icon-browser-chrome.svg")}
      />
    </div>
  );
}
