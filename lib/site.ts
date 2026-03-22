export const SITE_URL = (
  process.env.NEXT_PUBLIC_SITE_URL ||
  process.env.SITE_URL ||
  'http://localhost:3000'
).replace(/\/$/, '')

export function getSiteUrl() {
  return SITE_URL
}
