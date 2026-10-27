import type { MetadataRoute } from "next";
import { site } from "@/content/site";

export default function manifest(): MetadataRoute.Manifest {
  return {
    name: site.fullName,
    short_name: site.name,
    description: site.description,
    start_url: "/",
    display: "browser",
    background_color: "#ffffff",
    theme_color: "#123C61",
    lang: "en-IN",
    icons: [{ src: "/icon.png", type: "image/png", sizes: "any" }],
  };
}
