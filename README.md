# Taho Dapp

## Installation

1.  Create a `.env` file in the root directory of the project and provide values for the following variables:
    ```bash
    WALLET_CONNECT_ID=""
    UNS_API_KEY=""
    FILE_DIRECTORY_IPFS_HASH=""
    PART_GLOSSARY_IPFS_HASH=""
    ```
2.  Install dependencies and start the app.
    ```bash
    yarn install
    yarn start
    ```
3.  Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

## Working with forked Arbitrum chain

### In the dapp:

- Override `USE_ARBITRUM_FORK="true"` in `.env` file.
- Run the dapp

### In the [extension](https://github.com/tahowallet/extension):

- Install extension due to readme
- Change `.env` variables
  ```bash
  # Forking Arbitrum
  USE_MAINNET_FORK=true
  MAINNET_FORK_CHAIN_ID="42161"
  CHAIN_API_URL="https://arb-mainnet.g.alchemy.com/v2/..."
  ```
- Restart extension's process
- Install extension as usual in the browser
- In the wallet let's import the account from the mnemonic `test test ... junk`
- Switch network to Arbitrum
- Based on the Taho token's contract address (see `deployment-info.json` in the dapp or contracts repository) add the Taho asset to the wallet

### In the [contracts](https://github.com/tahowallet/contracts):

Instruction based on [the system tests readme](https://github.com/tahowallet/contracts/blob/main/system-tests/README.md)

- Install contracts
  - `nvm use`
  - `yarn install`
  - `yarn build`
- Provide [`.envrc`](https://github.com/tahowallet/contracts/blob/main/system-tests/.envrc.SAMPLE) variables, make sure you have [Direnv](https://direnv.net/) installed
  ```bash
  export FORKING_URL="https://arb-mainnet.g.alchemy.com/v2/..."
  export TAHO_DEPLOYER_PRIVATE_KEY="..." # mnemonic or first private key from `test test ... junk`
  ```
- Open first terminal and run `yarn run test:fork_mainnet`
- Open second terminal and run `yarn run deploy_taho`

---

After all the steps above you should have:

- the Taho token deployed on the Arbitrum forked chain
- the dapp should be able to interact with the token
- the extension should be able to display the token's balance
