import { ethereumProvider } from "./providers"

export const isValidENSDomainName = (s: string): boolean => s.endsWith(".eth")

export const resolveENS = (name: string) => {
  if (!isValidENSDomainName(name)) {
    throw Error("Invalid ENS domain name")
  }
  return ethereumProvider.resolveName(name)
}

export const resolveAddressToENS = async (address: string) => {
  try {
    const name = await ethereumProvider.lookupAddress(address)
    const avatar = await ethereumProvider.getAvatar(address)

    if (!name) throw Error("Invalid ENS domain name")
    if (!avatar) return { name }

    return { name, avatar }
  } catch {
    return null
  }
}
