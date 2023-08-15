import { useCallback, useState } from "react"

export function debounce<T>(setStateFn: (V: T) => void, ms: number) {
  let timeout: NodeJS.Timer

  return (value: T) => {
    clearTimeout(timeout)

    timeout = setTimeout(() => {
      setStateFn(value)
    }, ms)
  }
}

export const useDebounce = <T>(initial: T, wait = 300): [T, (v: T) => void] => {
  const [state, setState] = useState(initial)

  // eslint-disable-next-line react-hooks/exhaustive-deps
  const debounceCallback = useCallback(
    debounce((prop: T) => setState(prop), wait),
    [debounce, wait]
  )

  const setDebouncedState = (debounced: T) => {
    debounceCallback(debounced)
  }

  return [state, setDebouncedState]
}
