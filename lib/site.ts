const VERCEL_PROJECT_PRODUCTION_URL = process.env.VERCEL_PROJECT_PRODUCTION_URL;
const VERCEL_URL = process.env.VERCEL_URL;

export const SITE_URL =
  process.env.NODE_ENV === "production"
    ? VERCEL_PROJECT_PRODUCTION_URL
      ? `https://${VERCEL_PROJECT_PRODUCTION_URL}`
      : VERCEL_URL
        ? `https://${VERCEL_URL}`
        : "https://hadithslibrary.vercel.app"
    : "http://localhost:3000";

export function getSiteUrl() {
  return SITE_URL;
}
