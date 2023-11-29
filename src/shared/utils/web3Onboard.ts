import tahoWalletModule from "@web3-onboard/taho"
import trezorModule from "@web3-onboard/trezor"
import walletConnectModule from "@web3-onboard/walletconnect"
import metamaskSDK from "@web3-onboard/metamask"
import { init } from "@web3-onboard/react"
import { ARBITRUM_SEPOLIA } from "shared/constants"

const SUBSACAPE_NAME = "Subscape"
const SUBSACAPE_URL = "https://app.taho.xyz"
const SUBSACAPE_ICON =
  "https://raw.githubusercontent.com/tahowallet/taho.xyz/29a091abf919b5cfcf511fd10c41d73490ce4f23/src/shared/favicon.svg"

const chains = [ARBITRUM_SEPOLIA]
// TODO: decide what metadata should look like
const appMetadata = {
  name: SUBSACAPE_NAME,
  description: "Subscape dapp",
  icon: SUBSACAPE_ICON,
}

const walletsSetup = {
  taho: tahoWalletModule(),
  trezor: trezorModule({
    // TODO: use proper email and url
    email: "doggos@taho.xyz",
    appUrl: SUBSACAPE_URL,
  }),
  walletConnect: walletConnectModule({
    projectId: process.env.WALLET_CONNECT_ID ?? "",
    requiredChains: [parseInt(ARBITRUM_SEPOLIA.id, 16)],
  }),
  metamask: metamaskSDK({
    options: {
      extensionOnly: false,
      dappMetadata: {
        name: SUBSACAPE_NAME,
        url: SUBSACAPE_URL,
        base64Icon: SUBSACAPE_ICON,
      },
    },
  }),
}

const wallets = [walletsSetup.taho, walletsSetup.metamask]

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
