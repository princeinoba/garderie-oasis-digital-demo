import { ImageResponse } from "next/og";

export const size = { width: 512, height: 512 };
export const contentType = "image/png";

export default function Icon() {
  return new ImageResponse(
    <div
      style={{
        width: "100%",
        height: "100%",
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        borderRadius: 108,
        background: "#fbf7ee",
      }}
    >
      <svg width="390" height="364" viewBox="0 0 120 112">
        <g stroke="#dfa019" strokeWidth="3.4" strokeLinecap="round">
          <path d="M60 3v13" />
          <path d="m37 9 6 13" />
          <path d="m18 23 11 9" />
          <path d="m8 45 16 4" />
          <path d="m83 9-6 13" />
          <path d="m102 23-11 9" />
          <path d="m112 45-16 4" />
        </g>
        <circle fill="#df7858" cx="8" cy="59" r="3" />
        <circle fill="#df7858" cx="112" cy="59" r="3" />
        <circle fill="#e9aa29" cx="60" cy="51" r="27" />
        <path fill="#153f2f" d="M59 104C41 95 21 81 17 58c18 4 34 15 43 33 2 4 2 8-1 13Z" />
        <path fill="#153f2f" d="M61 104c18-9 38-23 42-46-18 4-34 15-43 33-2 4-2 8 1 13Z" />
        <path fill="#82936b" d="M60 104C48 88 46 69 60 54c14 15 12 34 0 50Z" />
        <g
          fill="none"
          stroke="#f9f3e7"
          strokeWidth="1.6"
          strokeLinecap="round"
          strokeLinejoin="round"
        >
          <path d="M58 101C48 83 35 70 21 62M45 83l-13-2M50 91l-7-15" />
          <path d="M62 101c10-18 23-31 37-39M75 83l13-2M70 91l7-15" />
          <path d="M60 100V62M60 76l-7-8M60 86l8-9M60 94l-8-8" />
        </g>
      </svg>
    </div>,
    size,
  );
}
