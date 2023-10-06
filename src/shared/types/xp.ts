export type XpMerkleTreeItem = {
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
