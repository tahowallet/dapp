import React, { useEffect, useMemo, useState } from "react"
import classNames from "classnames"

import Button from "../../shared/components/Button"
import SharedInput from "../../shared/components/Input"
import Dialog from "../../shared/components/Dialog"
import Icon from "../../shared/components/Icon"
import Loader from "../../shared/components/RippleLoader"

import { CustomERC20__factory, Node__factory } from "../../../typechain"

import { useWallet } from "../../shared/hooks"
import { getZoneData } from "../constants"
import { bigIntToUserAmount, userAmountToBigInt } from "../../shared/utils"

import iconNotifCorrect from "../../shared/assets/icons/s/notif-correct.svg"

enum StakingErrors {
  INSUFFICIENT_BALANCE = "Insufficient balance",
  INVALID_AMOUNT = "Invalid amount",
  PROVIDER_ERROR = "Invalid response from provider",
  APPROVAL_ERROR = "Approval failed",
  STAKING_ERROR = "Staking failed",
  COOLDOWN_ERROR = "Stake lock time not passed yet",
  REGION_LIMIT_ERROR = "Already staking in a different node",
}

enum StakingStatus {
  idle = 0,
  waiting_approval_signature = 1,
  waiting_final_signature = 2,
  waiting_approval_tx = 3,
  waiting_final_tx = 4,
  complete = 5,
}

const stakingMessages = {
  [StakingStatus.idle]: "",
  [StakingStatus.waiting_approval_signature]: "Waiting for signature",
  [StakingStatus.waiting_approval_tx]: "Waiting for approval",
  [StakingStatus.waiting_final_signature]: "Waiting for signature",
  [StakingStatus.waiting_final_tx]: "Broadcasting",
  [StakingStatus.complete]: "Done",
} as const

function StakingErrorDialog({
  error,
  onClose,
}: {
  error: string
  onClose: () => void
}) {
  return (
    <Dialog type="fullscreen" overlay="none" onClose={onClose}>
      <div className="dialog_container">
        <button className="close" type="button" onClick={onClose}>
          <svg
            width={40}
            height={40}
            viewBox="0 0 40 40"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              fillRule="evenodd"
              clipRule="evenodd"
              d="M21.414 20l4.793-4.793-1.414-1.414L20 18.586l-4.793-4.793-1.414 1.414L18.586 20l-4.793 4.793 1.414 1.414L20 21.414l4.793 4.793 1.414-1.414L21.414 20z"
              fill="#588382"
              fillOpacity={0.6}
            />
            <circle cx={20} cy={20} r={20} fill="#E4EEEE" fillOpacity={0.2} />
          </svg>
        </button>
        <h2>Error</h2>
        <div className="error_msg">{error}</div>
      </div>
      <style jsx>
        {`
          .dialog_container {
            padding: 16px;
            min-width: 200px;
            color: var(--semantic-error);
          }

          .close {
            appearance: none;
            outline: none;
            position: absolute;
            left: calc(100% + 8px);
            top: 0;
            background: none;
            border: none;
          }

          .error_msg {
            font: var(--text-label);
          }
          .close:hover {
            cursor: pointer;
          }
          .close:hover path {
            fill-opacity: 1;
          }
        `}
      </style>
    </Dialog>
  )
}

function StakingProgress({ status }: { status: StakingStatus }) {
  if (status === StakingStatus.idle) {
    return null
  }

  const hasApproval = status > StakingStatus.waiting_approval_tx
  const isComplete = status === StakingStatus.complete

  return (
    <div className={classNames("loader_container", { complete: isComplete })}>
      {hasApproval ? (
        <div className={classNames("row", { success: hasApproval })}>
          <Icon src={iconNotifCorrect} color="var(--semantic-success)" />
          Approved
        </div>
      ) : (
        <div className="row">
          <Loader />
          {stakingMessages[status]}
        </div>
      )}
      {hasApproval && (
        <div className={classNames("row", { success: isComplete })}>
          {isComplete ? (
            <Icon src={iconNotifCorrect} color="var(--semantic-success)" />
          ) : (
            <Loader />
          )}
          {stakingMessages[status]}
        </div>
      )}
      <style jsx>{`
        .row {
          display: flex;
          align-items: center;
          gap: 4px;
        }
        .success {
          color: var(--semantic-success);
        }
        .loader_container {
          display: flex;
          flex-direction: column;
          gap: 4px;
        }
        .complete {
          animation: collapse 0.5s 0.25s forwards ease-in-out;
        }
        @keyframes collapse {
          to {
            transform: translateY(-20px);
            opacity: 0;
            display: none;
          }
        }
      `}</style>
    </div>
  )
}

