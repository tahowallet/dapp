import tahoWalletModule from "@web3-onboard/taho"
import trezorModule from "@web3-onboard/trezor"
import walletConnectModule from "@web3-onboard/walletconnect"
import { init } from "@web3-onboard/react"

// provided by webpack
// eslint-disable-next-line prefer-destructuring
const ARBITRUM_RPC_URL = process.env.ARBITRUM_RPC_URL

// TODO: decide what rpc providers we want to use and if/how we want to handle being rate limited
export const ARBITRUM = {
  id: "0xa4b1",
  token: "ETH",
  label: "Arbitrum One",
  rpcUrl: ARBITRUM_RPC_URL,
  publicRpcUrl: ARBITRUM_RPC_URL,
}

export const ETHEREUM = {
  id: "0x1",
  token: "ETH",
  label: "Ethereum",
  rpcUrl: "https://1rpc.io/eth",
  publicRpcUrl: "https://1rpc.io/eth",
}

const wallets = [
  tahoWalletModule(),
  trezorModule({
    // TODO: use proper email and url
    email: "doggos@taho.xyz",
    appUrl: "https://taho.xyz",
  }),
  walletConnectModule({
    projectId: process.env.WALLET_CONNECT_ID ?? "",
    requiredChains: [42161],
  }),
]
const chains = [ARBITRUM]
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
    removeIDontHaveAWalletInfoLink: true,
    removeWhereIsMyWalletWarning: true,
  },
  accountCenter: {
    desktop: {
      enabled: false,
    },
    mobile: {
      enabled: false,
    },
  },
  notify: {
    desktop: {
      enabled: false,
      transactionHandler: () => {},
    },
    mobile: {
      enabled: false,
      transactionHandler: () => {},
    },
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
