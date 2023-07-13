import { Link } from "gatsby";
import { css } from "linaria";
import React from "react";
import IconLink from "shared/components/IconLink";

const ICON_SIZE = "18px";

const footerContainer = css`
  position: absolute;
  bottom: 0;
  display: flex;
  align-items: center;
  z-index: 1;
`;

export default function Footer() {
  return (
    <footer className={footerContainer}>
      <IconLink
        href="https://chat.taho.xyz"
        icon={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          src: `url(${require("shared/images/social-icons/discord.svg")})`,
          hoverSrc: `url(${require("shared/images/social-icons/discord-hover.svg")})`,
          activeSrc: `url(${require("shared/images/social-icons/discord-click.svg")})`,
        }}
      />
      <IconLink
        href="https://twitter.com/taho_xyz"
        icon={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          src: `url(${require("shared/images/social-icons/twitter.svg")})`,
          hoverSrc: `url(${require("shared/images/social-icons/twitter-hover.svg")})`,
          activeSrc: `url(${require("shared/images/social-icons/twitter-click.svg")})`,
        }}
      />
      <IconLink
        href="https://github.com/tahowallet/extension"
        icon={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          src: `url(${require("shared/images/social-icons/github.svg")})`,
          hoverSrc: `url(${require("shared/images/social-icons/github-hover.svg")})`,
          activeSrc: `url(${require("shared/images/social-icons/github-click.svg")})`,
        }}
      />
      <Link to="/rulebook">Rulebook</Link>
    </footer>
  );
}
