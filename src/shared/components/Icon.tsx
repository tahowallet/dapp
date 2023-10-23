/* eslint-disable jsx-a11y/control-has-associated-label */
import React, { CSSProperties } from "react"
import classNames from "classnames"

type IconType = "mask" | "image"

type IconProps = {
  type?: IconType
  src: string
  width?: string
  height?: string
  color?: string
  style?: CSSProperties
  onClick?: () => void
}

export default function Icon({
  type = "mask",
  width = "16px",
  height,
  src,
  color = "var(--off-white)",
  style,
  onClick,
}: IconProps) {
  const isButton = !!onClick

  const classes = classNames("icon", {
    [type]: true,
    button: isButton,
  })

  return (
    <>
      {isButton ? (
        <button
          onClick={onClick}
          type="button"
          className={classNames("icon", {
            [type]: true,
            button: isButton,
          })}
          style={style}
        />
      ) : (
        <div className={classes} style={style} />
      )}
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
        .icon.button {
          background-color: transparent;
          border: none;
          cursor: pointer;
        }
      `}</style>
    </>
  )
}
