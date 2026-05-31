// src/app/sri-lanka-tour-services/page.jsx
// ✅ NO "use client" here

import PackagesClient from "./PackagesClient";

export const metadata = {
  title: "Sri Lanka Tour Packages | Honeymoon, Safari & Cultural Tours",
  description: "Browse our best Sri Lanka tour packages including honeymoon escapes, wildlife safaris, cultural round tours, golf packages, and tailor-made holidays with Pelican Tours.",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/sri-lanka-tour-packages",
  },
};

export default function ServicesPage() {
  return <PackagesClient />;
}