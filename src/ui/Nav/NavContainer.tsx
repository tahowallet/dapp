import React, { ReactNode } from "react"

export default function NavContainer({ children }: { children: ReactNode }) {
  return (
    <div className="nav_container">
      <div className="nav_wrapper">{children}</div>
      <style jsx>
        {`
          .nav_container {
            position: absolute;
            top: 0;
            left: 0;
            right: 0;
            display: flex;
            align-items: center;
            justify-content: center;
            z-index: var(--z-navigation);
            filter: drop-shadow(0px 14px 16px rgba(7, 17, 17, 0.24));
            --logo-size: 112px;
            user-select: none;
          }

          .nav_wrapper {
            position: relative;
            display: flex;
            width: 100%;
            justify-content: center;
            z-index: var(--navigation);
            padding: 20px 28px;
            max-height: 72px;
            background: var(--primary-p1-100);
          }
        `}
      </style>
    </div>
  )
}
