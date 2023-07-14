import React from "react"
import { ThirdwebProvider } from "@thirdweb-dev/react"
import ReactDOM from "react-dom/client"
import Footer from "./Footer"
import Nav from "./Nav"
import Claim from "./Claim"

// need to import fonts through file loader
/* eslint-disable global-require */
function DApp() {
  return (
    <ThirdwebProvider>
      <style jsx global>
        {`
          * {
            box-sizing: border-box;
            margin: unset;
          }

          a {
            color: inherit;
            text-decoration: inherit;
          }

          @font-face {
            font-family: "QuincyCF-Regular";
            src: url(${require("../../src/shared/fonts/quincy-cf/quincy-cf.woff2")})
              format("woff2");
            font-weight: normal;
            font-style: normal;
          }

          @font-face {
            font-family: "QuincyCF-Text";
            src: url(${require("../../src/shared/fonts/quincy-cf-text/quincy-cf-text.woff2")})
              format("woff2");
            font-weight: normal;
            font-style: normal;
          }

          @font-face {
            font-family: "Segment-Regular";
            src: url(${require("../../src/shared/fonts/segment-regular/segment-regular.woff2")})
              format("woff2");
            font-weight: normal;
            font-style: normal;
          }

          @font-face {
            font-family: "Segment-Bold";
            src: url(${require("../../src/shared/fonts/segment-bold/segment-bold.woff2")})
              format("woff2");
            font-weight: normal;
            font-style: normal;
          }
          html,
          body {
            height: 100%;
          }
        `}
      </style>
      <Nav />
      <Claim />
      <Footer />
    </ThirdwebProvider>
  )
}
/* eslint-enable global-require */

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <DApp />
  </React.StrictMode>
)
