import { Link } from "gatsby";
import React from "react";
import IconLink from "shared/components/IconLink";

const ICON_SIZE = "18px";

export function Footer() {
  return (
    <footer>
      <div>
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
      </div>
    </footer>
  );
}
