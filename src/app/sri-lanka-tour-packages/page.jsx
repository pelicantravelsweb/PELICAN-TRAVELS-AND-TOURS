// src/app/sri-lanka-tour-services/page.jsx
// ✅ NO "use client" here

import PackagesClient from "./PackagesClient";

export const metadata = {
  title: "Sri Lanka Tour Packages",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/sri-lanka-tour-packages",
  },
};

export default function ServicesPage() {
  return <PackagesClient />;
}