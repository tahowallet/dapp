import { ethers } from "ethers"
import { useMemo, useCallback } from "react"
import { ETHEREUM } from "../../web3Onboard"
import { isProbablyEVMAddress } from "../utils"

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
  const ethereumProvider = useMemo(
    () => new ethers.providers.JsonRpcProvider(ETHEREUM.publicRpcUrl),
    []
  )

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

  const resolveName = useCallback(
    async (address: string) => {
      const resolved = await Promise.any<string | null>([
        resolveAddressToENS(address),
        // As we care about ENS addresses more than UNS let's wait a bit longer
        new Promise((resolve) => {
          const unsName = resolveAddressToUNS(address)
          setTimeout(() => resolve(unsName), 5000)
        }),
        // If address doesn't have a name at all then let's not bother waiting
        new Promise((resolve) => {
          setTimeout(() => resolve(address), 10000)
        }),
      ])

      return resolved ?? address
    },
    [resolveAddressToENS, resolveAddressToUNS]
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
