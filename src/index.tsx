import React from "react"
import ReactDOM from "react-dom/client"
import App from "./App"

const root = document.getElementById("root")

if (root) {
  if (process.env.SKIP_REACT_STRICT_MODE === "true") {
    ReactDOM.createRoot(root).render(<App />)
  } else {
    ReactDOM.createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  }
}
