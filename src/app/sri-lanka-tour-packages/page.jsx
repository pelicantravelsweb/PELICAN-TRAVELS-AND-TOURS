// src/app/sri-lanka-tour-services/page.jsx
// ✅ NO "use client" here

import PackagesClient from "./PackagesClient";

export const metadata = {
  title: "Sri Lanka Tour Packages & Itineraries | Pelican Tours",
  description: "Explore our curated Sri Lanka tour packages. Fully customizable itineraries featuring private driver-guides, handpicked hotels, and unique local experiences.",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/sri-lanka-tour-packages",
  },
};

export default function ServicesPage() {
  return <PackagesClient />;
}