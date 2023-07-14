import React from "react"

export default function IconLink({
  href,
  icon,
}: {
  href: string
  icon: {
    width: string
    height: string
    src: string
  }
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
          margin: 0 1rem;
        }

        .link_icon {
          width: ${icon.width};
          height: ${icon.height ?? icon.width};
          -webkit-mask-image: url(${icon.src});
          mask-image: url(${icon.src});
          -webkit-mask-size: cover;
          mask-size: cover;
          background-color: var(--offWhite);
        }

        .link:hover .link_icon {
          background-color: var(--offWhite); // TODO
        }

        .link_icon:active .link_icon {
          background-color: var(--offWhite); // TODO
        }
      `}</style>
    </>
  )
}
