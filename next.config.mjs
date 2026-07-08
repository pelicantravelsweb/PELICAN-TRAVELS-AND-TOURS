/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",

  images: {
    qualities: [70, 75, 80, 90],
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

      // ── ?scroll= query param → base page ────────────────────────────────
      // 301 tells Google to permanently drop these variants.

      {
        source: "/sri-lanka-travel-destinations",
        has: [{ type: "query", key: "scroll" }],
        destination: "/sri-lanka-travel-destinations",
        permanent: true,
      },
      {
        source: "/sri-lanka-tour-services",
        has: [{ type: "query", key: "scroll" }],
        destination: "/sri-lanka-tour-services",
        permanent: true,
      },
      {
        source: "/destinations",
        has: [{ type: "query", key: "scroll" }],
        destination: "/destinations",
        permanent: true,
      },

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
    ];
  },
};

export default nextConfig;