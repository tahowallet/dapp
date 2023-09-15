import React, { CSSProperties, ReactElement, ReactNode } from "react"
import Button from "shared/components/Button"
import lightIcon from "shared/assets/icons/m/light.svg"
import Icon from "../Icon"

type RegionBannerProps = {
  label: ReactNode
  button: ReactElement<typeof Button>
  style?: CSSProperties
}

export default function RegionBanner({
  label,
  button,
  style,
}: RegionBannerProps) {
  return (
    <>
      <div className="region_banner row" style={style}>
        <div>
          <div className="region_banner_label">{label}</div>
          <div className="region_banner_info">
            <Icon src={lightIcon} type="image" width="24px" height="24px" />
            <p className="region_banner_text">
              You can only be staked in one region
            </p>
          </div>
        </div>
        {button}
      </div>
      <style jsx>
        {`
          .region_banner {
            padding: 28px 24px;
            background-color: var(--primary-p1-40);
            justify-content: space-between;
            align-items: center;
            gap: 24px;
            margin-bottom: 36px;
            width: 671px;
            border-radius: 8px;
          }

          .region_banner_label {
            color: var(--secondary-s1-100);
            font-size: 18px;
            max-width: 327px;
            margin-bottom: 6px;
            font-weight: 500;
          }

          .region_banner_info {
            display: flex;
            align-items: center;
            max-width: 327px;
          }

          .region_banner_text {
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
