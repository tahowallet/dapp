import React from "react"
import Popup from "shared/components/Dialogs/Popup"
import cookiesIcon from "shared/assets/icons/cookies.svg"
import newTabIcon from "shared/assets/icons/s/new-tab.svg"
import { LINKS, LOCAL_STORAGE_COOKIES } from "shared/constants"
import { useLocalStorageChange } from "shared/hooks"
import Icon from "../Media/Icon"
import Button from "../Interface/Button"

export default function PrivacyPolicy() {
  const { value, updateStorage } = useLocalStorageChange<boolean>(
    LOCAL_STORAGE_COOKIES
  )

  const closePopup = () => updateStorage(true)

  return (
    <>
      <Popup
        isVisible={value === null}
        close={closePopup}
        bottomPosition={16}
        leftPosition={19}
        width={419}
        hasPointer={false}
        style={{ zIndex: "var(--z-assistant-icon)" }}
      >
        <div className="header row_center">
          <Icon src={cookiesIcon} type="image" height="29px" width="29px" />
          <span>We respect your privacy</span>
        </div>
        <p className="content">
          Continuing to use the website means you are accepting our cookie
          policy.
        </p>
        <div className="row_center" style={{ gap: 38 }}>
          <Button type="secondary" onClick={closePopup}>
            OK
          </Button>
          <a
            href={LINKS.PRIVACY_POLICY}
            title="Privacy policy"
            className="privacy_link row_center"
            target="_blank"
            rel="noreferrer"
          >
            <span>Privacy policy</span>
            <Icon src={newTabIcon} type="image" height="16px" width="16px" />
          </a>
        </div>
      </Popup>
      <style jsx>{`
        .header {
          margin-bottom: 16px;
          gap: 8px;
        }
        .header span {
          font-size: 20px;
          color: var(--secondary-s1-90);
        }
        .content {
          color: var(--secondary-s1-70);
          margin-bottom: 16px;
        }
        .privacy_link {
          font-weight: 600;
          gap: 8px;
          color: var(--primary-p2-100);
        }
      `}</style>
    </>
  )
}
