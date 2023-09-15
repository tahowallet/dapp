import classNames from "classnames"
import React, { CSSProperties } from "react"

type IconProps = {
  type?: "mask" | "image"
  src: string
  width?: string
  height?: string
  color?: string
  style?: CSSProperties
}

export default function Icon({
  type = "mask",
  width = "16px",
  height,
  src,
  color = "var(--off-white)",
  style,
}: IconProps) {
  return (
    <>
      <div
        className={classNames("icon", {
          [type]: true,
        })}
        style={style}
      />
      <style jsx>{`
        .icon {
          width: ${width};
          height: ${height ?? width};
        }
        .icon.image {
          background-image: url(${src});
          background-size: contain;
          background-repeat: no-repeat;
          display: inline-block;
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
