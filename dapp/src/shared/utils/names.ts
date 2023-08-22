import { ethereumProvider } from "../hooks/contexts"
import { isProbablyEVMAddress } from "./address"

export type UNSResponse = { meta: { owner: string } }
export type UNSReverseResponse = { data: { id: string }[] }

type NameWithProvider = {
  name: string
  type: "ens" | "uns"
}
const NAMES_CACHE_STRORAGE_KEY = "taho.cachedNames"
const MAX_CACHE_AGE = 1000 * 60 * 60 * 24 * 7 // 1 week

const isValidENSDomainName = (s: string): boolean => s.endsWith(".eth")

const isValidUNSDomainName = (s: string): boolean => {
  const trimmedString = s.trim()

  // Any valid domain name will have a period as part of the string
  if (trimmedString.lastIndexOf(".") > 0) {
    const domainExtension = trimmedString.slice(trimmedString.lastIndexOf("."))
    const supportedUNSDomains = [
      ".crypto",
      ".coin",
      ".wallet",
      ".bitcoin",
      ".888",
      ".nft",
      ".dao",
      ".zil",
      ".x",
      ".blockchain",
    ]

    if (supportedUNSDomains.includes(domainExtension)) {
      return true
    }
  }
  return false
}

const resolveUNS = async (name: string) => {
  if (!isValidUNSDomainName(name)) {
    throw new Error("Invalid UNS domain name")
  }

  const response = await fetch(
    `https://resolve.unstoppabledomains.com/domains/${name}`,
    {
      method: "GET",
      headers: new Headers({
        Authorization: `Bearer ${process.env.UNS_API_KEY}`,
      }),
    }
  )

  const {
    meta: { owner },
  }: UNSResponse = await response.json()

  return owner
}

const resolveAddressToUNS = async (address: string) => {
  const response = await fetch(
    `https://resolve.unstoppabledomains.com/domains/?owners=${address}&sortBy=id&sortDirection=ASC`,
    {
      headers: new Headers({
        Authorization: `Bearer ${process.env.UNS_API_KEY}`,
      }),
    }
  )

  const { data }: UNSReverseResponse = await response.json()

  return data[0]?.id ?? null
}

const resolveENS = (name: string) => {
  if (!isValidENSDomainName(name)) {
    throw Error("Invalid ENS domain name")
  }
  return ethereumProvider.resolveName(name)
}

const resolveAddressToENS = (address: string) =>
  ethereumProvider.lookupAddress(address)

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

const resolveAddressToNameWithoutCache = async (address: string) => {
  const resolveENSPromise = resolveAddressToENS(address)
    .then((name): NameWithProvider | null =>
      name ? { type: "ens", name } : null
    )
    .catch(() => null)

  const resolveUNSPromise = resolveAddressToUNS(address)
    .then(
      (name): NameWithProvider => ({
        type: "uns",
        name,
      })
    )
    .catch(() => null)

  const resolveUnknownNamePromise = new Promise<null>((resolve) => {
    setTimeout(() => resolve(null), 5000)
  })

  return Promise.any<NameWithProvider | null>([
    resolveENSPromise,
    resolveUNSPromise,
    resolveUnknownNamePromise,
  ])
}

const getCachedNames = () => {
  const cachedNamesUnparsed =
    localStorage.getItem(NAMES_CACHE_STRORAGE_KEY) ?? "{}"

  return JSON.parse(cachedNamesUnparsed)
}

const addCachedName = ({
  name,
  address,
  type,
}: NameWithProvider & { address: string }) => {
  const cachedNames = getCachedNames()

  const newCache = JSON.stringify({
    ...cachedNames,
    [address]: {
      ...(cachedNames[address] ?? {}),
      [type]: name,
      lastUpdate: Date.now(),
    },
  })
  localStorage.setItem(NAMES_CACHE_STRORAGE_KEY, newCache)
}

export const resolveAddressToName = async (
  address: string
): Promise<string | null> => {
  const cachedNames = getCachedNames()

  if (
    cachedNames[address] &&
    cachedNames[address].lastUpdate + MAX_CACHE_AGE > Date.now()
  ) {
    return cachedNames[address].ens ?? cachedNames[address].uns ?? null
  }

  const { name, type } = (await resolveAddressToNameWithoutCache(address)) ?? {}

  if (name && type) {
    addCachedName({ type, address, name })
    return name
  }

  return null
}
