import classNames from "classnames"
import React, { useState } from "react"
import arrowIcon from "../assets/icons/s/arrow-down.svg"
import Icon from "./Icon"

type AccordionProps = {
  title: string
  children: React.ReactNode
  icon?: string
  iconColor?: string
  type?: "default" | "frame"
}

export default function Accordion({
  children,
  title,
  icon,
  iconColor,
  type = "default",
}: AccordionProps) {
  const [isOpen, setIsOpen] = useState(false)

  const toggle = () => setIsOpen(!isOpen)

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
        })}
      >
        <div className="accordion_title row">
          <div className="title row">
            {icon && (
              <Icon src={icon} color={iconColor || "var(--secondary-s1-80)"} />
            )}
            {title}
          </div>
          <div className="accordion_icon">
            <Icon src={arrowIcon} color="var(--secondary-s1-80)" />
          </div>
        </div>
        <div className="accordion_content">{children}</div>
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
