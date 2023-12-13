import React from "react"
import Nav from "ui/Nav"
import OnboardingFooter from "ui/Onboarding/OnboardingFooter"
import Version from "shared/components/Misc/Version"
import portalBackgroundPosterSrc from "shared/assets/portal-background.webp"
import portalBackgroundWebmSrc from "shared/assets/portal-background.webm"
import portalBackgroundMp4Src from "shared/assets/portal-background.mp4"
import OnboardingContent from "./OnboardingContent"

export default function OnboardingView() {
  return (
    <div className="container">
      <Nav />
      <OnboardingContent />
      <video
        className="video"
        autoPlay
        loop
        muted
        preload="auto"
        poster={portalBackgroundPosterSrc}
      >
        <source src={portalBackgroundWebmSrc} type="video/webm" />
        <source src={portalBackgroundMp4Src} type="video/mp4" />
      </video>
      <OnboardingFooter />
      <div className="version">
        <Version />
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
        .version {
          position: "absolute";
          right: 27;
          bottom: 4;
        }
      `}</style>
    </div>
  )
}
