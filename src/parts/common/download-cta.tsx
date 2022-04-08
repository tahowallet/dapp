import { actionButtonClassName } from "parts/layout/action-button";
import { mediumScreenQuery } from "parts/layout/layout";
import { css, cx } from "linaria";
import React, { ReactNode } from "react";
import { chromeDownloadHref, firefoxDownloadHref } from './extension-download-hrefs';

export function DownloadButton({
  href,
  imageSrc,
  text,
}: {
  href: string;
  imageSrc: string;
  text: ReactNode;
}) {
  return (
    <a
      className={cx(actionButtonClassName, buttonClassName)}
      href={href}
      target="_blank"
    >
      <img className={iconClassName} src={imageSrc} />
      {text}
    </a>
  );
}

export const downloadButtons: Record<
  "chrome" | "brave" | "firefox",
  ReactNode
> = {
  brave: (
    <DownloadButton
      href={chromeDownloadHref}
      text={<>Download for Brave</>}
      imageSrc={require("./icon-browser-brave.svg")}
    />
  ),
  chrome: (
    <DownloadButton
      href={chromeDownloadHref}
      text={<>Download for Chrome</>}
      imageSrc={require("./icon-browser-chrome.svg")}
    />
  ),
  firefox: (
    <DownloadButton
      href={firefoxDownloadHref}
      text={<>Download for Firefox</>}
      imageSrc={require("./icon-browser-firefox.svg")}
    />
  ),
};

const buttonClassName = css`
  display: flex;
  align-items: center;
  margin: 0.5rem;
`;

const iconClassName = css`
  margin: -0.5rem;
  margin-right: 1rem;
`;
