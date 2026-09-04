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
  return <TravelTips/>;
}