import { ImageResponse } from "next/og";
import { defineQuery } from "next-sanity";
import { client } from "@/sanity/client";

export const runtime = "edge";
export const alt = "Aperçu social gcanva.art";
export const size = {
  width: 1200,
  height: 630,
};
export const contentType = "image/png";

const OG_QUERY = defineQuery(/* groq */ `
  *[_type == "gardenNote" && (slug.current == $slug || _id == $slug)][0] {
    title,
    gardeningStatus
  }
`);

export default async function Image({
  params,
}: {
  params: Promise<{ slug: string }>;
}) {
  const { slug } = await params;
  const note = await client.fetch<{ title?: string; gardeningStatus?: string } | null>(OG_QUERY, { slug });

  const title = note?.title || "gcanva.art";
  const electronic = note?.gardeningStatus === "evergreen";

  const background = electronic
    ? "linear-gradient(180deg,#000000,#021014)"
    : "linear-gradient(180deg,#fdfcf8,#f6f0e7)";

  const gridColor = electronic ? "rgba(34,211,238,0.16)" : "rgba(82,64,48,0.10)";

  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          position: "relative",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "64px",
          background,
          color: electronic ? "#c7f9ff" : "#2b2b2b",
          fontFamily: "Inter, sans-serif",
        }}
      >
        <div
          style={{
            position: "absolute",
            inset: 0,
            backgroundImage: `
              linear-gradient(${gridColor} 1px, transparent 1px),
              linear-gradient(90deg, ${gridColor} 1px, transparent 1px)
            `,
            backgroundSize: electronic ? "28px 28px" : "20px 20px",
            opacity: electronic ? 0.7 : 0.55,
          }}
        />

        <div style={{ position: "relative", display: "flex", justifyContent: "space-between", alignItems: "center" }}>
          <div
            style={{
              fontSize: 54,
              fontWeight: 700,
              color: electronic ? "#2fe7d1" : "#1f6d60",
            }}
          >
            gcanva.art
          </div>
          <div style={{ fontSize: 22, opacity: 0.8 }}>{electronic ? "Console" : "Papier"}</div>
        </div>

        <div style={{ position: "relative", maxWidth: "92%", fontSize: 72, lineHeight: 1.05, fontWeight: 700 }}>
          {title}
        </div>
      </div>
    ),
    {
      ...size,
    },
  );
}
