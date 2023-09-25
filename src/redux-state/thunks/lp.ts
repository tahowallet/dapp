import createDappAsyncThunk from "redux-state/asyncThunk"
import { TAHO_ADDRESS, ETH_ADDRESS } from "shared/constants"
import {
  getBalancerPoolAddress,
  getBalancerPoolAgentAddress,
  joinPool,
  getTotalSupply,
} from "shared/contracts"
import { encodeUserData } from "shared/utils"
import { ensureAllowance } from "./island"

// eslint-disable-next-line import/prefer-default-export
export const joinTahoPool = createDappAsyncThunk(
  "lp/joinTahoPool",
  async (
    {
      id,
      tahoAmount,
      ethAmount,
    }: { id: string; tahoAmount: bigint; ethAmount: bigint },
    { dispatch, extra: { transactionService } }
  ) => {
    const balancerPoolAddress = await transactionService.read(
      getBalancerPoolAddress,
      null
    )
    const balancerPoolAgentAddress = await transactionService.read(
      getBalancerPoolAgentAddress,
      null
    )

    if (!balancerPoolAddress || !balancerPoolAgentAddress) {
      return false
    }

    const allowanceCorrect = await dispatch(
      ensureAllowance({
        id,
        tokenAddress: TAHO_ADDRESS,
        spender: balancerPoolAgentAddress,
        amount: tahoAmount,
      })
    )

    if (!allowanceCorrect) {
      return false
    }

    const maxAmountsIn = [tahoAmount, ethAmount]
    const lpTokenSupply = await transactionService.read(getTotalSupply, {
      tokenAddress: balancerPoolAddress,
    })

    if (lpTokenSupply === null) {
      return false
    }

    const userData = await encodeUserData(lpTokenSupply, maxAmountsIn)

    const joinRequest = {
      assets: [TAHO_ADDRESS, ETH_ADDRESS],
      maxAmountsIn,
      userData,
      fromInternalBalance: false,
    }
    const overrides = {
      value: ethAmount,
    }

    const receipt = transactionService.send(id, joinPool, {
      joinRequest,
      overrides,
    })

    return !!receipt
  }
)
