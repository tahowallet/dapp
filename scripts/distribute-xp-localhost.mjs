import { ethers } from "ethers"

// TODO: make it a script argument
const MERKLE_ROOT =
  "0xdbc0fb6353c544c5f6f61744b099c6fe6ff51083abb449dee34b25a660d5bcd6"
const AMOUNT = 1000
const MERKLE_DATA_URL = "test.xyz"
const REALM_ADDRESS = "0x25f59fb6bc988c9af5cbb9e105c20971b4b420db"

const TAHO_MULTISIG = "0x6e80164ea60673d64d5d6228beb684a1274bb017"
const localhostProvider = new ethers.providers.JsonRpcProvider(
  "http://localhost:8545"
)

const impersonate = (address) =>
  localhostProvider.send("hardhat_impersonateAccount", [address])

const stopImpersonating = (address) =>
  localhostProvider.send("hardhat_stopImpersonatingAccount", [address])

async function main() {
  if (!MERKLE_ROOT || !AMOUNT || !REALM_ADDRESS) {
    // eslint-disable-next-line no-console
    console.error("Missing arguments")
    process.exit(1)
  }

  await impersonate(TAHO_MULTISIG)
  const signer = localhostProvider.getSigner(TAHO_MULTISIG)

  const realmContract = new ethers.Contract(
    REALM_ADDRESS,
    [
      {
        inputs: [],
        name: "createXp",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
      {
        inputs: [
          {
            internalType: "bytes32",
            name: "merkleRoot",
            type: "bytes32",
          },
          {
            internalType: "uint256",
            name: "amount",
            type: "uint256",
          },
          {
            internalType: "string",
            name: "merkleDataUrl",
            type: "string",
          },
        ],
        name: "distributeXp",
        outputs: [
          {
            internalType: "address",
            name: "",
            type: "address",
          },
        ],
        stateMutability: "nonpayable",
        type: "function",
      },
    ],
    localhostProvider
  )

  const populatedTx = await realmContract.populateTransaction.distributeXp(
    MERKLE_ROOT,
    AMOUNT,
    MERKLE_DATA_URL
  )

  const tx = await signer.sendTransaction(populatedTx)

  await tx.wait()

  await stopImpersonating(TAHO_MULTISIG)
}

main()
