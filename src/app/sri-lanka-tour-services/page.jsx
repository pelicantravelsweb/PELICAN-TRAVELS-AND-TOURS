// src/app/sri-lanka-tour-services/page.jsx
// ✅ NO "use client" here

import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Sri Lanka Tour Services | Round Tours, Safaris & Transport",
  description: "Pelican Tours offers expert Sri Lanka travel services including round tours, day excursions, MICE services, airport transfers and private transport across the island.",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/sri-lanka-tour-services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}