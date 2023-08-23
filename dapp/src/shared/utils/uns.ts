import { wait } from "./misc"

export type UNSResponse = { meta: { owner: string } }
export type UNSReverseResponse = { data: { id: string | null }[] }

export const isValidUNSDomainName = (s: string): boolean => {
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

export const resolveUNS = async (name: string) => {
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

export const resolveAddressToUNS = async (address: string) => {
  const response = await fetch(
    `https://resolve.unstoppabledomains.com/domains/?owners=${address}&sortBy=id&sortDirection=ASC`,
    {
      headers: new Headers({
        Authorization: `Bearer ${process.env.UNS_API_KEY}`,
      }),
    }
  )

  const { data }: UNSReverseResponse = await response.json()
  const name = data[0]?.id ?? null

  if (!name) {
    throw new Error("Invalid UNS domain name")
  }

  // UNS tend to resolve faster than ENS, so to prefer ENS names let's wait a bit
  await wait(10000)

  return name
}
