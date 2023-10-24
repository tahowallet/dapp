export type XpMerkleTreeItem = {
  index: string
  amount: string
  proof: string[]
}
export type XpMerkleTree = {
  totalAmount: string
  merkleRoot: string
  merkleDistributor: string
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
