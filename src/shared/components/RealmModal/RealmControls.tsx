import React from "react"

export function PrevBtn({ onClick, style }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={style}
    >
      <rect
        x={80}
        y={80}
        width={80}
        height={80}
        rx={40}
        transform="rotate(-180 80 80)"
        fill="#E4EEEE"
        fillOpacity={0.1}
      />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M38.067 29.933l-8.014 8.015a2.667 2.667 0 000 3.77l8.062 8.063.01.01 1.415-1.414-.011-.01L32.162 41h18.505v-2H31.829l7.652-7.653-1.414-1.414z"
        fill="currentColor"
        fillOpacity="var(--fill-opacity)"
      />
      <rect
        className="circle_stroke"
        x={79.5}
        y={79.5}
        width={79}
        height={79}
        rx={39.5}
        transform="rotate(-180 79.5 79.5)"
        stroke="currentColor"
        strokeOpacity="var(--stroke-opacity)"
      />
      <style jsx>
        {`
          svg {
            color: #e4eeee;
            --fill-opacity: 0.5;
            --stroke-opacity: 0.3;
          }
          svg * {
            transition: all 0.3s ease-out;
          }

          svg:hover {
            cursor: pointer;
            color: var(--semantic-success);
            --fill-opacity: 1;
            --stroke-opacity: 1;
          }
        `}
      </style>
    </svg>
  )
}

export function NextBtn({ onClick, style }: React.SVGProps<SVGSVGElement>) {
  return (
    <svg
      width={80}
      height={80}
      viewBox="0 0 80 80"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      onClick={onClick}
      style={style}
    >
      <rect width={80} height={80} rx={40} fill="#E4EEEE" fillOpacity={0.1} />
      <path
        fillRule="evenodd"
        clipRule="evenodd"
        d="M41.933 50.067l8.014-8.015a2.667 2.667 0 000-3.77l-8.062-8.063-.01-.01-1.415 1.414.011.01L47.838 39H29.333v2h18.838l-7.652 7.653 1.414 1.414z"
        fill="currentColor"
        fillOpacity="var(--fill-opacity)"
      />
      <rect
        x={0.5}
        y={0.5}
        width={79}
        height={79}
        rx={39.5}
        stroke="currentColor"
        strokeOpacity="var(--stroke-opacity)"
      />
      <style jsx>
        {`
          svg {
            color: #e4eeee;
            --fill-opacity: 0.5;
            --stroke-opacity: 0.3;
          }
          svg * {
            transition: all 0.3s ease-out;
          }

          svg:hover {
            cursor: pointer;
            color: var(--semantic-success);
            --fill-opacity: 1;
            --stroke-opacity: 1;
          }
        `}
      </style>
    </svg>
  )
}
