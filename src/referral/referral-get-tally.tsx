import { CommunityEditionDownloadButton } from "ce/ce-download-cta";
import { chromeDownloadHref } from "common/extension-download-hrefs";
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
      <CommunityEditionDownloadButton
        href={chromeDownloadHref}
        text={<>Get Tally for Chrome</>}
        imageSrc={require("../ce/icon-browser-chrome.svg")}
      />
    </div>
  );
}
