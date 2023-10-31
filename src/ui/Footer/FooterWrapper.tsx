import React, { ReactNode } from "react"

export default function FooterWrapper({ children }: { children: ReactNode }) {
  return (
    <>
      <footer>{children}</footer>
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
          background: linear-gradient(
            0deg,
            #032c2a 0%,
            rgba(0, 29, 27, 0) 100%
          );
        }
      `}</style>
    </>
  )
}
