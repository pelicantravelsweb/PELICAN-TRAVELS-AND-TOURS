// src/app/sri-lanka-tour-services/page.jsx
// ✅ NO "use client" here

import TravelTips from "./TravelTips";

export const metadata = {
  title: "Travel Services Sri Lanka",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/sri-lanka-travel-tips",
  },
};

export default function ServicesPage() {
  return <TravelTips/>;
}