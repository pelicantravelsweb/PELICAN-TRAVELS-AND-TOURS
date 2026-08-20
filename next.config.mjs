/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",

  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [70, 75, 80, 90],
    minimumCacheTTL: 60 * 60 * 24 * 30,
    remotePatterns: [
      { protocol: "https", hostname: "firebasestorage.googleapis.com" },
      { protocol: "https", hostname: "storage.googleapis.com" },
    ],
  },

  async redirects() {
    return [
      // ── Domain canonicalisation ──────────────────────────────────────────

      {
        source: "/:path*",
        has: [{ type: "host", value: "pelican-travels-and-tours-new-361770129404.asia-east1.run.app" }],
        destination: "https://pelicantravelsandtours.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "host", value: "www.pelicantravelsandtours.com" }],
        destination: "https://pelicantravelsandtours.com/:path*",
        permanent: true,
      },
      {
        source: "/:path*",
        has: [{ type: "header", key: "x-forwarded-proto", value: "http" }],
        destination: "https://pelicantravelsandtours.com/:path*",
        permanent: true,
      },

      // ── Legacy URL fixes ─────────────────────────────────────────────────

      {
        source: "/index.html",
        destination: "/",
        permanent: true,
      },
      {
        source: "/services",
        destination: "/sri-lanka-tour-services",
        permanent: true,
      },

      // ── Old /tour-packages/ path → /sri-lanka-tour-packages/ ─────────────
      // Google crawled these from old internal links before the rename.

      {
        source: "/tour-packages/:slug*",
        destination: "/sri-lanka-tour-packages/:slug*",
        permanent: true,
      },

      // ── NOTE ─────────────────────────────────────────────────────────────
      // The old `?scroll=` query-stripping redirects that used to live here
      // have been moved to middleware.js instead. This project's Next.js /
      // Turbopack version was not reliably stripping the query string when
      // using the `destination: "/path?"` trailing-? shorthand, which caused
      // an infinite redirect loop (the incoming ?scroll=... kept getting
      // reattached to the destination, recreating the same URL). Handling
      // it in middleware with `cleanUrl.search = ""` removes the query
      // string unambiguously, with no reliance on redirect-destination
      // string parsing. See middleware.js in the project root.

      // ── Firestore document ID → slug redirects ───────────────────────────

      {
        source: "/sri-lanka-tour-packages/06RhE4L4KZrctSKnodQG",
        destination: "/sri-lanka-tour-packages/sri-lanka-wellness-rejuvenation-escape",
        permanent: true,
      },
      {
        source: "/sri-lanka-tour-packages/1iBuycM1FEVbicr7GEqN",
        destination: "/sri-lanka-tour-packages/one-day-galle-bentota-coastal-experience",
        permanent: true,
      },
      {
        source: "/sri-lanka-tour-packages/3hrumfK0tfHEXkXBCV12",
        destination: "/sri-lanka-tour-packages/sri-lanka-golf-vacation-package-mini-golf-escape-tour",
        permanent: true,
      },
      {
        source: "/sri-lanka-tour-packages/AKvGtOLu2IsUzprJcdiC",
        destination: "/sri-lanka-tour-packages/romantic-sri-lanka-honeymoon-tour-culture-wildlife-sunset-beaches",
        permanent: true,
      },
      {
        source: "/sri-lanka-tour-packages/H7e0jCKt7JCk66yQ1jZ4",
        destination: "/sri-lanka-tour-packages/wild-coastal-bliss-yala-safari-south-coast-escape",
        permanent: true,
      },
      {
        source: "/sri-lanka-tour-packages/HPJwHyK5IUUbmLg6DHlC",
        destination: "/sri-lanka-tour-packages/wings-of-ceylon-ultimate-bird-watching-tour-of-sri-lanka",
        permanent: true,
      },
      {
        source: "/sri-lanka-tour-packages/VMcQ4PEu78LylaKMoQqr",
        destination: "/sri-lanka-tour-packages/sri-lanka-ramayana-trail",
        permanent: true,
      },
      {
        source: "/sri-lanka-tour-packages/sDOgrjEvWHJ2cU4SWcYW",
        destination: "/sri-lanka-tour-packages/luxury-sri-lanka-honeymoon-escape-7-days-6-nights",
        permanent: true,
      },
      {
        source: "/sri-lanka-tour-packages/xVSuN3r8Hr9mcYnGgZxi",
        destination: "/sri-lanka-tour-packages/top-honeymoon-destination-sri-lanka",
        permanent: true,
      },
      {
        source: "/sri-lanka-tour-packages/z6kf9PXvELkTkqmkNyic",
        destination: "/sri-lanka-tour-packages/pekoe-trail-highlands-trekking-experience-sri-lanka",
        permanent: true,
      },
      {
        source: "/sri-lanka-tour-packages/zLlPx4hwF5iJdE5wXEp2",
        destination: "/sri-lanka-tour-packages/05-days-04-nights-sri-lanka-ramayana-trail-tour",
        permanent: true,
      },

      // Block favicon query string variant
      {
        source: '/favicon.ico',
        has: [{ type: 'query', key: 'favicon.03xkcmw3a_eme.ico' }],
        destination: '/favicon.ico',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
