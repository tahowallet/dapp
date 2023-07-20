import React from "react"

export default function IconLink({
  href,
  iconWidth,
  iconHeight,
  iconSrc,
}: {
  href: string
  iconWidth: string
  iconHeight: string
  iconSrc: string
}) {
  return (
    <>
      <a href={href} target="_blank" className="link" rel="noreferrer">
        <div className="link_icon" />
      </a>
      <style jsx>{`
        .link {
          display: block;
          flex: 0 0 auto;
        }

        .link_icon {
          width: ${iconWidth};
          height: ${iconHeight ?? iconWidth};
          -webkit-mask-image: url(${iconSrc});
          mask-image: url(${iconSrc});
          -webkit-mask-size: cover;
          mask-size: cover;
          background-color: var(--off-white);
        }

        .link:hover .link_icon {
          background-color: var(--off-white); // TODO
        }

        .link_icon:active .link_icon {
          background-color: var(--off-white); // TODO
        }
      `}</style>
    </>
  )
}
