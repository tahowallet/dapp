import React from "react"
import { useConnect } from "shared/hooks"
import TahoAmount from "shared/components/Interface/TahoAmount"
import Button from "shared/components/Interface/Button"
import Icon from "shared/components/Media/Icon"
import Modal from "shared/components/Dialogs/Modal"
import eyeIcon from "shared/assets/icons/m/eye.svg"
import twitterIcon from "shared/assets/icons/twitter.svg"
import copyIcon from "shared/assets/icons/s/copy.svg"
import {
  useDappSelector,
  selectWalletAddress,
  selectWalletTruncatedAddress,
} from "redux-state"
import ReferralsTips from "./ReferralsTips"
import ReferralsLeaderboard from "./ReferralsLeaderboard"

export default function Referrals() {
  const { isConnected, connect } = useConnect()
  const address = useDappSelector(selectWalletAddress)
  const truncatedAddress = useDappSelector(selectWalletTruncatedAddress)

  const link = `taho.xyz/referral/${address}`
  const truncatedLink = `taho.xyz/referral/${truncatedAddress || "0xABC...XYZ"}`

  const copyToClipboard = () => {
    navigator?.clipboard?.writeText(link)
  }

  return (
    <Modal.ScrollableContainer topSpacing="176px" type="island-without-overlay">
      <Modal.AnimatedContent>
        <div className="referrals_container column_center">
          <div className="referrals_header">
            <h1>Refer & get 5% Bonus</h1>
            <div className="referrals_subheader">
              Each time someone uses your bonus link, you&apos;ll get 5% of all
              the TAHO they claim.
            </div>
          </div>

          <div className="referrals_link column">
            <div className="referrals_link_text">
              Your bonus link:
              <span className="link"> {truncatedLink}</span>
            </div>
            <div className="referrals_link_buttons row">
              {isConnected ? (
                <>
                  <Button
                    type="twitter"
                    size="medium"
                    iconSrc={twitterIcon}
                    iconPosition="left"
                    onClick={() => {}}
                  >
                    Share on Twitter
                  </Button>
                  <Button
                    type="primary"
                    size="medium"
                    iconSrc={copyIcon}
                    iconPosition="left"
                    onClick={copyToClipboard}
                  >
                    Copy link
                  </Button>
                </>
              ) : (
                <Button type="primary" size="medium" onClick={() => connect()}>
                  Connect wallet
                </Button>
              )}
            </div>
          </div>
          <div className="referrals_link_subtext row">
            <Icon src={eyeIcon} width="24px" color="var(--secondary-s1-70)" />
            Address will be visible in the link
          </div>
          <div className="referrals_received">
            <div className="referrals_background" />
            <div className="referrals_tip_header">
              Total bonus received so far
            </div>
            <TahoAmount amount={0n} size="small" hasBackground />
            {isConnected ? <ReferralsLeaderboard /> : <ReferralsTips />}
          </div>
        </div>
        <style jsx>{`
          .referrals_container {
            width: 812px;
            margin: 40px;
            gap: 40px;
            text-align: center;
          }
          .referrals_header {
            width: 500px;
          }
          .referrals_header h1 {
            font: var(--text-h1);
            font-size: 52px;
            letter-spacing: 1px;
            color: var(--secondary-s1-100);
          }
          .referrals_subheader {
            color: var(--secondary-s1-70);
            margin: 8px 40px 0;
          }
          .referrals_link {
            align-items: center;
            position: relative;
          }
          .referrals_link_text {
            border-radius: 16px;
            padding: 24px 24px 44px;
            background: var(--primary-p1-100);
            color: var(--secondary-s1-60);
          }
          .referrals_link_text .link {
            color: var(--secondary-s1-100);
          }
          .referrals_link_subtext {
            align-items: center;
            gap: 8px;
            color: var(--secondary-s1-70);
          }
          .referrals_link_buttons {
            position: absolute;
            bottom: -24px;
            gap: 16px;
          }
          .referrals_received {
            padding-top: 32px;
            position: relative;
            width: 428px;
            text-align: left;
          }
          .referrals_tip_header {
            color: var(--secondary-s1-60);
            text-align: center;
            margin-bottom: 16px;
          }
          .referrals_background {
            position: absolute;
            top: 0;
            left: -232px;
            width: 892px;
            height: calc(100% + 40px);
            background: var(--primary-p1-100);
            border-radius: 0 0 16px 16px;
            opacity: 0.7;
            z-index: -1;
          }
        `}</style>
      </Modal.AnimatedContent>
    </Modal.ScrollableContainer>
  )
}
