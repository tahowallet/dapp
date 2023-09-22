import React from "react"
import regionPin from "shared/assets/region-pin.svg"

export default function RegionPin({ avatar }: { avatar: string }) {
  return (
    <>
      <div className="region_pin">
        <img
          src={avatar}
          height={60}
          width={60}
          alt="Avatar"
          className="region_pin_avatar"
        />
        <img src={regionPin} height={92} width={108} alt="Region Pin" />
      </div>
      <style jsx>{`
        .region_pin {
          position: absolute;
          z-index: 2;
          left: 190px;
          top: 30px;
          height: 89px;
        }
        .region_pin_avatar {
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
