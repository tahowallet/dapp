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
