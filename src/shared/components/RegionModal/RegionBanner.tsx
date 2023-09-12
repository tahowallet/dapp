import React from "react"
import Button from "shared/components/Button"
import lightIcon from "shared/assets/icons/m/light.svg"

type RegionBannerProps = {
  label: React.ReactNode
  /**
   * @default "start"
   */
  alignElements?: "start" | "center"
  buttonProps: React.ComponentProps<typeof Button>
}

export default function RegionBanner({
  label,
  alignElements = "start",
  buttonProps,
}: RegionBannerProps) {
  return (
    <>
      <div className="region_banner row">
        <div>
          <p className="region_banner_label">{label}</p>
          <div className="region_banner_info">
            <img src={lightIcon} alt="Light Icon" width={24} height={24} />
            <p className="region_banner_text">
              You can only be staked in one region
            </p>
          </div>
        </div>
        <Button {...buttonProps} />
      </div>
      <style jsx>
        {`
          .region_banner {
            padding: 28px 24px;
            background-color: var(--primary-p1-40);
            justify-content: space-between;
            align-items: ${alignElements};
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
