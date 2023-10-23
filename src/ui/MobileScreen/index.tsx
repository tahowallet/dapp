import React, { useState } from "react"
import mobileBg from "shared/assets/mobile/mobile-bg.webp"
import mobileCircle from "shared/assets/mobile/mobile-circle.png"
import mobileScreen from "shared/assets/mobile/mobile-screen.png"
import logoIcon from "shared/assets/nav_logo.svg"
import { useOnResize } from "shared/hooks"
import { getWindowDimensions } from "shared/utils"
import MobileNav from "ui/Nav/MobileNav"

const MOBILE_BREAKPOINT = 854 // qHD width

export default function MobileScreen() {
  const [width, setWidth] = useState(window.innerWidth)

  useOnResize(() => {
    const windowSize = getWindowDimensions()
    setWidth(windowSize.width)
  })

  if (width >= MOBILE_BREAKPOINT) {
    return null
  }

  return (
    <>
      <div className="mobile-container">
        <MobileNav />
        <div className="mobile-circle">
          <img src={mobileScreen} className="mobile-screen" alt="Screen icon" />
          <h1 className="mobile-title">
            Experience
            <br /> available only
            <br /> on desktop
          </h1>
        </div>
      </div>
      <style jsx>
        {`
          .mobile-container {
            position: fixed;
            top: 0;
            left: 0;
            width: 100vw;
            height: 100vh;
            display: flex;
            background-size: cover;
            background-repeat: no-repeat;
            z-index: var(--z-mobile-screen);
            background-image: url(${mobileBg});
            background-position: center;
            background-size: cover;
            overflow: hidden;
            align-self: center;
          }
          .mobile-circle {
            display: flex;
            justify-content: center;
            align-items: center;
            align-content: center;
            align-self: center;
            flex-wrap: wrap;
            flex-flow: column;
            margin: 0 auto;
            width: 428px;
            height: 428px;
            background-image: url(${mobileCircle});
            background-position: center;
          }
          .mobile-screen {
            position: relative;
            align-self: center;
            clear: both;
          }
          .mobile-title {
            font: var(--text-h1);
            text-align: center;
          }
          .nav_bg {
            pointer-events: none;
            z-index: -1;
            position: absolute;
            width: 100%;
            height: 100%;
            inset: 0;
          }
          .nav_container {
            position: absolute;
            top: 42px;
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
          .logo_container {
            position: absolute;
            top: 0;
            left: calc(50% - 112px / 2);
          }
          .logo {
            border-radius: 50%;
            margin-top: -18px;
            background: white;
            background: url(${logoIcon}) no-repeat center 0/160px;
            width: var(--logo-size);
            height: var(--logo-size);
          }
          .nav_wrapper {
            position: relative;
            display: flex;
            width: 100%;
            justify-content: center;
            z-index: var(--navigation);
            border-radius: 48px;
            padding: 16px 28px;
            height: 72px;
          }
          .lhs_container {
            margin-right: auto;
            align-items: center;
          }
          .rhs_container {
            margin-left: auto;
            align-items: center;
          }
          @media (max-height: 520px) {
            .nav_container {
              display: none;
            }
          }
        `}
      </style>
    </>
  )
}
