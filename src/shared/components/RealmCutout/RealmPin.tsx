import React from "react"
import realmPin from "shared/assets/realm-pin.svg"

export default function RealmPin({ avatar }: { avatar: string }) {
  return (
    <>
      <div className="realm_pin">
        <img
          src={avatar}
          height={60}
          width={60}
          alt="Avatar"
          className="realm_pin_avatar"
        />
        <img src={realmPin} height={92} width={108} alt="Realm Pin" />
      </div>
      <style jsx>{`
        .realm_pin {
          position: absolute;
          z-index: 2;
          left: 190px;
          top: 30px;
          height: 89px;
        }
        .realm_pin_avatar {
          position: absolute;
          height: 60px;
          width: 60px;
          border-radius: 50%;
          overflow: hidden;
          left: 8px;
          top: 7px;
        }
      `}</style>
    </>
  )
}
