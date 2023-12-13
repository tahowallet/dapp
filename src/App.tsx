import React from "react"
import { Web3OnboardProvider } from "@web3-onboard/react"
import { Provider } from "react-redux"
import web3Onboard from "shared/utils/web3Onboard"
import { PostHogProvider } from "posthog-js/react"
import { BrowserRouter as Router } from "react-router-dom"
import GlobalStyles from "ui/GlobalStyles"
import { POSTHOG_API_KEY, POSTHOG_API_OPTIONS } from "config/posthog"
import Dapp from "ui/DApp/Dapp"
import reduxStore from "./redux-state"

export default function App() {
  return (
    <>
      <GlobalStyles />
      <PostHogProvider apiKey={POSTHOG_API_KEY} options={POSTHOG_API_OPTIONS}>
        <Provider store={reduxStore}>
          <Web3OnboardProvider web3Onboard={web3Onboard}>
            <Router>
              <Dapp />
            </Router>
          </Web3OnboardProvider>
        </Provider>
      </PostHogProvider>
    </>
  )
}
