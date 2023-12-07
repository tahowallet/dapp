import React from "react"
import IconLink from "shared/components/Media/IconLink"
import { LINKS } from "shared/constants"
import discordIcon from "shared/assets/icons/discord.svg"
import twitterIcon from "shared/assets/icons/twitter.svg"
import githubIcon from "shared/assets/icons/github.svg"

const ICON_SIZE = "18px"

export default function FooterLinks() {
  return (
    <>
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
      <a href={LINKS.RULEBOOK} target="_blank" rel="noreferrer">
        Rulebook
      </a>
      <style jsx>{`
        .links {
          display: flex;
          gap: 24px;
        }
      `}</style>
    </>
  )
}