export default function Staking({ zoneId }: { zoneId: string }) {
  const [stakeAmount, setStakeAmount] = useState("")
  const [unstakeAmount, setUnstakeAmount] = useState("")
  const [balance, setBalance] = useState(0n)
  const [stakedBalance, setStakedBalance] = useState(0n)

  const [stakingInProgress, setStakingInProgress] = useState(false)
  const [unstakingInProgress, setUnstakingInProgress] = useState(false)
  const { provider, address } = useWallet()

  const [error, setError] = useState<string>("")
  const [lastBalanceMutation, setLastBalanceMutation] = useState(0)
  const [stakingStatus, setStakingStatus] = useState<StakingStatus>(
    StakingStatus.idle
  )
  const [unstakingStatus, setUnstakingStatus] = useState<StakingStatus>(
    StakingStatus.idle
  )

  const contracts = useMemo(() => {
    if (!provider) {
      return null
    }
    const taho = CustomERC20__factory.connect(
      CONTRACT_Taho,
      provider.getSigner()
    )

    const { contract } = getZoneData(zoneId)
    const veTaho = CustomERC20__factory.connect(
      contract.governanceToken,
      provider.getSigner()
    )

    const nodeContract = Node__factory.connect(
      contract.node,
      provider.getSigner()
    )

    return { taho, veTaho, node: nodeContract }
  }, [zoneId, provider])

  const handleStake = async (amount: string) => {
    try {
      if (!provider || !address || !contracts) {
        throw new Error("No provider or address")
      }

      setStakingInProgress(true)

      const targetAmount = userAmountToBigInt(BigInt(parseFloat(amount)))

      const allowance = await contracts.taho
        .allowance(address, contracts.node.address)
        .catch((err) => {
          throw new Error(StakingErrors.PROVIDER_ERROR, { cause: err })
        })

      if (allowance.toBigInt() < targetAmount) {
        setStakingStatus(StakingStatus.waiting_approval_signature)

        const allowanceTx = await contracts.taho
          .approve(contracts.node.address, targetAmount)
          .catch((err) => {
            throw new Error(StakingErrors.APPROVAL_ERROR, { cause: err })
          })

        setStakingStatus(StakingStatus.waiting_approval_tx)

        await provider.waitForTransaction(allowanceTx.hash).catch((err) => {
          throw new Error(StakingErrors.APPROVAL_ERROR, { cause: err })
        })
      }

      setStakingStatus(StakingStatus.waiting_final_signature)

      const tx = await contracts.node.stake(targetAmount).catch((err) => {
        if (/already staking/gi.test(String(err))) {
          throw new Error(StakingErrors.REGION_LIMIT_ERROR, { cause: err })
        }

        throw new Error(StakingErrors.PROVIDER_ERROR, { cause: err })
      })

      setStakingStatus(StakingStatus.waiting_final_tx)
      await provider.waitForTransaction(tx.hash).catch((err) => {
        throw new Error(StakingErrors.STAKING_ERROR, { cause: err })
      })

      setStakingStatus(StakingStatus.complete)
      setStakeAmount("")

      setLastBalanceMutation(Date.now())
    } catch (err) {
      // debugging
      // eslint-disable-next-line no-console
      console.error(err)

      if (err instanceof Error) {
        setError(err.message)
      }
      setStakingStatus(StakingStatus.idle)
    }

    setStakingInProgress(false)
  }

  const handleUnstake = async (amount: string) => {
    try {
      if (!provider || !address || !contracts) {
        throw new Error("No provider or address")
      }

      setUnstakingInProgress(true)

      const targetAmount = userAmountToBigInt(BigInt(parseFloat(amount)))

      const allowance = await contracts.veTaho
        .allowance(address, contracts.node.address)
        .catch((err) => {
          throw new Error(StakingErrors.PROVIDER_ERROR, { cause: err })
        })

      if (allowance.toBigInt() < targetAmount) {
        setUnstakingStatus(StakingStatus.waiting_approval_signature)

        const allowanceTx = await contracts.veTaho
          .approve(contracts.node.address, targetAmount)
          .catch((err) => {
            throw new Error(StakingErrors.APPROVAL_ERROR, { cause: err })
          })

        setUnstakingStatus(StakingStatus.waiting_approval_tx)

        await provider.waitForTransaction(allowanceTx.hash).catch((err) => {
          throw new Error(StakingErrors.APPROVAL_ERROR, { cause: err })
        })
      }

      setUnstakingStatus(StakingStatus.waiting_final_signature)

      const tx = await contracts.node.unstake(targetAmount).catch((err) => {
        if (/stake lock time/gi.test(String(err))) {
          throw new Error(StakingErrors.COOLDOWN_ERROR, { cause: err })
        }

        throw new Error(StakingErrors.PROVIDER_ERROR, { cause: err })
      })

      setUnstakingStatus(StakingStatus.waiting_final_tx)
      await provider.waitForTransaction(tx.hash).catch((err) => {
        throw new Error(StakingErrors.STAKING_ERROR, { cause: err })
      })

      setUnstakingStatus(StakingStatus.complete)
      setUnstakeAmount("")

      setLastBalanceMutation(Date.now())
    } catch (err) {
      // debugging
      // eslint-disable-next-line no-console
      console.error(err)

      if (err instanceof Error) {
        setError(err.message)
      }
      setUnstakingStatus(StakingStatus.idle)
    }

    setUnstakingInProgress(false)
  }

  const invalidStakeAmount =
    !stakeAmount.trim() ||
    Number.isNaN(parseFloat(stakeAmount)) ||
    parseFloat(stakeAmount) <= 0

  const invalidUnstakeAmount =
    !unstakeAmount.trim() ||
    Number.isNaN(parseFloat(unstakeAmount)) ||
    parseFloat(unstakeAmount) <= 0

  useEffect(() => {
    if (!provider || !contracts) {
      return
    }

    contracts.taho
      .balanceOf(address)
      .then((amount) => setBalance(amount.toBigInt()))
    contracts.veTaho
      .balanceOf(address)
      .then((amount) => setStakedBalance(amount.toBigInt()))
  }, [address, provider, contracts, lastBalanceMutation])

  const formattedBalance = new Intl.NumberFormat().format(
    bigIntToUserAmount(balance)
  )
  const formattedStakedBalance = new Intl.NumberFormat().format(
    stakedBalance / 10n ** 18n
  )

  return (
    <div className="staking">
      <div className="stake_control">
        {error && (
          <StakingErrorDialog error={error} onClose={() => setError("")} />
        )}
        <div className="stake_control_header">
          <h3 style={{ color: "var(--trading-in)" }}>Stake</h3>
          <div className="amount_group">
            <div className="label">Wallet balance: {formattedBalance} TAHO</div>
            <SharedInput
              label="Stake amount"
              value={stakeAmount}
              onChange={setStakeAmount}
              validate={(value) => {
                const parsed = parseFloat(value)

                if (
                  !Number.isNaN(parsed) &&
                  userAmountToBigInt(BigInt(parsed)) > balance
                ) {
                  return { error: "Insufficient balance" }
                }

                return { value: parsed }
              }}
              rightComponent={
                <Button
                  type="tertiary"
                  onClick={() =>
                    setStakeAmount(bigIntToUserAmount(balance).toString())
                  }
                  size="medium"
                >
                  Max
                </Button>
              }
            />
          </div>
        </div>
        {stakingStatus !== StakingStatus.idle && (
          <StakingProgress status={stakingStatus} />
        )}
        {(stakingStatus === StakingStatus.idle ||
          stakingStatus === StakingStatus.complete) && (
          <Button
            type="primary"
            size="medium"
            onClick={() => handleStake(stakeAmount)}
            isDisabled={stakingInProgress || invalidStakeAmount}
          >
            Stake $TAHO
          </Button>
        )}
      </div>
      <div className="stake_control">
        <div className="stake_control_header">
          <h3 style={{ color: "var(--trading-out)" }}>Unstake</h3>
          <div className="amount_group">
            <div className="label">
              Staked amount: {formattedStakedBalance} TAHO
            </div>
            <SharedInput
              label="Unstake amount"
              value={unstakeAmount}
              onChange={setUnstakeAmount}
              validate={(value) => {
                const parsed = parseFloat(value)

                if (
                  !Number.isNaN(parsed) &&
                  userAmountToBigInt(BigInt(parsed)) > stakedBalance
                ) {
                  return { error: "Insufficient balance" }
                }

                return { value: parsed }
              }}
              rightComponent={
                <Button
                  type="tertiary"
                  size="medium"
                  onClick={() =>
                    setUnstakeAmount(
                      bigIntToUserAmount(stakedBalance).toString()
                    )
                  }
                >
                  Max
                </Button>
              }
            />
          </div>
        </div>
        {unstakingStatus !== StakingStatus.idle && (
          <StakingProgress status={unstakingStatus} />
        )}
        {(unstakingStatus === StakingStatus.idle ||
          unstakingStatus === StakingStatus.complete) && (
          <Button
            type="primary"
            size="medium"
            onClick={() => handleUnstake(unstakeAmount)}
            isDisabled={unstakingInProgress || invalidUnstakeAmount}
          >
            Unstake $TAHO
          </Button>
        )}
      </div>

      <style jsx>{`
        .staking {
          display: flex;
          gap: 32px;
          padding: 24px 0;
        }
        .stake_control {
          display: flex;
          min-height: 280px;
          padding: 16px 24px 24px 24px;
          flex-direction: column;
          gap: 14px;
          border-radius: 8px;
          background: var(--primary-p1-40);
        }

        .label {
          font: var(--text-label);
          color: var(--secondary-s1-70);
        }
      `}</style>
    </div>
  )
}
