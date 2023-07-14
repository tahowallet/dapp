import React from "react"
import IconLink from "../shared/IconLink"
import Link from "../shared/Link"

const ICON_SIZE = "18px"

export default function Footer() {
  return (
    <footer>
      <style jsx>{`
        footer {
          position: absolute;
          bottom: 0;
          display: flex;
          align-items: center;
          z-index: 1;
        }
      `}</style>
      <IconLink
        href="https://chat.taho.xyz"
        icon={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          src: `url(${require("../../../src/shared/images/social-icons/discord.svg")})`,
          hoverSrc: `url(${require("../../../src/shared/images/social-icons/discord-hover.svg")})`,
          activeSrc: `url(${require("../../../src/shared/images/social-icons/discord-click.svg")})`
        }}
      />
      <IconLink
        href="https://twitter.com/taho_xyz"
        icon={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          src: `url(${require("../../../src/shared/images/social-icons/twitter.svg")})`,
          hoverSrc: `url(${require("../../../src/shared/images/social-icons/twitter-hover.svg")})`,
          activeSrc: `url(${require("../../../src/shared/images/social-icons/twitter-click.svg")})`
        }}
      />
      <IconLink
        href="https://github.com/tahowallet/extension"
        icon={{
          width: ICON_SIZE,
          height: ICON_SIZE,
          src: `url(${require("../../../src/shared/images/social-icons/github.svg")})`,
          hoverSrc: `url(${require("../../../src/shared/images/social-icons/github-hover.svg")})`,
          activeSrc: `url(${require("../../../src/shared/images/social-icons/github-click.svg")})`
        }}
      />
      <Link to="/rulebook">Rulebook</Link>
    </footer>
  )
}
