import { ethereumProvider } from "../hooks/contexts"

export const isValidENSDomainName = (s: string): boolean => s.endsWith(".eth")

export const resolveENS = (name: string) => {
  if (!isValidENSDomainName(name)) {
    throw Error("Invalid ENS domain name")
  }
  return ethereumProvider.resolveName(name)
}

export const resolveAddressToENS = async (address: string) => {
  const name = await ethereumProvider.lookupAddress(address)
  if (!name) {
    throw Error("Invalid ENS domain name")
  }
  return name
}
