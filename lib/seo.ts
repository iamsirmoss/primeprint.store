const siteUrl =
  process.env.NEXT_PUBLIC_SITE_URL?.replace(/\/$/, "") ||
  "https://primeprint-store.vercel.app";

export const seoConfig = {
  siteName: "Prime Print Store",
  siteUrl,
  defaultTitle: "Prime Print Store | Online Printing & Business Services",
  defaultDescription:
    "Prime Print Store offers custom printing, business cards, flyers, banners, graphic design, passport photos, notary services, and more.",
  defaultOgImage: `${siteUrl}/og-image.jpg`, // à créer plus tard
};

export function absoluteUrl(path: string = "/") {
  return `${siteUrl}${path.startsWith("/") ? path : `/${path}`}`;
}