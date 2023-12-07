import React, { useLayoutEffect, useRef, useState } from "react"
import { createPortal } from "react-dom"

export default function Portal({ children }: { children: React.ReactNode }) {
  const [_, setMounted] = useState(false)
  const containerRef = useRef<HTMLDivElement | null>(null)

  useLayoutEffect(() => {
    const container = document.createElement("div")

    containerRef.current = container

    document.body.appendChild(container)

    setMounted(true)

    return () => {
      document.body.removeChild(container)
    }
  }, [])

  return containerRef.current
    ? createPortal(children, containerRef.current)
    : null
}
