// src/app/sri-lanka-tour-services/page.jsx
// ✅ NO "use client" here

import ServicesClient from "./ServicesClient";

export const metadata = {
  title: "Travel Services Sri Lanka",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/sri-lanka-tour-services",
  },
};

export default function ServicesPage() {
  return <ServicesClient />;
}