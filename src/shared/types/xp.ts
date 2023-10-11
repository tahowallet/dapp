export type XpMerkleTreeItem = {
  index: number
  beneficiary: string
  amount: string
  proof: string[]
}
export type XpMerkleTree = {
  totalAmount: string
  merkleRoot: string
  claims: {
    [address: string]: XpMerkleTreeItem
  }
}
export type XpDistributor = {
  distributorContractAddress: string
  merkleRoot: string
}
export type XpByMerkleRoot = {
  [merkleRoot: string]: XpMerkleTreeItem
}
