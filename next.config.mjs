/** @type {import('next').NextConfig} */

const nextConfig = {
  output: "standalone",

  images: {
    qualities: [70, 75, 80, 90], // include whatever you use in <Image />
  },

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