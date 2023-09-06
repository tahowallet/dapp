import { BytesLike } from "ethers"

export type LiquidityPoolRequest = {
  assets: string[]
  maxAmountsIn: bigint[]
  userData: BytesLike
  fromInternalBalance: boolean
}
