import { ethers } from "ethers"
import deployment from "../deployment-info.json"
import * as contracts from "../typechain/index"

const provider = new ethers.providers.JsonRpcProvider("http://127.0.0.1:8545")

const contract = contracts.TahoDeployer__factory.connect(
  deployment[0].expectedAddress, // TahoDeployer
  provider
)

const main = async () => {
  const NODES = [
    "VAMPIRE_NODE",
    "EDUCATE_NODE",
    "SOCIAL_NODE",
    "CREATORS_NODE",
    "DEFI_NODE",
  ] as const

  await Promise.all(
    NODES.map(async (node) => ({ name: node, address: await contract[node]() }))
    /* eslint-disable-next-line no-console */
  ).then(console.table)
}

main()
