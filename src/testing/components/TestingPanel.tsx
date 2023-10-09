import React from "react"
import {
  createXPtokens,
  setQuickUnstaking,
} from "testing/utils/contract-actions"
/**
 * This component shouldn't be used in production.
 * It is used to allow manual testing on the blockchain fork.
 * We should use it to execute actions that won't be possible from the dapp UI.
 */

export default function TestingPanel() {
  if (process.env.NODE_ENV !== "development") return null

  return (
    <div className="testing row">
      <button type="button" onClick={setQuickUnstaking}>
        Quick unstaking
      </button>
      <button type="button" onClick={createXPtokens}>
        Create XP tokens
      </button>
      <style jsx>
        {`
          .testing {
            position: absolute;
            z-index: var(--z-navigation);
            margin: 10px;
            gap: 10px;
          }
          .testing button {
            font-size: 14px;
            border: 0;
            border-radius: 4px;
            background: var(--secondary-s1-100);
            cursor: pointer;
          }
        `}
      </style>
    </div>
  )
}
