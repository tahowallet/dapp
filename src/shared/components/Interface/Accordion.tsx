import classNames from "classnames"
import React, { CSSProperties, useEffect, useState } from "react"
import arrowIcon from "shared/assets/icons/s/arrow-down.svg"
import Icon from "../Media/Icon"

type AccordionType = "default" | "frame" | "challenge" | "panel"

export type AccordionOutsideActions = {
  openedFromOutside?: boolean
  closeOpenedFromOutside?: () => void
  extraExpand?: boolean // close / open accordion based on another action
}

export type CommonAccordion = {
  title: string
  children: React.ReactNode
  isDisabled?: boolean
} & AccordionOutsideActions

type AccordionProps = CommonAccordion & {
  icon?: string
  iconColor?: string
  type?: AccordionType
  onClick?: () => void
  style?: CSSProperties
  hasInteractiveChildren?: boolean
}

function getArrowColor(type: AccordionType, isDisabled: boolean): string {
  let arrowColor: string

  switch (type) {
    case "challenge":
      arrowColor = "var(--primary-p1-100)"
      break
    case "panel":
      arrowColor = "var(--secondary-s1-90)"
      break
    default:
      arrowColor = "var(--secondary-s1-80)"
      break
  }

  if (isDisabled) {
    arrowColor = "var(--secondary-s1-60)"
  }

  return arrowColor
}

export default function Accordion({
  children,
  title,
  icon,
  iconColor,
  type = "default",
  onClick,
  openedFromOutside,
  closeOpenedFromOutside,
  style,
  isDisabled = false,
  hasInteractiveChildren = false,
  extraExpand,
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  useEffect(() => {
    if (openedFromOutside) {
      setIsOpen(true)
    }
  }, [openedFromOutside])

  useEffect(() => {
    // If accordion is opened and there is additional trigger is false, close the accordion
    if (isOpen && extraExpand === false) {
      setIsOpen(false)
    }
  }, [isOpen, extraExpand])

  useEffect(() => {
    if (!isOpen) closeOpenedFromOutside?.()
  }, [isOpen, closeOpenedFromOutside])

  const toggle = () => {
    if (isDisabled) return

    setIsOpen(!isOpen)

    if (onClick) onClick()
  }

  const arrowColor = getArrowColor(type, isDisabled)

  const preventToggle = (event: React.MouseEvent) => {
    if (hasInteractiveChildren) {
      event.stopPropagation()
    }
  }

  return (
    <>
      <div
        role="button"
        tabIndex={0}
        onKeyDown={(e) => e.key === "Enter" && toggle()}
        onClick={toggle}
        className={classNames("accordion column", {
          [type]: true,
          open: isOpen,
          disabled: isDisabled,
        })}
        style={style}
      >
        <div className="accordion_title row">
          <div className="title row">
            {icon && (
              <Icon src={icon} color={iconColor || "var(--secondary-s1-80)"} />
            )}
            {title}
          </div>
          <div className="accordion_icon">
            <Icon src={arrowIcon} color={arrowColor} />
          </div>
        </div>
        <div
          role="button"
          tabIndex={0}
          onKeyDown={(e) =>
            e.key === "Enter" && !hasInteractiveChildren && toggle()
          }
          className={classNames("accordion_content", {
            default_mouse: hasInteractiveChildren,
          })}
          onClick={preventToggle}
        >
          {children}
        </div>
      </div>
      <style jsx>
        {`
          .accordion {
            border-radius: 4px;
            padding: 8px;
            cursor: pointer;
          }

          .default {
            background: var(--secondary-s1-20);
            transition: background 0.3s ease-in-out;
          }
          .default:hover {
            background: var(--secondary-s1-40);
          }
          .default.open {
            background: var(--primary-p1-100);
          }

          .frame {
            border-radius: 8px;
            padding: 16px 20px 16px 12px;
            border: 1px solid var(--secondary-s1-20);
          }
          .frame.open {
            border: 1px solid var(--secondary-s1-50);
          }

          .challenge {
            border-radius: 8px;
            background: var(--trading-in);
            color: var(--primary-p1-100);
            padding: 0;
            border: 1px solid var(--trading-in);
          }
          .challenge .accordion_title {
            font-size: 18px;
            padding: 16px 24px;
          }
          .challenge .accordion_content {
            border-radius: 0px 0px 8px 8px;
            background: var(--primary-p1-100);
            color: var(--secondary-s1-80);
            padding: 0 24px;
            font-size: 18px;
          }
          .challenge.open .accordion_content {
            padding: 16px 24px;
          }

          .accordion_content.default_mouse {
            cursor: auto;
          }

          .panel {
            padding: 0;
            border-radius: 0 8px 8px 0;
            background: var(--primary-p1-100);
            backdrop-filter: blur(26px);
            transition: background 0.2s ease-in-out;
          }
          .panel .accordion_title {
            padding: 32px;
            color: var(--secondary-s1-90);
            border-bottom-right-radius: 8px;
          }
          .panel.disabled .accordion_title {
            color: var(--secondary-s1-60);
            cursor: default;
          }
          .panel.open,
          .panel:not(.disabled):hover {
            background: rgba(6, 63, 61, 0.9);
          }

          .accordion_title {
            justify-content: space-between;
            align-items: center;
          }
          .title {
            align-items: center;
            gap: 8px;
          }
          .accordion_content {
            max-height: 0;
            overflow: hidden;
            padding-top: 0;
            transition: max-height 0.3s ease-in-out, padding 0.3s ease-in-out;
          }
          .accordion.open .accordion_content {
            max-height: 500px;
            padding-top: 16px;
          }
          .accordion_icon {
            transition: transform 0.3s ease-in-out;
          }
          .accordion.open .accordion_icon {
            transform: rotate(180deg);
          }
        `}
      </style>
    </>
  )
}
