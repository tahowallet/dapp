type IPFSLinkItem = {
  Hash: { "/": string }
  Name: string
  Tsize: number
}

const IPFSFileDirectoryIPFSHash = process.env.FILE_DIRECTORY_IPFS_HASH
const partGlossaryIPFSHash = process.env.PART_GLOSSARY_IPFS_HASH

const IPFSHTTPGatewayPrefix = "https://ipfs.io/ipfs/"
const IPFSHTTPGet = "https://ipfs.io/api/v0/dag/get?arg="

async function getFileHashProspect(targetAddress: string): Promise<string> {
  const numericTargetAddress = BigInt(targetAddress)

  const IPFSFileDirectory = await fetch(
    `${IPFSHTTPGet}${IPFSFileDirectoryIPFSHash}`
  )
  const partGlossary = await fetch(
    `${IPFSHTTPGatewayPrefix}${partGlossaryIPFSHash}`
  )

  const IPFSFileDirectoryJson = await IPFSFileDirectory.json()
  const partGlossaryJson = await partGlossary.json()

  const fileIndex =
    partGlossaryJson
      .map((item: { startAddress: string; file: string }) => item.startAddress)
      .findIndex(
        (startAddress: string) =>
          BigInt(startAddress ?? 0) > numericTargetAddress
      ) - 1
  const inClaimFileName = partGlossaryJson[fileIndex]?.file

  const IPFSHashForFoundFile = IPFSFileDirectoryJson.Links.find(
    (linkItem: IPFSLinkItem) => linkItem.Name === inClaimFileName
  )

  return IPFSHashForFoundFile?.Hash["/"]
}

async function getClaimFromFileHash(
  address: string,
  hash: string
): Promise<{
  address: string
  amount: number
}> {
  const res = await fetch(`${IPFSHTTPGatewayPrefix}${hash}`)
  let claim
  const reader = res?.body?.getReader()
  let result
  const decoder = new TextDecoder()

  if (reader) {
    let unfinishedLine = ""
    const searchString = `"account":"${address}"`
    result = await reader.read()

    while (!result.done) {
      const currentChunk =
        unfinishedLine + decoder.decode(result.value, { stream: true })

      if (currentChunk.includes(searchString)) {
        const lines = currentChunk.split(/[\r\n]/)

        // Last entry is definitionally after the last newline.
        // Could be empty if the chunk ends on a newline.
        unfinishedLine = lines.pop() || ""

        const matchingClaim = lines
          .map((claimEntry) => JSON.parse(claimEntry))
          .find((claimEntry) => claimEntry.account === address)
        if (matchingClaim) {
          claim = matchingClaim
          break
        }
      }
      // Seems reasonable to await inside of the while loop
      // with the idea of avoiding reading everything.
      // eslint-disable-next-line no-await-in-loop
      result = await reader.read()
    }
  }

  return {
    address,
    amount: claim?.amount ?? 0,
  }
}

// eslint-disable-next-line import/prefer-default-export
export async function getEligibility(address: string): Promise<{
  isEligible: boolean
  amount: number
}> {
  const hash = await getFileHashProspect(address)
  const { amount } = await getClaimFromFileHash(address, hash)
  return {
    isEligible: amount > 0,
    amount,
  }
}
