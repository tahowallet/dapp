import { ethers } from "ethers"

/*
  The userData needs to be encoded to send a request to join the pool.
  Currently, this data isn't encoded on the BalancerPoolAgent contract side.
  Therefore, the encoding is done in the following function.

  See: https://docs.balancer.fi/reference/joins-and-exits/pool-joins.html#userdata
  See: https://github.com/balancer/balancer-v2-monorepo/blob/227683919a7031615c0bc7f144666cdf3883d212/pkg/balancer-js/src/pool-weighted/encoder.ts#L27-L43
*/
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

/*
  Sorts two tokens in ascending order by address, returning them as a sorted array.

  See: https://github.com/balancer/balancer-v2-monorepo/blob/227683919a7031615c0bc7f144666cdf3883d212/pkg/vault/contracts/balances/TwoTokenPoolsBalance.sol#L397
*/
export function sortTokens(
  tokenX: { address: string; amount: bigint },
  tokenY: { address: string; amount: bigint }
): { address: string; amount: bigint }[] {
  return tokenX.address < tokenY.address ? [tokenX, tokenY] : [tokenY, tokenX]
}
