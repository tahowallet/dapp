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

## Docs

- [Local environment setup](docs/local-env-setup.md)
- [Testing environment](docs/testing-env.md)
