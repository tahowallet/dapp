import React from "react"

type LinkProps = {
  children: React.ReactNode
  to: string
}

export default function LinkStub({ children, to }: LinkProps) {
  return <a href={to}>{children}</a>
}
