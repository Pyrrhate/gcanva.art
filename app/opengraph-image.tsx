import { ImageResponse } from "next/og"

export const alt = "Guillaume Canva, développeur web et artiste visuel"
export const size = {
  width: 1200,
  height: 630,
}
export const contentType = "image/png"

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
          padding: "72px",
          background: "#141414",
          color: "#eceae6",
        }}
      >
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 28, letterSpacing: "0.18em" }}>
          <span>GCANVA</span>
          <span style={{ color: "#9a9792" }}>L’INTERSTICE</span>
        </div>
        <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
          <div style={{ fontSize: 84, lineHeight: 0.95, letterSpacing: "-0.03em" }}>Guillaume Canva</div>
          <div style={{ fontSize: 34, color: "#b7b3ad" }}>Développeur web et artiste visuel, à Tournai</div>
        </div>
        <div style={{ display: "flex", gap: 28, fontSize: 28, color: "#eceae6" }}>
          <span>01 Studio</span>
          <span style={{ color: "#6e6a64" }}>/</span>
          <span>02 Carnet</span>
        </div>
      </div>
    ),
    { ...size },
  )
}
