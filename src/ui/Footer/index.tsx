import React from "react"
import IconLink from "shared/components/IconLink"
import Link from "shared/components/Link"
import discordIcon from "shared/assets/icons/discord.svg"
import twitterIcon from "shared/assets/icons/twitter.svg"
import githubIcon from "shared/assets/icons/github.svg"
// import ClaimProgressBar from "./ClaimProgressBar" // not used at the moment
import { LINKS } from "shared/constants"
import Version from "shared/components/Version"
import RealmsBar from "./RealmBar"

const ICON_SIZE = "18px"

export default function Footer() {
  return (
    <footer>
      <div className="links">
        <IconLink
          href={LINKS.DISCORD}
          iconWidth={ICON_SIZE}
          iconHeight={ICON_SIZE}
          iconSrc={discordIcon}
        />
        <IconLink
          href={LINKS.TWITTER}
          iconWidth={ICON_SIZE}
          iconHeight={ICON_SIZE}
          iconSrc={twitterIcon}
        />
        <IconLink
          href={LINKS.GITHUB}
          iconWidth={ICON_SIZE}
          iconHeight={ICON_SIZE}
          iconSrc={githubIcon}
        />
      </div>
      <Link to={LINKS.RULEBOOK}>Rulebook</Link>
      <Version />
      <RealmsBar />
      <style jsx>{`
        footer {
          position: absolute;
          bottom: 0;
          display: flex;
          align-items: center;
          gap: 32px;
          z-index: var(--z-navigation);
          padding: 63px 41px 0;
          height: 114px;
          width: 100%;
          background: linear-gradient(
            0deg,
            #032c2a 0%,
            rgba(0, 29, 27, 0) 100%
          );
        }
        .links {
          display: flex;
          gap: 24px;
        }
      `}</style>
    </footer>
  )
}
