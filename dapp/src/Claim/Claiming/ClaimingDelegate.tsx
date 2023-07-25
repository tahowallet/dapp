import React, { useState } from "react"
import { useHistory } from "react-router-dom"
import Button from "../../shared/Button"
import Icon from "../../shared/Icon"
import iconNorifCorrect from "../../shared/assets/icons/s/notif-correct.svg"
import iconSearch from "../../shared/assets/icons/m/search.svg"

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
    name: "East",
    address: "eastban.eth",
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
        className="delegate_item"
        role="button"
        tabIndex={0}
        onClick={onClick}
        onKeyDown={onClick}
      >
        {isSelected && (
          <div className="delegate_selected">
            <Icon src={iconNorifCorrect} />
          </div>
        )}
        <div className="delegate_header">
          <div className="delegate_avatar" />
          <div>
            <div className="delegate_name">{name}</div>
            <div className="delegate_sub">
              {address} ({votes} votes)
            </div>
          </div>
        </div>
        <div className="delegate_description">{description}</div>
      </div>
      <style jsx>{`
        .delegate_avatar {
          width: 48px;
          height: 48px;
          border-radius: 100%;
          flex-shrink: 0;
          background: url(${avatar}) no-repeat center center,
            var(--secondary-s1-100);
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
      <h1>Delegate your voting power</h1>
      <p>
        Delegating your voting power increases the chance that you are
        represented in the DAO at every turn and on every vote that comes up.
        Choose a delegate that is aligned with your values and your
        expectations. Remember that you can change delegates at any time and you
        are not giving away any assets.
      </p>

      <div className="searchbox">
        <input
          type="text"
          placeholder="Find delegate (0xAddress, ENS or UNS)"
        />
        <Icon src={iconSearch} width="24px" />
      </div>

      <div className="delegates_list">
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

      <div className="button_container">
        <Button
          onClick={() => location.replace("/claim/claiming/sign")}
          type="primary"
          size="large"
        >
          Select delegate
        </Button>
        <Button type="tertiary" size="large">
          Represent yourself
        </Button>
      </div>
    </>
  )
}
