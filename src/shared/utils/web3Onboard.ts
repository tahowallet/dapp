import tahoWalletModule from "@web3-onboard/taho"
import trezorModule from "@web3-onboard/trezor"
import walletConnectModule from "@web3-onboard/walletconnect"
import metamaskSDK from "@web3-onboard/metamask"
import { init } from "@web3-onboard/react"
import { ARBITRUM_SEPOLIA } from "shared/constants"
import favicon from "shared/assets/favicon.svg"

const SUBSACAPE_NAME = "Subscape"
const SUBSACAPE_URL = "https://app.taho.xyz"
const SUBSACAPE_ICON = favicon
const chains = [ARBITRUM_SEPOLIA]

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
      },
    },
  }),
}

const hasTaho = "taho" in window
const wallets = hasTaho
  ? [walletsSetup.taho]
  : [walletsSetup.taho, walletsSetup.metamask]

const web3Onboard = init({
  wallets,
  chains,
  appMetadata,
  connect: {
    // TODO: web3onboard remembers last wallet that was used. If it was MM but MM becomes
    // unavailable then web3onboard will try to auto connect to MM and will fail.
    // So to avoid problem with attempting auto connection to the wallet
    // that is not available on the wallet lists let's just disable autoConnect
    // feature for Metamask for now.
    autoConnectLastWallet: hasTaho,
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
  i18n: {
    en: {
      connect: {
        connectingWallet: { paragraph: "Granting access to your account." },
      },
    },
  },
})

export default web3Onboard
