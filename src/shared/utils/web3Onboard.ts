import tahoWalletModule from "@web3-onboard/taho"
import trezorModule from "@web3-onboard/trezor"
import walletConnectModule from "@web3-onboard/walletconnect"
import { init } from "@web3-onboard/react"
import { ARBITRUM_SEPOLIA } from "shared/constants"

const walletsSetup = {
  taho: tahoWalletModule(),
  trezor: trezorModule({
    // TODO: use proper email and url
    email: "doggos@taho.xyz",
    appUrl: "https://taho.xyz",
  }),
  walletConnect: walletConnectModule({
    projectId: process.env.WALLET_CONNECT_ID ?? "",
    requiredChains: [parseInt(ARBITRUM_SEPOLIA.id, 16)],
    dappUrl: "https://deploy-preview-780--taho-development.netlify.app/",
  }),
}

const wallets = [walletsSetup.taho, walletsSetup.walletConnect]

const chains = [ARBITRUM_SEPOLIA]
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
    iDontHaveAWalletLink:
      "https://chrome.google.com/webstore/detail/taho/eajafomhmkipbjmfmhebemolkcicgfmd",
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
