import React, { CSSProperties, ReactNode } from "react"

type FooterWrapperProps = {
  children: ReactNode
  style?: CSSProperties
}

export default function FooterWrapper({ children, style }: FooterWrapperProps) {
  return (
    <>
      <footer style={style}>{children}</footer>
      <style jsx>{`
        footer {
          position: absolute;
          bottom: 0;
          display: flex;
          align-items: center;
          gap: 32px;
          z-index: var(--z-navigation);
          padding: 63px 41px 0;
          height: 114px;
          width: 100%;
        }
      `}</style>
    </>
  )
}
