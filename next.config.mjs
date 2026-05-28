/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",

  images: {
    qualities: [70, 75, 80, 90],
  },

  async redirects() {
    return [
      // 🆕 Redirect Cloud Run URL → custom domain
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "pelican-travels-and-tours-new-361770129404.asia-east1.run.app",
          },
        ],
        destination: "https://pelicantravelsandtours.com/:path*",
        permanent: true,
      },

      // www → non-www
      {
        source: "/:path*",
        has: [
          {
            type: "host",
            value: "www.pelicantravelsandtours.com",
          },
        ],
        destination: "https://pelicantravelsandtours.com/:path*",
        permanent: true,
      },

      // http → https
      {
        source: "/:path*",
        has: [
          {
            type: "header",
            key: "x-forwarded-proto",
            value: "http",
          },
        ],
        destination: "https://pelicantravelsandtours.com/:path*",
        permanent: true,
      },
    ];
  },
};

export default nextConfig;