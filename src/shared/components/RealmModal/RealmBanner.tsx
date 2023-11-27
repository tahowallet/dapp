import React, { CSSProperties, ReactElement, ReactNode } from "react"
import Button from "shared/components/Button"
import lightIcon from "shared/assets/icons/m/light.svg"
import Icon from "../Icon"

type RealmBannerProps = {
  label: ReactNode
  showHint?: boolean
  children?: React.ReactNode
  button: ReactElement<typeof Button>
  style?: CSSProperties
}

export default function RealmBanner({
  label,
  showHint = false,
  children,
  button,
  style,
}: RealmBannerProps) {
  return (
    <>
      <div className="realm_banner row" style={style}>
        <div>
          {label && <div className="realm_banner_label">{label}</div>}
          {showHint && (
            <div className="realm_banner_info">
              <Icon src={lightIcon} type="image" width="24px" height="24px" />
              <p className="realm_banner_text">
                You can only be staked in one realm
              </p>
            </div>
          )}
          {children}
        </div>
        {button}
      </div>
      <style jsx>
        {`
          .realm_banner {
            background-color: var(--primary-p1-40);
            justify-content: space-between;
            align-items: center;
            gap: 24px;
          }

          .realm_banner_label {
            color: var(--secondary-s1-100);
            font-size: 18px;
            max-width: 327px;
            margin-bottom: 6px;
            font-weight: 500;
          }

          .realm_banner_info {
            display: flex;
            align-items: center;
            max-width: 327px;
          }

          .realm_banner_text {
            color: var(--secondary-s1-70);
            flex: 1;
            font-size: 16px;
            line-height: 24px;
            margin-top: 2px;
          }
        `}
      </style>
    </>
  )
}
