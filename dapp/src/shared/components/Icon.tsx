import classNames from "classnames"
import React from "react"

type IconProps = {
  type?: "mask" | "image"
  src: string
  width?: string
  height?: string
  color?: string
}

export default function Icon({
  type = "mask",
  width = "16px",
  height,
  src,
  color = "var(--off-white)",
}: IconProps) {
  return (
    <>
      <div
        className={classNames("icon", {
          [type]: true,
        })}
      />
      <style jsx>{`
        .icon {
          width: ${width};
          height: ${height ?? width};
        }
        .icon.image {
          background-image: url(${src});
        }
        .icon.mask {
          mask-image: url(${src});
          mask-size: cover;
          mask-position: center;
          background-color: ${color};
        }
      `}</style>
    </>
  )
}
