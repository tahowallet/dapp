import React from "react"

export default function Version() {
  return (
    <>
      <p className="version">
        v{process.env.VERSION}
        {process.env.COMMIT_HASH}
      </p>
      <style jsx>{`
        .version {
          color: var(--secondary-s1-40);
          font-size: 12px;
        }
      `}</style>
    </>
  )
}
