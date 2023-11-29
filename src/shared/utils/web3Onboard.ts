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
// TODO: seems like Metamask has a problem displaying the icon
const SUBSACAPE_ICON_BASE64 =
  "data:image/png;base64,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"

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
        base64Icon: SUBSACAPE_ICON_BASE64,
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
