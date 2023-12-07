const STORAGE_SERVICE_VERSION = 3 // Update to add zkSync realm
const STORAGE_SERVICE_KEY = "taho.storage"

type Storage = {
  version: number
  [key: string]: unknown
}

const getStorage = (): Storage => {
  const initial = { version: STORAGE_SERVICE_VERSION }
  try {
    const unparsed = localStorage.getItem(STORAGE_SERVICE_KEY) ?? "{}"
    const parsed = JSON.parse(unparsed)

    if (
      typeof parsed.version !== "number" ||
      parsed.version < STORAGE_SERVICE_VERSION
    ) {
      throw Error("Storage data outdated. Clearing storage...")
    }

    return {
      ...parsed,
      version: STORAGE_SERVICE_VERSION,
    }
  } catch (error) {
    localStorage.setItem(STORAGE_SERVICE_KEY, JSON.stringify(initial))
    return initial
  }
}

const setStorage = (storage: Storage) => {
  const prevStorage = localStorage.getItem(STORAGE_SERVICE_KEY)
  try {
    const stringified = JSON.stringify(storage)

    localStorage.setItem(STORAGE_SERVICE_KEY, stringified)

    return true
  } catch (error) {
    if (prevStorage) {
      localStorage.setItem(STORAGE_SERVICE_KEY, prevStorage)
    }

    return false
  }
}

class StorageService {
  storage: Storage = { version: 0 }

  constructor() {
    this.storage = getStorage()
  }

  getData<T>(key: string): T | null {
    return (this.storage[key] as T) ?? null
  }

  setData<T>(key: string, data: T) {
    this.storage[key] = data

    setStorage(this.storage)
  }
}

export default new StorageService()
