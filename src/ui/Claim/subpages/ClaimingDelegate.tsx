/**
 * TODO: this page is removed from the Claim flow but we might want to add some components back
 * in a different place
 */
import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import classNames from "classnames"
import Button from "shared/components/Interface/Button"
import Icon from "shared/components/Media/Icon"
import iconNotifCorrect from "shared/assets/icons/s/notif-correct.svg"
import iconSearch from "shared/assets/icons/m/search.svg"
import { ROUTES } from "shared/constants"

type Delegate = {
  name: string
  address: string
  votes?: number
  avatar?: string
  description: string
}

type DelegateItemProps = Delegate & {
  isSelected: boolean
  onClick: () => void
}

const delegatesMock: Delegate[] = [
  {
    name: "East 1",
    address: "eastban1.eth",
    votes: 432,
    avatar:
      "https://i.guim.co.uk/img/media/ef8492feb3715ed4de705727d9f513c168a8b196/37_0_1125_675/master/1125.jpg?width=1200&height=1200&quality=85&auto=format&fit=crop&s=d456a2af571d980d8b2985472c262b31",
    description:
      "Daos and open source code are two sides of the same coin for decentralized crypto projects. Helping them get organized...",
  },
  {
    name: "East 2",
    address: "eastban2.eth",
    votes: 432,
    description:
      "Daos and open source code are two sides of the same coin for decentralized crypto projects. Helping them get organized...",
  },
  {
    name: "East 3",
    address: "eastban3.eth",
    votes: 432,
    description:
      "Daos and open source code are two sides of the same coin for decentralized crypto projects. Helping them get organized...",
  },
]

function DelegateItem({
  name,
  address,
  votes = 0,
  avatar,
  description,
  isSelected,
  onClick,
}: DelegateItemProps) {
  return (
    <>
      <div
        className={classNames("delegate_item column", { selected: isSelected })}
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onClick}
      >
        <div className="delegate_selected">
          <Icon
            src={iconNotifCorrect}
            color={isSelected ? "var(--trading-in)" : "var(--secondary-s1-40)"}
          />
        </div>
        <div className="delegate_header row">
          <div className="delegate_avatar" />
          <div>
            <div className="delegate_name">{name}</div>
            <div className="delegate_sub">
              {address} ({votes} votes)
            </div>
          </div>
        </div>
        <div className="delegate_description">{description}</div>
        <div className="delegate_read">Read full pitch</div>
      </div>
      <style jsx>{`
        .delegate_item {
          width: 344px;
          height: 167px;
          border-radius: 8px;
          padding: 16px;
          overflow: hidden;
          border: 1px solid var(--secondary-s1-10);
          gap: 16px;
          position: relative;
          cursor: pointer;
          background: transparent;
          transition: background 0.1s ease-in;
        }
        .delegate_item:hover,
        .delegate_item.selected {
          background: var(--primary-p1-100);
          border-color: var(--secondary-s1-60);
        }
        .delegate_item.selected {
          border-color: var(--trading-in);
        }
        .delegate_avatar {
          width: 48px;
          height: 48px;
          border-radius: 100%;
          flex-shrink: 0;
          background: url(${avatar}) no-repeat center / contain,
            var(--secondary-s1-30);
        }
        .delegate_header {
          gap: 16px;
        }
        .delegate_name {
          color: var(--secondary-s1-100);
        }
        .delegate_sub {
          color: var(--secondary-s1-40);
          font-size: 16px;
        }
        .delegate_description {
          color: var(--secondary-s1-60);
        }
        .delegate_selected {
          position: absolute;
          top: 16px;
          right: 16px;
          opacity: 0;
          transition: opacity 0.1s ease-in;
        }
        .delegate_item:hover .delegate_selected,
        .delegate_item.selected .delegate_selected {
          opacity: 1;
        }
        .delegate_read {
          position: absolute;
          bottom: 0;
          width: 100%;
          padding: 12px 27px 12px 16px;
          color: var(--trading-in);
          background: linear-gradient(
            180deg,
            rgba(13, 35, 33, 0) 0%,
            #0d2321 68.75%
          );
          opacity: 0;
          transition: opacity 0.1s ease-in;
        }
        .delegate_item:hover .delegate_read {
          opacity: 1;
        }
      `}</style>
    </>
  )
}

export default function ClaimingDelegate() {
  const location = useHistory()
  const [selectedDelegate, setSelectedDelegate] = useState<Delegate | null>(
    null
  )

  return (
    <>
      <div className="delegate_container column">
        <div className="delegate_description column">
          <h1>Delegate your voting power</h1>
          <p>
            Delegating your voting power increases the chance that you are
            represented in the DAO at every turn and on every vote that comes
            up. Choose a delegate that is aligned with your values and your
            expectations. Remember that you can change delegates at any time and
            you are not giving away any assets.
          </p>
        </div>

        <div className="searchbox row">
          <input
            type="text"
            placeholder="Find delegate (0xAddress, ENS or UNS)"
          />
          <Icon src={iconSearch} width="24px" />
        </div>

        <div className="delegates_list row">
          {delegatesMock.map((delegate) => (
            <DelegateItem
              key={delegate.address}
              name={delegate.name}
              address={delegate.address}
              votes={delegate.votes}
              avatar={delegate.avatar}
              description={delegate.description}
              isSelected={selectedDelegate?.address === delegate.address}
              onClick={() => setSelectedDelegate(delegate)}
            />
          ))}
        </div>

        <div className="button_container row">
          <Button
            onClick={() => location.push(ROUTES.CLAIM.DETAILS_SIGN)}
            type="primary"
            size="large"
          >
            Select delegate
          </Button>
          <Button type="tertiary" size="large">
            Represent yourself
          </Button>
        </div>
      </div>
      <style jsx>{`
        .delegate_container {
          gap: 40px;
        }
        .delegate_description {
          gap: 8px;
        }
        .button_container {
          gap: 24px;
        }
        .searchbox {
          align-items: center;
          border-radius: 4px;
          border: 1.5px solid var(--secondary-s1-40);
          padding: 0 12px;
        }
        .searchbox input {
          padding: 12px 4px;
          flex-grow: 1;
          background: transparent;
          border: none;
          font-family: var(--sans);
          font-size: 18px;
          font-style: normal;
          font-weight: 500;
          line-height: 24px;
          color: var(--secondary-s1-80);
        }
        .searchbox input::placeholder {
          color: var(--secondary-s1-80);
        }
        .delegates_list {
          flex-wrap: wrap;
          justify-content: space-between;
          gap: 32px;
        }
      `}</style>
    </>
  )
}
