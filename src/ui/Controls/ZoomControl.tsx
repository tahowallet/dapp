import React from "react"
import Icon from "shared/components/Media/Icon"

type ZoomControlProps = {
  icon: string
  onClick: () => void
}

export default function ZoomControl({ icon, onClick }: ZoomControlProps) {
  return (
    <>
      <button
        className="control center button_reset"
        type="button"
        onClick={onClick}
      >
        <div className="control_icon">
          <Icon src={icon} height="16px" width="16px" />
        </div>
      </button>
      <style jsx>
        {`
          .control {
            width: 32px;
            height: 32px;
            transition: all 0.3s;
            border-radius: 4px;
          }
          .control_icon {
            opacity: 0.7;
            transition: opacity 0.3s;
          }
          .control:hover {
            background: var(--secondary-s1-10);
          }
          .control:hover .control_icon {
            opacity: 1;
          }
        `}
      </style>
    </>
  )
}
