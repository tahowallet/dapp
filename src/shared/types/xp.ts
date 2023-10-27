export type XpMerkleTreeItem = {
  index: string
  amount: string
  proof: string[]
}
export type XpMerkleTreeClaims = {
  [address: string]: XpMerkleTreeItem
}
export type XpMerkleTree = {
  totalAmount: string
  merkleRoot: string
  merkleDistributor: string
  claims: XpMerkleTreeClaims
}
export type XpMerkleTreeGlossary = Omit<XpMerkleTree, "claims"> & {
  glossary: { startAddress: string; file: string }[]
}
export type XpDistributor = {
  distributorContractAddress: string
  merkleRoot: string
}
export type XpByMerkleRoot = {
  [merkleRoot: string]: XpMerkleTreeItem
}
