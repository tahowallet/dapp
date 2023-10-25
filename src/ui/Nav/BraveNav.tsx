import React from "react"
import Icon from "shared/components/Icon"
import braveIcon from "shared/assets/brave.png"
import { LINKS } from "shared/constants"

export default function BraveNav() {
  if (!navigator.brave?.isBrave()) return null

  return (
    <>
      <div className="brave_nav row_center">
        <Icon
          src={braveIcon}
          type="image"
          height="24px"
          width="20px"
          style={{ marginRight: 8 }}
        />
        <p>
          We detected you are using Brave, for a smooth experience we advice{" "}
          <a href={LINKS.BRAVE_SUPPORT} rel="noreferrer" target="_blank">
            disabling the shield
          </a>
        </p>
      </div>
      <style jsx>{`
        .brave_nav {
          position: absolute;
          top: 72px;
          left: 0;
          right: 0;
          background: var(--semantic-attention);
          height: 40px;
          justify-content: center;
          color: var(--primary-p1-100);
        }
        .brave_nav a {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
