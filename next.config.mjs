/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",

  images: {
    qualities: [70, 75, 80, 90],
  },

  async redirects() {
    return [
      // www → non-www (covers both http and https www)
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
      // http non-www → https non-www
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