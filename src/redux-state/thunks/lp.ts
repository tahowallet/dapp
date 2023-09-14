import createDappAsyncThunk from "redux-state/asyncThunk"
import {
  getAllowance,
  setAllowance,
  getBalancerPoolAddress,
  getBalancerPoolAgentAddress,
  joinPool,
  getTotalSupply,
} from "shared/contracts"
import { ETH_ADDRESS, encodeUserData } from "shared/utils"

// eslint-disable-next-line import/prefer-default-export
export const joinTahoPool = createDappAsyncThunk(
  "lp/joinTahoPool",
  async (
    { tahoAmount, ethAmount }: { tahoAmount: bigint; ethAmount: bigint },
    { extra: { transactionService } }
  ) => {
    const account = await transactionService.getSignerAddress()
    const balancerPoolAddress = await transactionService.read(
      getBalancerPoolAddress,
      null
    )
    const balancerPoolAgentAddress = await transactionService.read(
      getBalancerPoolAgentAddress,
      null
    )

    const allowanceValue = await transactionService.read(getAllowance, {
      tokenAddress: CONTRACT_Taho,
      account,
      contractAddress: balancerPoolAgentAddress,
    })

    if (allowanceValue < tahoAmount) {
      await transactionService.send(setAllowance, {
        tokenAddress: CONTRACT_Taho,
        account,
        amount: tahoAmount,
      })
    }

    const maxAmountsIn = [tahoAmount, ethAmount]
    const lpTokenSupply = await transactionService.read(getTotalSupply, {
      tokenAddress: balancerPoolAddress,
    })
    const userData = await encodeUserData(lpTokenSupply, maxAmountsIn)

    const joinRequest = {
      assets: [CONTRACT_Taho, ETH_ADDRESS],
      maxAmountsIn,
      userData,
      fromInternalBalance: false,
    }
    const overrides = {
      value: ethAmount,
    }

    return transactionService.send(joinPool, { joinRequest, overrides })
  }
)
