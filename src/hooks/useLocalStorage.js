import { useCallback, useState } from 'react'
import { readStorage, writeStorage } from '../utils/storage.js'

/**
 * useState that mirrors its value to localStorage. For simple, independent
 * pieces of state (theme, UI prefs) — the main trip data uses TripContext's
 * reducer + a single persisted blob instead, since its updates are structured.
 */
export function useLocalStorage(key, initialValue) {
  const [value, setValue] = useState(() => readStorage(key, initialValue))

  const setStoredValue = useCallback(
    (next) => {
      setValue((prev) => {
        const resolved = typeof next === 'function' ? next(prev) : next
        writeStorage(key, resolved)
        return resolved
      })
    },
    [key],
  )

  return [value, setStoredValue]
}
