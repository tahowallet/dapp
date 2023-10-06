import React from "react"
import Icon from "shared/components/Icon"
import realmPointer from "shared/assets/realm-pointer.png"
import AssistantContent, { AssistantContentProps } from "."

export default function AssistantWelcome({
  isVisible,
  close,
}: AssistantContentProps) {
  return (
    <>
      <AssistantContent isVisible={isVisible} close={close}>
        <div className="header">Welcome to The Island, Nomad!</div>
        <p className="paragraph">My name is Scout and I&apos;m here to help!</p>
        <p className="paragraph">
          There are 5 realms for you to explore and choose from
        </p>
        <div className="hint row_center">
          <Icon src={realmPointer} type="image" height="37px" width="30px" />
          <p>
            Start exploring by hovering
            <br /> over the 5 realms
          </p>
        </div>
      </AssistantContent>
      <style jsx>{`
        .header {
          font-size: 36px;
          line-height: 40px;
          letter-spacing: 0.72px;
          font-family: var(--serif);
          color: var(--secondary-s1-100);
          font-weight: 500;
          margin-bottom: 8px;
        }
        .paragraph {
          color: var(--secondary-s1-80);
          margin-bottom: 24px;
        }
        .hint p {
          color: var(--primary-p2-100);
          font-size: 22px;
          font-weight: 600;
          line-height: 32px;
          flex: 1;
          padding-left: 13px;
          white-space: nowrap;
        }
      `}</style>
    </>
  )
}
