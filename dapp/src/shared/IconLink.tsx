import React, { CSSProperties } from "react"

export default function IconLink({
  href,
  icon
}: {
  href: string
  icon: {
    width: string
    height: string
    src: string
    hoverSrc: string
    activeSrc: string
  }
}) {
  return (
    <>
      <a
        href={href}
        target="_blank"
        className="link"
        style={
          {
            "--icon-width": icon.width,
            "--icon-height": icon.height,
            "--icon-src": icon.src,
            "--icon-active-src": icon.activeSrc,
            "--icon-hover-src": icon.hoverSrc
          } as CSSProperties
        }
        rel="noreferrer"
      />
      <style jsx>{`
        .link {
          display: block;
          position: relative;
          flex: 0 0 auto;
          margin: 0 1rem;
          background-repeat: no-repeat;
          width: 28px;
          height: 28px;
          background: no-repeat center / contain var(--icon-src);
        }
        .link:hover {
          background: no-repeat center / contain var(--icon-hover-src);
        }

        .link:active {
          background: no-repeat center / contain var(--icon-active-src);
        }
      `}</style>
    </>
  )
}
