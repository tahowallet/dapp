import { isProbablyEVMAddress, normalizeAddress } from "./address"
import { isValidENSDomainName, resolveENS, resolveAddressToENS } from "./ens"
import { isValidUNSDomainName, resolveAddressToUNS, resolveUNS } from "./uns"

type NameWithProvider = {
  name: string
  address: string
  type: "ens" | "uns"
}
const NAMES_CACHE_STRORAGE_KEY = "taho.cachedNames"
const MAX_CACHE_AGE = 1000 * 60 * 60 * 24 * 7 // 1 week

const resolveAddressPromiseCache: {
  [address: string]: Promise<string | null>
} = {}

const getCachedNames = () => {
  const cachedNamesUnparsed =
    localStorage.getItem(NAMES_CACHE_STRORAGE_KEY) ?? "{}"

  return JSON.parse(cachedNamesUnparsed)
}

const addCachedName = ({ name, address, type }: NameWithProvider) => {
  const cachedNames = getCachedNames()
  const normalizedAddress = normalizeAddress(address)

  const newCache = JSON.stringify({
    ...cachedNames,
    [normalizedAddress]: {
      ...(cachedNames[normalizedAddress] ?? {}),
      [type]: name,
      lastUpdate: Date.now(),
    },
  })
  localStorage.setItem(NAMES_CACHE_STRORAGE_KEY, newCache)
}

const resolveENSPromise = (address: string) =>
  resolveAddressToENS(address).then((name): string => {
    addCachedName({ type: "ens", address, name })
    return name
  })

const resolveUNSPromise = (address: string) =>
  resolveAddressToUNS(address).then((name): string => {
    addCachedName({ type: "uns", address, name })
    return name
  })

const resolveUnknownNamePromise = () =>
  new Promise<null>((resolve) => {
    setTimeout(() => resolve(null), 15000)
  })

const resolveAddressToNameWithoutCache = async (address: string) => {
  const normalizedAddress = normalizeAddress(address)

  if (resolveAddressPromiseCache[normalizedAddress] === undefined) {
    resolveAddressPromiseCache[normalizedAddress] = Promise.any<string | null>([
      resolveENSPromise(normalizedAddress),
      resolveUNSPromise(normalizedAddress),
      resolveUnknownNamePromise(),
    ])
  }

  const resolvedName = await resolveAddressPromiseCache[normalizedAddress]

  return resolvedName
}

export const resolveAddressToName = async (
  address: string
): Promise<string | null> => {
  const cachedNames = getCachedNames()

  const normalizedAddress = normalizeAddress(address)
  const cachedItem = cachedNames[normalizedAddress]

  console.log('### resolveAddressToName cachedItem', cachedItem, address)

  if (cachedItem && cachedItem.lastUpdate + MAX_CACHE_AGE > Date.now()) {
    return cachedItem.ens ?? cachedItem.uns
  }

  const name = await resolveAddressToNameWithoutCache(normalizedAddress)

  console.log('### resolveAddressToName name', name)

  return name
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
