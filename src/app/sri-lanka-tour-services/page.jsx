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
  return (
    <>
      <h1
        style={{
          position: 'absolute',
          width: '1px',
          height: '1px',
          padding: 0,
          margin: '-1px',
          overflow: 'hidden',
          clip: 'rect(0, 0, 0, 0)',
          whiteSpace: 'nowrap',
          border: 0,
        }}
      >
        Sri Lanka Travel Services & Custom Planning
      </h1>
      <ServicesClient />
    </>
  );
}