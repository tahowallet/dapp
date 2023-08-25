import { Eligibility } from "../types"
import { isSameAddress } from "./address"

type IPFSLinkItem = {
  Hash: { "/": string }
  Name: string
  Tsize: number
}

const TEST_WALLET_ADDRESS = "0x0581470a8b62bd35dbf121a6329d43e7edd20fc7"
const TEST_WALLET_PROOF_MOCK = [
  "0x2d1dea776f8ffc20ddb90c4f706c95a894d7662f27f4f7d20e0b43a0f0bceb24",
  "0x2a8e21a51f0d9df7a04bcc17687c44f4f82c7e07a0c2192c486f72ac0b9cd32f",
  "0x7b57075c0754f7a783ec849c5aa94b3d8fe5bc4b1a06995485c7fe26c43e7391",
  "0x00f3135c016080e1657075715aaff7ceb33120e86a9cde8b6d89c4082ea32f0a",
]

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
): Promise<Eligibility> {
  const res = await fetch(`${IPFSHTTPGatewayPrefix}${hash}`)
  let claim: Eligibility = {
    account: address,
    amount: 0n,
    index: null,
    proof: null,
  }
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

      if (currentChunk.toLowerCase().includes(searchString.toLowerCase())) {
        const lines = currentChunk.split(/[\r\n]/)

        // Last entry is definitionally after the last newline.
        // Could be empty if the chunk ends on a newline.
        unfinishedLine = lines.pop() || ""

        const matchingClaim: Eligibility | undefined = lines
          .map((claimEntry) => JSON.parse(claimEntry))
          .find((claimEntry) => isSameAddress(claimEntry.account, address))
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

  return claim
}

// eslint-disable-next-line import/prefer-default-export
export async function getEligibility(address: string): Promise<Eligibility> {
  if (isSameAddress(address, TEST_WALLET_ADDRESS)) {
    return {
      account: address,
      index: "0x38",
      amount: 100n,
      proof: TEST_WALLET_PROOF_MOCK,
    }
  }

  const hash = await getFileHashProspect(address)
  return getClaimFromFileHash(address, hash)
}
