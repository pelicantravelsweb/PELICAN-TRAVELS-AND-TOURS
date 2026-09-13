// src/app/sri-lanka-tour-services/page.jsx
// ✅ NO "use client" here

import TravelTips from "./TravelTips";

export const metadata = {
  title: "Sri Lanka Travel Tips & First-Time Visitor Guide | Pelican Tours",
  description: "Essential Sri Lanka travel tips for 2026: visa requirements, weather & monsoon guide, local customs, currency, and safety. Plan your custom private tour today!",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/sri-lanka-travel-tips",
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
        Essential Sri Lanka Travel Tips & First-Time Visitor Guide
      </h1>
      <TravelTips />
    </>
  );
}