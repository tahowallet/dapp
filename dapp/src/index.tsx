import React from "react"
import { ThirdwebProvider } from "@thirdweb-dev/react"
import ReactDOM from "react-dom/client"
import Footer from "./Footer"
import Nav from "./Nav"
import Claim from "./Claim"
import GlobalStyles from "./GlobalStyles"
import InteractiveMap from "./Map"

function DApp() {
  return (
    <ThirdwebProvider>
      <GlobalStyles />
      <InteractiveMap />
      <Nav />
      <Claim />
      <Footer />
    </ThirdwebProvider>
  )
}

const root = document.getElementById("root")

if (root) {
  ReactDOM.createRoot(root).render(
    <React.StrictMode>
      <DApp />
    </React.StrictMode>
  )
}
