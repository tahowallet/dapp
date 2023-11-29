import React, { CSSProperties } from "react"
import {
  selectWalletAvatar,
  selectWalletAvatarType,
  useDappSelector,
} from "redux-state"

type AvatarProps = {
  width: string
  style?: CSSProperties
}

export default function Avatar({ width, style }: AvatarProps) {
  const avatar = useDappSelector(selectWalletAvatar)
  const avatarType = useDappSelector(selectWalletAvatarType)

  return (
    <>
      <div className="avatar" style={style}>
        {avatarType !== "video/mp4" ? (
          <div className="avatar_image" />
        ) : (
          <video src={avatar} autoPlay muted loop />
        )}
      </div>
      <style jsx>{`
        .avatar {
          width: ${width};
          height: ${width};
          border-radius: 50%;
        }

        .avatar > * {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 50%;
        }

        .avatar_image {
          background: url("${avatar}");
          background-size: cover;
        }
      `}</style>
    </>
  )
}
