// app/page.js — Server Component (NO "use client")
import HomeClient from './HomeClient';

export const metadata = {
  title: "Sri Lanka Private Tours & Packages | Pelican Tours",
  description: "Discover Sri Lanka your way with Pelican Tours. Custom, private itineraries featuring professional driver-guides & handpicked stays. Get your free quote today!",
  alternates: {
    canonical: 'https://pelicantravelsandtours.com',
  },
};

export default function HomePage() {
  return <HomeClient />;
}