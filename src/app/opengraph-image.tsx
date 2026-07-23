import { OG_SIZE, OG_CONTENT_TYPE, renderDefaultOg } from "@/lib/og"

export const alt = "Aronix: Business Automation for Growing Companies"
export const size = OG_SIZE
export const contentType = OG_CONTENT_TYPE

export default async function OgImage() {
  return renderDefaultOg()
}
