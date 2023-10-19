/* eslint-disable no-console */
import { useEffect, useState } from "react"

// Source: https://sabesh.hashnode.dev/update-components-based-on-localstorage-change-in-react-hooks
export function useLocalStorageChange<T>(key: string): {
  value: T | null
  updateStorage: (newValue: Partial<T>) => void
} {
  const getInitialValue = () => {
    try {
      return localStorage.getItem(key)
        ? JSON.parse(localStorage.getItem(key)!)
        : null
    } catch (err) {
      console.error(err)
      return null
    }
  }

  const [value, setValue] = useState(getInitialValue())

  useEffect(() => {
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key !== key) return
      try {
        setValue(e.newValue ? JSON.parse(e.newValue) : null)
      } catch (err) {
        // eslint-disable-next-line no-console
        console.error(err)
      }
    }

    window.addEventListener("storage", handleStorageChange)
    return () => window.removeEventListener("storage", handleStorageChange)
  })

  const updateStorage = (newValue: Partial<T>) => {
    try {
      window.localStorage.setItem(key, JSON.stringify(newValue))

      const event = new StorageEvent("storage", {
        key,
        newValue: JSON.stringify(newValue),
      })

      window.dispatchEvent(event)
    } catch (err) {
      // eslint-disable-next-line no-console
      console.error(err)
    }
  }

  return { value, updateStorage }
}

export function usePersistedCache(key: string, setter: () => void) {
  const cache = localStorage.getItem(`persist:${key}`)

  useEffect(() => {
    if (!cache) return
    const { realms, seasonInfo, stakingRealmId } = JSON.parse(cache)

    if (
      !JSON.parse(realms) ||
      !JSON.parse(seasonInfo) ||
      !JSON.parse(stakingRealmId)
    )
      return
    setter()
  }, [cache, setter])
}
