/// <reference types="styled-jsx" />

declare module "*.svg" {
  const content: string
  export default content
}

declare module "*.png" {
  const content: string
  export default content
}

declare module "*.webp" {
  const value: string
  export = value
}

declare module "*.woff2" {
  const value: string
  export = value
}

declare namespace NodeJS {
  interface ProcessEnv {
    NODE_ENV: "production" | "development" | "test"
    WALLET_CONNECT_ID: string
    FILE_DIRECTORY_IPFS_HASH: string
    PART_GLOSSARY_IPFS_HASH: string
    ARBITRUM_RPC_URL: string
  }
}
