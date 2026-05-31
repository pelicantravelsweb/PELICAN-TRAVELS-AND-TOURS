// app/page.js — Server Component (NO "use client")
import HomeClient from './HomeClient';

export const metadata = {
  title: "Sri Lanka Tour Packages & Tailormade Tours | Pelican Travels and Tours",
  description: "Explore Sri Lanka with custom holiday packages, luxury tours, honeymoon escapes, wildlife safaris, round tours, day excursions, and tailor-made travel experiences with Pelican Tours Sri Lanka.",
  alternates: {
    canonical: 'https://pelicantravelsandtours.com',
  },
};

export default function HomePage() {
  return <HomeClient />;
}