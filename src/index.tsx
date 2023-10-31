import React from "react"
import ReactDOM from "react-dom/client"
import { Web3OnboardProvider } from "@web3-onboard/react"
import { Provider } from "react-redux"
import web3Onboard from "shared/utils/web3Onboard"
// Unfortunately the PostHog React package structure does not play nice with
// no-extraneous-dependencies.
// eslint-disable-next-line import/no-extraneous-dependencies
import { PostHogProvider } from "posthog-js/react"
import DApp from "shared/components/DApps"
import reduxStore from "./redux-state"

function DAppProviders() {
  return (
    <Provider store={reduxStore}>
      <Web3OnboardProvider web3Onboard={web3Onboard}>
        <PostHogProvider
          apiKey={process.env.POSTHOG_API_KEY}
          options={{
            persistence: "localStorage",
            autocapture: false,
            capture_pageview: false,
            disable_session_recording: true,
            sanitize_properties(properties) {
              return {
                ...properties,
                // The extension has set an expectation that the lib is set to
                // the analytics env.
                $lib: process.env.ANALYTICS_ENV,
              }
            },
          }}
        >
          <DApp />
        </PostHogProvider>
      </Web3OnboardProvider>
    </Provider>
  )
}

const root = document.getElementById("root")

if (root) {
  if (process.env.SKIP_REACT_STRICT_MODE === "true") {
    ReactDOM.createRoot(root).render(<DAppProviders />)
  } else {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <DAppProviders />
      </React.StrictMode>
    )
  }
}
