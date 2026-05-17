// src/app/sri-lanka-tour-services/page.jsx
// ✅ NO "use client" here

import ContactClient from "./ContactClient";

export const metadata = {
  title: "Contact Sri Lankan Travel Agent",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/contact-sri-lanka-tour-agent",
  },
};

export default function ServicesPage() {
  return <ContactClient/>;
}