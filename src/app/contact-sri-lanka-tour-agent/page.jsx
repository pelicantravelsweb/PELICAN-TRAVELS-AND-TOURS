// src/app/sri-lanka-tour-services/page.jsx
// ✅ NO "use client" here
// app/contact-sri-lanka-tour-agent/page.js
import ContactClient from "./ContactClient"; // whatever your client file is named

export const metadata = {
  title: "Contact Pelican Tours | Plan Your Private Sri Lanka Tour",
  description: "Get in touch with a local Sri Lanka travel expert and start planning your private, tailor-made holiday. Get a free custom itinerary quote from Pelican Tours today.",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/contact-sri-lanka-tour-agent",
  },
};

export default function ContactPage() {
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
        Contact Pelican Tours | Plan Your Private Sri Lanka Tour
      </h1>
      <ContactClient />
    </>
  );
}