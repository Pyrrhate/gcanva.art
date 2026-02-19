import { ImageResponse } from "next/og";

export const runtime = "edge";
export const alt = "gcanva.art";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

export default function Image() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background: "linear-gradient(180deg,#fdfcf8,#f6f0e7)",
          color: "#2b2b2b",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage:
              "linear-gradient(rgba(82,64,48,0.10) 1px, transparent 1px), linear-gradient(90deg, rgba(82,64,48,0.10) 1px, transparent 1px)",
            backgroundSize: "20px 20px",
            opacity: 0.55,
          }}
        />
        <div style={{ position: "relative", fontSize: 56, fontWeight: 700, color: "#1f6d60" }}>gcanva.art</div>
        <div style={{ position: "relative", maxWidth: "90%", fontSize: 66, lineHeight: 1.05, fontWeight: 700 }}>
          Carnet créatif entre alchimie organique et énergie électronique.
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
