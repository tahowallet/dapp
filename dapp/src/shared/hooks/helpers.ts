import { useMemo, useState } from "react"
import { debounce } from "lodash"

// eslint-disable-next-line import/prefer-default-export
export const useDebounce = <T>(initial: T, wait = 300): [T, (v: T) => void] => {
  const [state, setState] = useState(initial)

  const debounceCallback = useMemo(
    () => debounce((prop: T) => setState(prop), wait),
    [wait]
  )

  return [state, debounceCallback]
}
