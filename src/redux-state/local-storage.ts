import { RootState } from "./reducers"

const REDUX_LOCAL_STORAGE_KEY = "redux-store"

// Source: https://www.geeksforgeeks.org/how-to-persist-redux-state-in-local-storage-without-any-external-library/
export const saveStateToLocalStorage = (state: Partial<RootState>) => {
  const serializedValue = JSON.stringify(state)
  localStorage.setItem(REDUX_LOCAL_STORAGE_KEY, serializedValue)
}

// Source: https://www.geeksforgeeks.org/how-to-persist-redux-state-in-local-storage-without-any-external-library/
export const loadStateFromLocalStorage = (): Partial<RootState> | undefined => {
  const serializedValue = localStorage.getItem(REDUX_LOCAL_STORAGE_KEY)
  return serializedValue === null ? undefined : JSON.parse(serializedValue)
}
