import type { MetadataRoute } from "next"

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: "Aronix | Business Automation for Growing Companies",
    short_name: "Aronix",
    description:
      "Custom automation for CRM, finance ops, and internal workflows. Trusted by 40+ growing companies.",
    start_url: "/",
    display: "standalone",
    background_color: "#ffffff",
    theme_color: "#EA4B71",
    icons: [
      {
        src: "/icon-192x192.png",
        sizes: "192x192",
        type: "image/png",
      },
      {
        src: "/icon-512x512.png",
        sizes: "512x512",
        type: "image/png",
      },
    ],
  }
}
