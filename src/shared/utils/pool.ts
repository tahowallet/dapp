import { ethers } from "ethers"

// eslint-disable-next-line import/prefer-default-export
export async function encodeUserData(
  lpTokenSupply: bigint,
  maxAmountsIn: bigint[]
) {
  if (lpTokenSupply > 0) {
    return ethers.utils.defaultAbiCoder.encode(
      ["uint256", "uint256[]", "uint256"],
      [1, maxAmountsIn, 0]
    )
  }

  return ethers.utils.defaultAbiCoder.encode(
    ["uint256", "uint256[]"],
    [0, maxAmountsIn]
  )
}
