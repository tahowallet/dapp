import React from "react"

type IconProps = {
  src: string
  width?: string
  height?: string
  color?: string
}

export default function Icon({
  width = "16px",
  height,
  src,
  color = "var(--off-white)",
}: IconProps) {
  return (
    <>
      <div className="icon" />
      <style jsx>{`
        .icon {
          width: ${width};
          height: ${height ?? width};
          -webkit-mask-image: url(${src});
          mask-image: url(${src});
          -webkit-mask-size: cover;
          mask-size: cover;
          background-color: ${color};
        }
      `}</style>
    </>
  )
}
