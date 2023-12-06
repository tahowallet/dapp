import React from "react"

type RealmDetailsPlaceholderProps = {
  title: string
  imageSrc: string
}

export default function RealmDetailsPlaceholder({
  title,
  imageSrc,
}: RealmDetailsPlaceholderProps) {
  return (
    <>
      <div className="placeholder_container center">
        <img className="placeholder_image" src={imageSrc} alt="placeholder" />
        <h1 className="placeholder_title">{title}</h1>
      </div>
      <style jsx>{`
        .placeholder_container {
          width: 100%;
          height: auto;
          padding: 16px 24px 24px 24px;
          gap: 14px;
          margin: 24px 0;
          border-radius: 24px;
          background: var(--primary-p1-40);
          height: 373px;
        }
        .placeholder_title {
          position: absolute;
          margin: 0 auto;
          color: var(--secondary-s-1100, #e4eeee);
          font: var(--text-h1);
          text-align: center;
          letter-spacing: 0.84px;
          white-space: pre-wrap;
        }
        .placeholder_image {
          width: 100%;
          height: 100%;
          object-fit: contain;
        }
      `}</style>
    </>
  )
}
