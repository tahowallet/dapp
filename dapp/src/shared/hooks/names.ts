import { useCallback, useContext } from "react"
import { isProbablyEVMAddress } from "../utils"
import { EthereumProviderContext } from "./contexts"
import { useLocalStorage } from "./helpers"

type UNSResponse = { meta: { owner: string } }
type UNSReverseResponse = { data: { id: string }[] }

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

const isValidENSDomainName = (s: string): boolean => s.endsWith(".eth")

function useNamesCache() {
  const [cache, setCache] = useLocalStorage(
    "taho.cachedNames",
    JSON.stringify({})
  )

  const cachedNames = JSON.parse(cache)

  const setCachedNames = useCallback(
    (type: "ens" | "uns", address: string, name: string) => {
      const newCache = JSON.stringify({
        ...cachedNames,
        [address]: {
          ...(cachedNames[address] ?? {}),
          [type]: name,
        },
      })
      setCache(newCache)
    },
    [cachedNames, setCache]
  )

  return [cachedNames, setCachedNames]
}

export function useUNS() {
  const resolveUNS = useCallback(async (name: string) => {
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
  }, [])

  const resolveAddressToUNS = useCallback(async (address: string) => {
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
  }, [])

  return { resolveUNS, resolveAddressToUNS }
}

export function useENS() {
  const ethereumProvider = useContext(EthereumProviderContext)

  const resolveENS = useCallback(
    (name: string) => {
      if (!isValidENSDomainName(name)) {
        throw Error("Invalid ENS domain name")
      }
      return ethereumProvider.resolveName(name)
    },
    [ethereumProvider]
  )

  const resolveAddressToENS = useCallback(
    (address: string) => ethereumProvider.lookupAddress(address),
    [ethereumProvider]
  )

  return { resolveENS, resolveAddressToENS }
}

export function useAddressToNameResolution() {
  const { resolveAddressToUNS } = useUNS()
  const { resolveAddressToENS } = useENS()
  const [cachedNames, setCachedName] = useNamesCache()

  const resolveName = useCallback(
    async (address: string) => {
      if (cachedNames[address]) {
        return cachedNames[address].ens ?? cachedNames[address].uns ?? null
      }

      const resolveENSPromise = resolveAddressToENS(address).then((ensName) => {
        setCachedName("ens", address, ensName)
        return ensName
      })
      const resolveUNSPromise = resolveAddressToUNS(address).then((unsName) => {
        setCachedName("uns", address, unsName)
        return unsName
      })

      const resolved = await Promise.any<string | null>([
        resolveENSPromise,
        resolveUNSPromise,
      ])

      return resolved
    },
    [resolveAddressToENS, resolveAddressToUNS, cachedNames, setCachedName]
  )

  return resolveName
}

export function useNameToAddressResolution() {
  const { resolveUNS } = useUNS()
  const { resolveENS } = useENS()

  const resolveAddress = useCallback(
    async (addressOrName: string) => {
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
    },
    [resolveUNS, resolveENS]
  )

  return resolveAddress
}
