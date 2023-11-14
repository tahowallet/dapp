# Working with Subscape locally

### In the dapp:

Either connect to
  - the real Arbitrum Sepolia chain - override `USE_ARBITRUM_SEPOLIA="true"` in `.env` file
  - to local fork - override `USE_LOCALHOST_FORK="true"` in `.env` file
  - to Tenderly fork - `USE_TENDERLY_FORK="true"` in `.env` file
- Install dapp `yarn install`
- Run the dapp with `yarn start`

### In the [extension](https://github.com/tahowallet/extension):

If you want to use the real Arbitrum Sepolia blockchain:
- just use production version of the Taho wallet

If you want to use local or Tenderly fork:
- Install extension due to the readme
- Change `.env` variables
  ```bash
  # Forking Arbitrum Sepolia
  USE_MAINNET_FORK=true
  MAINNET_FORK_CHAIN_ID="421614"
  CHAIN_API_URL="<tenderly-url-or-local-hardhat-url>"
  ```
- Restart extension's process
- Install extension as usual in the browser

### In the [contracts](https://github.com/tahowallet/contracts):

Follow to setup **local hardhat fork** of Arbitrum Sepolia network. The fork will contain the same set of contracts that is already deployed on the blockchain. In case of using Tenderly fork ignore this section.

Instruction based on [the system tests readme](https://github.com/tahowallet/contracts/blob/main/system-tests/README.md)

- Install contracts
  - `nvm use`
  - `yarn install`
- Provide [`.envrc`](https://github.com/tahowallet/contracts/blob/main/system-tests/.envrc.SAMPLE) variables, make sure you have [Direnv](https://direnv.net/) installed

  ```bash
  export FORKING_URL="https://sepolia-rollup.arbitrum.io/rpc" # any Arbitrum Sepolia RPC url
  export TAHO_DEPLOYER_PRIVATE_KEY="..." # account that will get funds on the Hardhat chain fork

  export FORKING_BLOCK="..." # historical block; optional - setting this var enables cache and speeds up repatable read operations
  export FORKING_CHAIN_ID="421614" # Arbitrum Sepolia chain id
  ```

- Open terminal and run `yarn run test:fork`

---

After all the steps above you should have:

- (optional) the Taho token deployed on the Arbitrum Sepolia forked chain
- the dapp should be able to interact with the token
- the wallet extension should be able to display the token's balance
- the wallet should be able to sign transactions
