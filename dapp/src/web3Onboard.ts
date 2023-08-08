import tahoWalletModule from "@web3-onboard/taho"
// import trezorModule from "@web3-onboard/trezor"
// import walletConnectModule from "@web3-onboard/walletconnect"
import { init } from "@web3-onboard/react"

const wallets = [
  tahoWalletModule(),
  // trezorModule({
  //   email: "<EMAIL_CONTACT>",
  //   appUrl: "<APP_URL>",
  // }),
  // walletConnectModule({
  //   projectId: "<PROJECT_ID>",
  //   requiredChains: [42161],
  // }),
]
const chains = [
  {
    id: "0xa4b1",
    token: "ETH",
    label: "Arbitrum One",
    rpcUrl: "https://1rpc.io/arb",
  },
]
// TODO: decide what metadata should look like
const appMetadata = {
  name: "Taho Dapp",
  description: "Taho Dapp",
  icon: "https://raw.githubusercontent.com/tahowallet/taho.xyz/29a091abf919b5cfcf511fd10c41d73490ce4f23/src/shared/favicon.svg",
}

const web3Onboard = init({
  wallets,
  chains,
  appMetadata,
  connect: {
    autoConnectLastWallet: true,
  },
  theme: {
    "--w3o-background-color": "#002825",
    "--w3o-foreground-color": "#071111",
    "--w3o-text-color": "#e4eeee",
    "--w3o-border-color": "#063f3d",
    "--w3o-action-color": "#ed9a26",
    "--w3o-border-radius": "16px",
    "--w3o-font-family": "var(--sans)",
  },
})

export default web3Onboard
