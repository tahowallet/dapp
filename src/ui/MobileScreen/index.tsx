import React, { useState } from "react"
import mobileBg from "shared/assets/mobile/mobile-bg.webp"
import mobileCircle from "shared/assets/mobile/mobile-circle.png"
import mobileScreen from "shared/assets/mobile/mobile-screen.png"
import { useOnResize } from "shared/hooks"
import { getWindowDimensions } from "shared/utils"
import MobileNav from "ui/Nav/MobileNav"

const MOBILE_BREAKPOINT = 854 // qHD width

export default function MobileScreen() {
  const [width, setWidth] = useState(window.innerWidth)

  useOnResize(() => {
    // navigator?.serviceWorker?.controller?.postMessage({"type": "push", "title": "sprawdzamy", "options": {}})
    navigator?.serviceWorker?.controller?.postMessage({"type": "unregister"})

    console.log('### navigator?.serviceWorker?.controller', navigator?.serviceWorker?.controller)


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
        `}
      </style>
    </>
  )
}
