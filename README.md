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

## Working with forked Arbitrum Sepolia chain

### In the dapp:

- Override `USE_ARBITRUM_FORK="true"` in `.env` file.
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

  export TAHO_DEPLOYER_PRIVATE_KEY="..." # private key of testertesting.eth    
  export TAHO_TEST_WALLET_PRIVATE_KEY="..." # private key of testertesting.eth  
  export GUARDA_PRIVATE_KEY="..." # private key of testertesting.eth  

  export FORKING_BLOCK="..." # historical block; optional - setting this var enables cache and speeds up repatable read operations
  export FORKING_CHAIN_ID="421614" # Arbitrum Sepolia chain id
  export ARBITRUM_HTTPS_RPC_URL="http://127.0.0.1:8545/"
  ```
- Open terminal and run `yarn run test:fork`

---

After all the steps above you should have:

- the Taho token deployed on the Arbitrum Sepolia forked chain
- the dapp should be able to interact with the token
- the extension should be able to display the token's balance

---

### XP allocations deployment

To be able to test XP allocations you need to:

#### Prepare merkle tree file:

1. In the contracts repository create a file with XP allocations in the format:
   ```json
   [
     {
       "account": "0x...",
       "amount": "4000"
     },
     {
       "account": "0x...",
       "amount": "2000"
     },
     {
       "account": "0x...",
       "amount": "3000"
     }
   ]
   ```
2. Run `yarn run merkle:generate <path-to-input-file>.json <path-to-output-file>.json`. This command will create an JSON file with a merkle tree of the XP allocations.
3. Copy the output file to the dapp's `src/data/xp/<realm-id>` directory. Name the file `xp_<realm-id>_<drop-index>.json`. Drop index should start from `1` and be incremented by `1` for each new drop.

#### Deploy XP allocations:

1. In the contracts repository set correct environment variables based on where you want to publish the XP drop.
   ```bash
   export GUARDA_PRIVATE_KEY="..." # private key for account that will publish the drop, locally use testertesting.eth
   export ARBITRUM_HTTPS_RPC_URL="http://127.0.0.1:8545/" # RPC url of the chain where you want to publish the drop
   ```
2. Then run:
   ```
   yarn run merkle:allocate-xp <realm-address> <merkle-root> <amount> <merkle-data-url>
   ```
   Where
   ```
   <realm-address> - address of the realm where you want to publish the drop
   <merkle-root> - merkle root of the merkle tree, copy from the output file
   <amount> - amount of XP to be distributed, copy from the output file
   <merkle-data-url> - url to the merkle tree file, can't be empty, doesn't matter locally, on public chain should be set to the actual url of the merkle tree json file
   ```
3. Drop should be accessible on the chain now and dapp should be able to fetch info about the drops and claim the XP.
4. Leaderboard data is just a sum of all drops for a given realm, script to generate leaderboard file is TODO