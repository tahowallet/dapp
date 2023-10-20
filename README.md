# Subscape

## Installation

1.  Decide which RPC from the `.env.defaults` to use and create an `.env` file
    in the root directory with one of the following variables set to `true`:
    `USE_LOCALHOST_FORK` / `USE_TENDERLY_FORK` / `USE_ARBITRUM_SEPOLIA`.
2.  Install dependencies and start the app.
    ```bash
    yarn install
    yarn start
    ```
3.  Open [http://localhost:9000](http://localhost:9000) to view it in the browser.

## Working with locally forked Arbitrum Sepolia chain

### In the dapp:

- Override `USE_LOCALHOST_FORK="true"` in `.env` file.
- Run the dapp

### In the [extension](https://github.com/tahowallet/extension):

- Install extension due to readme
- Change `.env` variables
  ```bash
  # Forking Arbitrum Sepolia
  USE_MAINNET_FORK=true
  MAINNET_FORK_CHAIN_ID="421614"
  CHAIN_API_URL="https://sepolia-rollup.arbitrum.io/rpc"
  ```
- Restart extension's process
- Install extension as usual in the browser
- In the wallet let's import the account from the private key of the `testertesting.eth`
- Based on the Taho token's contract address (see `deployment-info.json` in the dapp or contracts repository) add the Taho asset to the wallet

### In the [contracts](https://github.com/tahowallet/contracts):

Instruction based on [the system tests readme](https://github.com/tahowallet/contracts/blob/main/system-tests/README.md)

- Install contracts
  - `nvm use`
  - `yarn install`
- Provide [`.envrc`](https://github.com/tahowallet/contracts/blob/main/system-tests/.envrc.SAMPLE) variables, make sure you have [Direnv](https://direnv.net/) installed
  ```bash
  export FORKING_URL="https://sepolia-rollup.arbitrum.io/rpc"
  export TAHO_DEPLOYER_PRIVATE_KEY="..." # mnemonic or first private key from `testertesting.eth`
  export FORKING_BLOCK="..." # historical block; optional - setting this var enables cache and speeds up repatable read operations
  ```
- Open first terminal and run `yarn run test:fork`

---

After all the steps above you should have:

- the Taho token deployed on the Arbitrum Sepolia forked chain
- the dapp should be able to interact with the token
- the extension should be able to display the token's balance
