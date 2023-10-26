import { isProbablyEVMAddress, normalizeAddress } from "./address"
import { isValidENSDomainName, resolveENS, resolveAddressToENS } from "./ens"
import { isValidUNSDomainName, resolveAddressToUNS, resolveUNS } from "./uns"

type WalletData = {
  name?: string
  avatar?: string
}

type NameWithProvider = WalletData & {
  address: string
  type: "ens" | "uns"
}

const NAMES_CACHE_STRORAGE_KEY = "taho.cachedNames"
const MAX_CACHE_AGE = 1000 * 60 * 60 * 24 * 7 // 1 week

const resolveAddressPromiseCache: {
  [address: string]: Promise<WalletData>
} = {}

const getCachedNames = () => {
  const cachedNamesUnparsed =
    localStorage.getItem(NAMES_CACHE_STRORAGE_KEY) ?? "{}"

  return JSON.parse(cachedNamesUnparsed)
}

const addCachedName = ({ name, avatar, address, type }: NameWithProvider) => {
  const cachedNames = getCachedNames()
  const normalizedAddress = normalizeAddress(address)
  const newData = name ? { [type]: { name, avatar } } : {}

  const newCache = JSON.stringify({
    ...cachedNames,
    [normalizedAddress]: {
      ...(cachedNames[normalizedAddress] ?? {}),
      ...newData,
      lastUpdate: Date.now(),
    },
  })

  localStorage.setItem(NAMES_CACHE_STRORAGE_KEY, newCache)
}

const resolveENSPromise = (address: string) =>
  resolveAddressToENS(address).then((data): WalletData | null => {
    if (!data) return null

    addCachedName({ type: "ens", address, ...data })
    return data
  })

const resolveUNSPromise = (address: string) =>
  resolveAddressToUNS(address).then((name): WalletData | null => {
    if (!name) return null

    addCachedName({ type: "uns", address, name })
    return { name }
  })

const resolveUnknownNamePromise = () =>
  new Promise<null>((resolve) => {
    setTimeout(() => resolve(null), 15000)
  })

const resolveAddressToWalletDataWithoutCache = async (address: string) => {
  const normalizedAddress = normalizeAddress(address)

  if (resolveAddressPromiseCache[normalizedAddress] === undefined) {
    resolveAddressPromiseCache[normalizedAddress] = Promise.any([
      resolveENSPromise(normalizedAddress),
      resolveUNSPromise(normalizedAddress),
      resolveUnknownNamePromise(),
    ]) as Promise<WalletData>
  }

  const { name, avatar } = await resolveAddressPromiseCache[normalizedAddress]

  return name ? { name, avatar } : null
}

export const resolveAddressToWalletData = async (
  address: string
): Promise<WalletData | null> => {
  const cachedNames = getCachedNames()

  const normalizedAddress = normalizeAddress(address)
  const cachedItem = cachedNames[normalizedAddress]

  if (cachedItem && cachedItem.lastUpdate + MAX_CACHE_AGE > Date.now()) {
    return cachedItem.ens ?? cachedItem.uns
  }

  const data = await resolveAddressToWalletDataWithoutCache(normalizedAddress)

  return data ? { name: data.name, avatar: data.avatar } : null
}

export const resolveNameToAddress = async (addressOrName: string) => {
  try {
    if (isProbablyEVMAddress(addressOrName)) {
      return addressOrName
    }
    if (isValidUNSDomainName(addressOrName)) {
      return await resolveUNS(addressOrName)
    }
    if (isValidENSDomainName(addressOrName)) {
      return await resolveENS(addressOrName)
    }
    throw Error("Invalid address or domain name")
  } catch (error) {
    return null
  }
}
