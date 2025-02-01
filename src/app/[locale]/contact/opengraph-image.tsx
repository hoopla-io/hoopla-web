/* eslint-disable @next/next/no-img-element */
import { getTranslations } from "next-intl/server";
import { ImageResponse } from "next/og";

// Import your logo or any other assets

export const runtime = "edge";

export const size = {
  width: 1280,
  height: 720,
};

export const contentType = "image/png";

export default async function Image() {
  const t = await getTranslations();

  return new ImageResponse(
    (
      <div
        style={{
          display: "flex", // Add display: flex to the root div
          justifyContent: "center",
          alignItems: "center",
          width: "100%",
          height: "100%",
          backgroundColor: "#892235", // Light background color
          fontFamily: "Arial, sans-serif",
          color: "#fff",
          padding: "0 40px",
        }}
      >
        {/* Title and Tagline */}
        <div
          style={{
            display: "flex",
            textAlign: "center",
            flexDirection: "column",
            alignItems: "center",
            fontSize: 96,
            padding: "0 20px",
          }}
        >
          <div style={{ fontWeight: "bolder" }}>{t("title")}</div>
          <div style={{ fontSize: 48 }}>{t("hero.title")}</div>
        </div>
      </div>
    ),
    {
      ...size,
    }
  );
}
