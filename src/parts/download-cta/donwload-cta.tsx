import { css } from "linaria";
import {
  chromeDownloadHref,
  firefoxDownloadHref,
} from "parts/common/extension-download-hrefs";
import { semanticSuccess } from "parts/layout/colors";
import { segmentFontFamily } from "parts/layout/fonts";
import * as styles from "parts/layout/styles";
import React, { ReactNode } from "react";

export function DownloadCta() {
  return (
    <div
      className={css`
        padding: 3rem 0;
        display: grid;
        grid: auto / auto-flow 1fr;
        gap: 4rem;
        width: fit-content;
        margin: 0 auto;
      `}
    >
      <Option
        name="Chrome"
        logoSrc={require("@browser-logos/chrome/chrome.svg")}
        href={chromeDownloadHref}
      />
      <Option
        name="Firefox"
        logoSrc={require("@browser-logos/firefox/firefox.svg")}
        href={firefoxDownloadHref}
      />
      <Option
        name="Brave"
        logoSrc={require("@browser-logos/brave/brave.svg")}
        href={chromeDownloadHref}
      />
    </div>
  );
}

function Option({
  name,
  logoSrc,
  href,
}: {
  name: ReactNode;
  logoSrc: string;
  href: string;
}) {
  return (
    <a
      className={css`
        font: 400 18px / 26px ${segmentFontFamily};
        text-align: center;
        padding: 2rem;
      `}
      target="_blank"
      href={href}
    >
      <img width="80" height="80" src={logoSrc} />
      <div
        className={css`
          ${styles.pillLayout}

          *:hover > & {
            background-color: ${semanticSuccess};
          }
        `}
      >
        {name}
      </div>
    </a>
  );
}
