import React from "react"
import Version from "shared/components/Misc/Version"
import portalBackground from "shared/assets/portal-background.mp4"
import OnboardingModals from "./OnboardingModals"

export default function OnboardingContent() {
  return (
    <>
      <div className="container">
        <OnboardingModals />
        <video
          src={portalBackground}
          className="video"
          autoPlay
          loop
          muted
          preload="auto"
        />
        <div style={{ position: "absolute", right: 27, bottom: 4 }}>
          <Version />
        </div>
      </div>
      <style jsx>{`
        .container {
          height: 100vh;
          width: 100vw;
          overflow: hidden;
          position: relative;
        }
        .video {
          position: absolute;
          height: 107%;
          width: 100%;
          inset: 0;
          object-fit: cover;
        }
      `}</style>
    </>
  )
}
