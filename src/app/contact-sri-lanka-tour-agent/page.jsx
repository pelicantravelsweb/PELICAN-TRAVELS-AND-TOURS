// src/app/sri-lanka-tour-services/page.jsx
// ✅ NO "use client" here
// app/contact-sri-lanka-tour-agent/page.js
import ContactClient from "./ContactClient"; // whatever your client file is named

export const metadata = {
  title: "Contact Local Sri Lanka Tour Agent | Pelican Tours",
  description: "Get in touch with Pelican Tours. Speak to a local Sri Lanka travel expert to plan, customize, and receive a free quote for your upcoming private holiday.",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/contact-sri-lanka-tour-agent", 
  },
};

export default function ContactPage() {
  return <ContactClient />;  // or <TravelTips/> — whatever your component is
}