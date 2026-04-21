/** @type {import('next').NextConfig} */

const nextConfig = {
  async redirects() {
    return [
      {
        source: '/:path*',
        has: [
          {
            type: 'host',
            value: 'www.pelicantravelsandtours.com',
          },
        ],
        destination: 'https://pelicantravelsandtours.com/:path*',
        permanent: true,
      },
    ];
  },
};

export default nextConfig;
