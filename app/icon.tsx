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
      <div style={{ position: "relative", width: 320, height: 330, display: "flex" }}>
        <div
          style={{
            position: "absolute",
            top: 6,
            left: 112,
            width: 96,
            height: 96,
            borderRadius: 999,
            background: "#e8a221",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 32,
            left: 24,
            width: 142,
            height: 220,
            borderRadius: "100% 0 100% 0",
            background: "#7d9a6d",
            transform: "rotate(-36deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            bottom: 18,
            left: 91,
            width: 142,
            height: 238,
            borderRadius: "100% 0 100% 0",
            background: "#0d4a38",
            transform: "rotate(-4deg)",
          }}
        />
        <div
          style={{
            position: "absolute",
            right: 23,
            bottom: 34,
            width: 142,
            height: 220,
            borderRadius: "100% 0 100% 0",
            background: "#9eb388",
            transform: "rotate(38deg)",
          }}
        />
      </div>
    </div>,
    size,
  );
}
