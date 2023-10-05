import { MerkleTree } from "merkletreejs"
import fs from "node:fs/promises"
import ethers from "ethers"

const TEST_DATA = [
  {
    Holding_Amount: "1",
    Wallet_Address: "0xf39fd6e51aad88f6f4ce6ab8827279cfffb92266",
  },
  {
    Holding_Amount: "2",
    Wallet_Address: "0x70997970c51812dc3a010c7d01b50e0d17dc79c8",
  },
  {
    Holding_Amount: "3",
    Wallet_Address: "0x3c44cdddb6a900fa2b585dd299e03d12fa4293bc",
  },
]

function assignXP(totalXP, data) {
  const totalHeld = data.reduce(
    (soFar, holder) => soFar + holder.Holding_Amount,
    0
  )
  return data.map((holder) => ({
    address: holder.Wallet_Address,
    amount: holder.Holding_Amount,
    xp: Math.floor((holder.Holding_Amount / totalHeld) * totalXP).toString(),
  }))
}

function getLeaf(holder) {
  return (
    holder.address +
    ethers.BigNumber.from(holder.amount).toString().padStart(64, "0")
  )
}

function genMerkleDist(data) {
  const elements = data.map(getLeaf)

  const tree = new MerkleTree(elements, ethers.utils.keccak256, {
    hashLeaves: true,
    sort: true,
  })

  const root = tree.getHexRoot()
  const leaves = tree.getHexLeaves()
  const proofs = leaves.map(tree.getHexProof, tree)

  const totalAmount = data
    .map((holder) => ethers.BigNumber.from(holder.xp))
    .reduce((a, b) => a.add(b))
    .toString()

  const claims = data.map((holder) => {
    const leaf = ethers.utils.keccak256(getLeaf(holder))
    const index = leaves.indexOf(leaf)
    return {
      index,
      address: holder.address,
      amount: holder.xp,
      proof: proofs[index],
    }
  })

  const dist = {
    totalAmount,
    merkleRoot: root,
    claims: claims.reduce((acc, { address, amount, proof, index }) => {
      acc[address] = { index, beneficiary: address, amount, proof }
      return acc
    }, {}),
  }

  return dist
}

async function main() {
  const xpAssignments = assignXP(1000000, TEST_DATA)
  const merkleDist = genMerkleDist(xpAssignments)
  const merkleJSON = JSON.stringify(merkleDist, null, 2)
  await fs.writeFile("src/data/xp/xp.json", merkleJSON)
}

main()
