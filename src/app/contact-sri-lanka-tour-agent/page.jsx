// src/app/sri-lanka-tour-services/page.jsx
// ✅ NO "use client" here
// app/contact-sri-lanka-tour-agent/page.js
import ContactClient from "./ContactClient"; // whatever your client file is named

export const metadata = {
  title: "Contact Us | Sri Lanka Tour Agent | Pelican Tours",
  description: "Get in touch with Pelican Tours Sri Lanka. Plan your perfect Sri Lanka holiday with our expert travel agents. Call, WhatsApp, or email us today.",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/contact-sri-lanka-tour-agent", // ✅ fixed
  },
};

export default function ContactPage() {
  return <ContactClient />;  // or <TravelTips/> — whatever your component is
}