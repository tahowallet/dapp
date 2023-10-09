import React from "react"
import realmPin from "shared/assets/realm-pin.svg"

export default function RealmPin({ avatar }: { avatar: string }) {
  return (
    <>
      <div className="realm_pin">
        <img src={realmPin} height={86} width={74} alt="Realm Pin" />
        <img
          src={avatar}
          height={60}
          width={60}
          alt="Avatar"
          className="realm_pin_avatar"
        />
      </div>
      <style jsx>{`
        .realm_pin {
          position: absolute;
          z-index: 2;
          left: 190px;
          top: 30px;
        }
        .realm_pin_avatar {
          position: absolute;
          border-radius: 50%;
          overflow: hidden;
          left: 7px;
          top: 6px;
        }
      `}</style>
    </>
  )
}
