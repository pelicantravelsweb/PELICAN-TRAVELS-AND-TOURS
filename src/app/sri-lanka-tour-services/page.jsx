// src/app/sri-lanka-tour-services/page.jsx
// ✅ NO "use client" here

import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Sri Lanka Travel Services & Custom Planning | Pelican Tours",
  description: "Discover our complete range of Sri Lanka travel services. From custom itinerary planning and hotel bookings to private drivers, we handle everything for you.",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/sri-lanka-tour-services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}