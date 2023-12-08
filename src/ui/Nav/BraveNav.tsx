import React from "react"
import Icon from "shared/components/Media/Icon"
import braveIcon from "shared/assets/brave.png"
import { LINKS, LOCAL_STORAGE_BRAVE } from "shared/constants"
import closeIcon from "shared/assets/icons/s/close-black.svg"
import { useLocalStorageChange } from "shared/hooks"

export default function BraveNav() {
  const { value, updateStorage } =
    useLocalStorageChange<boolean>(LOCAL_STORAGE_BRAVE)

  if (!navigator.brave?.isBrave() || value) return null

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
          We detected you are using Brave, for a smooth experience we advise{" "}
          <a href={LINKS.BRAVE_SUPPORT} rel="noreferrer" target="_blank">
            disabling the shield
          </a>
        </p>
        <Icon
          src={closeIcon}
          type="image"
          onClick={() => updateStorage(true)}
          height="16px"
          width="16px"
          style={{ position: "absolute", right: 15 }}
        />
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
          z-index: var(--z-navigation);
        }
        .brave_nav a {
          text-decoration: underline;
        }
      `}</style>
    </>
  )
}
