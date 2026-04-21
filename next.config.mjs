/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone", // ✅ REQUIRED for your Dockerfile

  async redirects() {
    return [
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
    ];
  },
};

export default nextConfig;