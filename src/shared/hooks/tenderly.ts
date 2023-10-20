import { useState, useCallback } from "react"
import { useInterval } from "./helpers"

const TENDERLY_API = `https://api.tenderly.co/api/v1/account/${process.env.TENDERLY_USER}/project/${process.env.TENDERLY_PROJECT}`

// eslint-disable-next-line import/prefer-default-export
export function useResetTenderlyFork() {
  const [resetCounterLastBumped, setResetCounterLastBumped] = useState<number>(
    Date.now()
  )
  const [resetCounter, setResetCounter] = useState<number>(0)

  useInterval(() => {
    if (Date.now() - resetCounterLastBumped > 300) {
      setResetCounter(0)
    }
  }, 300)

  const handleResetReveal = useCallback(async () => {
    if (
      process.env.ALLOW_TENDERLY_RESET !== "true" ||
      process.env.USE_TENDERLY_FORK !== "true" ||
      process.env.TENDERLY_ACCESS_KEY === undefined ||
      process.env.TENDERLY_FORK_HEAD === undefined ||
      process.env.TENDERLY_FORK_HEAD === ""
    ) {
      return
    }

    if (resetCounter > 3) {
      // eslint-disable-next-line no-console
      console.log("Attempting to reset Tenderly fork...")

      setResetCounter(0)
      setResetCounterLastBumped(Date.now())

      // Shortcut to getting an answer.
      // eslint-disable-next-line no-restricted-globals,no-alert
      const result = confirm("Do you want to reset chain state?")

      if (result) {
        const resetParams = {
          fork_head: process.env.TENDERLY_FORK_HEAD,
        }
        const resetResult = await fetch(new URL(`${TENDERLY_API}/fork`), {
          method: "put",
          body: Buffer.from(JSON.stringify(resetParams)),
          headers: {
            "X-Access-Key": process.env.TENDERLY_ACCESS_KEY ?? "",
          },
        })

        if (resetResult) {
          // Shortcut to getting it done.
          // eslint-disable-next-line no-restricted-globals,no-alert
          alert("reset")
        }
      }
    } else {
      setResetCounterLastBumped(Date.now())
      setResetCounter(resetCounter + 1)
    }
  }, [resetCounter])

  return handleResetReveal
}
