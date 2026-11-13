import { ImageResponse } from "next/og";

/*
  The preview image shown when the site is shared on LinkedIn, Slack,
  iMessage etc. Generated once at build time from the design tokens.
*/
export const alt = "Mohamed Hussein — Software, data & security";
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  return new ImageResponse(
    (
      <div
        style={{
          width: "100%",
          height: "100%",
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between",
          padding: "72px 80px",
          background: "#0b0c0e",
          color: "#ecebe8",
          fontFamily: "sans-serif",
        }}
      >
        <div style={{ display: "flex", alignItems: "center", gap: 14, fontSize: 24, color: "#8e8d89", letterSpacing: 4 }}>
          <div style={{ width: 10, height: 10, borderRadius: 10, background: "#8fc9a6" }} />
          OSLO, NORWAY
        </div>
        <div style={{ display: "flex", flexDirection: "column" }}>
          <div style={{ fontSize: 84, fontWeight: 600, letterSpacing: -3, lineHeight: 1.05 }}>
            Mohamed Hussein
          </div>
          <div style={{ display: "flex", fontSize: 40, color: "#c4c3bf", marginTop: 24 }}>
            Software, data &amp;&nbsp;<span style={{ color: "#8fc9a6" }}>security</span>
          </div>
        </div>
        <div style={{ display: "flex", justifyContent: "space-between", fontSize: 26, color: "#8e8d89" }}>
          <span>IT & Management graduate · USN</span>
          <span>devmyc.no</span>
        </div>
      </div>
    ),
    size
  );
}
