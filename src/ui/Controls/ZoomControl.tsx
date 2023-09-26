import React from "react"
import Icon from "shared/components/Icon"

type ZoomControlProps = {
  icon: string
}

export default function ZoomControl({ icon }: ZoomControlProps) {
  return (
    <>
      <button className="control center" type="button">
        <div className="control_icon">
          <Icon src={icon} height="16px" width="16px" />
        </div>
      </button>
      <style jsx>
        {`
          .control {
            width: 32px;
            height: 32px;
            background: none;
            outline: none;
            border: none;
            transition: all 0.3s;
            border-radius: 4px;
            cursor: pointer;
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
