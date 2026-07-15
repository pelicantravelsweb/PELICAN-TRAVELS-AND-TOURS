// src/app/sri-lanka-tour-services/page.jsx
// ✅ NO "use client" here

import TravelTips from "./TravelTips";

export const metadata = {
  title: "Sri Lanka Travel Tips & First-Time Visitor Guide | Pelican",
  description: "Essential Sri Lanka travel tips for a smooth holiday. Learn about local visas, the best time to visit, safety guidelines, and cultural etiquette.",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/sri-lanka-travel-tips",
  },
};

export default function ServicesPage() {
  return <TravelTips/>;
}