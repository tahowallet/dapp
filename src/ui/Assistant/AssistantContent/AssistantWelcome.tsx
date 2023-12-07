import React from "react"
import Icon from "shared/components/Media/Icon"
import realmPointer from "shared/assets/realm-pointer.png"
import { useAssistant } from "shared/hooks"
import { selectNumberOfRealms, useDappSelector } from "redux-state"
import AssistantContent from "."

export default function AssistantWelcome() {
  const { updateAssistant, assistantVisible } = useAssistant()
  const numberOfRealms = useDappSelector(selectNumberOfRealms)

  return (
    <>
      <AssistantContent
        isVisible={assistantVisible("welcome")}
        style={{ width: 620 }}
        close={() => updateAssistant({ visible: false, type: "default" })}
      >
        <div className="header">Welcome to Subscape, Nomad</div>
        <p className="paragraph">We&apos;ve been waiting for you...</p>
        <p className="paragraph">
          In the &apos;scape, Realms compete for your allegiance. And
          you&apos;re free to become a Citizen wherever you wish.
        </p>
        <div className="hint row_center">
          <Icon src={realmPointer} type="image" height="37px" width="30px" />
          <p>
            <strong>
              Start exploring by hovering over our {numberOfRealms} Beta Realms
            </strong>
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
