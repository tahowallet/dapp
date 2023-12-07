import React from "react"
import realmPin from "shared/assets/realm-pin.svg"
import Avatar from "../Media/Avatar"

export default function RealmPin() {
  return (
    <>
      <div className="realm_pin">
        <img src={realmPin} height={92} width={108} alt="Realm Pin" />
        <Avatar
          width="58px"
          style={{ position: "absolute", left: 8, top: 7 }}
        />
      </div>
      <style jsx>{`
        .realm_pin {
          position: absolute;
          z-index: 2;
          left: 190px;
          top: 30px;
        }
      `}</style>
    </>
  )
}
