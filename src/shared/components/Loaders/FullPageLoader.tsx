import React from "react"
import {
  useConnect,
  useVisibilityTransition,
  useWalletOnboarding,
} from "shared/hooks"
import { animated } from "@react-spring/web"
import {
  LoaderType,
  selectIslandLoaderType,
  useDappSelector,
} from "redux-state"
import GoldenCircleSpinner from "./GoldenCircleSpinner"
import LoadingText from "./LoadingText"

function getLoadingText(loaderType: LoaderType, loading: boolean) {
  if (!loading) return ""

  let loadingText = ""

  switch (loaderType) {
    case "realms":
      loadingText = "Looking for realms"
      break
    case "population":
      loadingText = "Meeting everybody"
      break
    default:
      loadingText = ""
      break
  }

  return loadingText
}

export default function FullPageLoader({ loaded }: { loaded: boolean }) {
  const transition = useVisibilityTransition(!loaded)
  const loaderType = useDappSelector(selectIslandLoaderType)
  const { walletOnboarded } = useWalletOnboarding()
  const { isConnected } = useConnect()

  return (
    <>
      <animated.div
        style={{
          ...transition,
          width: "100vw",
          height: "100vh",
          background: "linear-gradient(179deg, #0d2321 0.77%, #153d3b 101%)",
          justifyContent: "center",
          display: "flex",
          alignItems: "center",
          flexDirection: "column",
          overflow: "hidden",
          position: "fixed",
          inset: 0,
          zIndex: "var(--z-full-page-loader)",
          pointerEvents: loaded ? "none" : "all",
        }}
      >
        <GoldenCircleSpinner />
        <LoadingText>
          <p>
            Loading your experience...{" "}
            {getLoadingText(
              loaderType,
              walletOnboarded !== null && isConnected
            )}
          </p>
        </LoadingText>
      </animated.div>
      <style jsx>
        {`
          .container {
            width: 100vw;
            height: 100vh;
            background: linear-gradient(179deg, #0d2321 0.77%, #153d3b 101%);
            justify-content: center;
            overflow: hidden;
            position: fixed;
            inset: 0;
          }
        `}
      </style>
    </>
  )
}
