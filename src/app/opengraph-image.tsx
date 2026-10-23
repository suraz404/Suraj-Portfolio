import { readFileSync } from "node:fs";
import path from "node:path";

import { ImageResponse } from "next/og";

import { profile } from "@/content/profile";

export const alt = `${profile.name} — ${profile.role}`;
export const size = { width: 1200, height: 630 };
export const contentType = "image/png";

export default function OpengraphImage() {
  const photo = readFileSync(path.join(process.cwd(), "public", profile.photo.full));
  const src = `data:image/jpeg;base64,${photo.toString("base64")}`;

  return new ImageResponse(
    (
      <div style={{ width: "100%", height: "100%", display: "flex", background: "#fbfbfa", color: "#18181b" }}>
        <div style={{ display: "flex", flexDirection: "column", justifyContent: "space-between", padding: 72, flex: 1 }}>
          <div style={{ display: "flex", fontSize: 24, color: "#71717a" }}>{profile.role} · {profile.location}</div>
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 30, color: "#71717a", fontStyle: "italic" }}>Namaste, I’m</div>
            <div style={{ fontSize: 92, letterSpacing: -2, marginTop: 6 }}>{profile.name}</div>
            <div style={{ fontSize: 34, color: "#52525b", marginTop: 18, maxWidth: 620 }}>
              I design, build, and ship complete digital products.
            </div>
          </div>
          <div style={{ display: "flex", width: 60, height: 4, background: "#c8102e" }} />
        </div>
        <img src={src} alt="" width={430} height={630} style={{ objectFit: "cover", objectPosition: "50% 30%" }} />
      </div>
    ),
    size,
  );
}
