import React from "react"
import { useAssistant } from "shared/hooks"
import { LINKS } from "shared/constants"
import AssistantContent from "."

export default function AssistantJoin() {
  const { updateAssistant, assistantVisible } = useAssistant()

  return (
    <>
      <AssistantContent
        isVisible={assistantVisible("default")}
        close={() => updateAssistant({ visible: false, type: "default" })}
      >
        <div className="header">Hang in there, Nomad</div>
        <p className="paragraph">
          Have feedback?
          <br />
          <a
            href={LINKS.FEEDBACK}
            className="link"
            target="blank"
            rel="noreferrer"
          >
            Let us know
          </a>{" "}
          so we can act on it.
        </p>
        <p className="paragraph">
          Have a question?
          <br />
          Check out the{" "}
          <a
            href={LINKS.RULEBOOK}
            className="link"
            target="blank"
            rel="noreferrer"
          >
            Rulebook
          </a>
          .
        </p>
        <p className="paragraph">
          Want to chat?{" "}
          <a
            href={LINKS.DISCORD}
            className="link"
            target="blank"
            rel="noreferrer"
          >
            Join us on Discord
          </a>
          .
        </p>
      </AssistantContent>
      <style jsx>{`
        .header {
          font-size: 22px;
          line-height: 32px;
          color: var(--secondary-s1-100);
          font-weight: 600;
          margin-bottom: 8px;
        }
        .paragraph {
          color: var(--secondary-s1-80);
          margin-bottom: 16px;
        }
        .link {
          color: var(--primary-p2-100);
          transition: color 250ms ease;
          text-decoration: underline;
        }
        .link:hover {
          color: var(--primary-p2-80);
        }
      `}</style>
    </>
  )
}
