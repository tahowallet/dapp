import React from "react"
import { createRoot } from "react-dom/client"
import App from "./App"

const root = document.getElementById("root")

if (root) {
  if (process.env.REACT_STRICT_MODE === "true") {
    createRoot(root).render(
      <React.StrictMode>
        <App />
      </React.StrictMode>
    )
  } else {
    createRoot(root).render(<App />)
  }
}
