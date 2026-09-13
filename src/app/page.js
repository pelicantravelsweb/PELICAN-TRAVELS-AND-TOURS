// app/page.js
import HomeClient from './HomeClient';

const jsonLd = {
  "@context": "https://schema.org",
  "@type": "TravelAgency",
  "name": "Pelican Travels & Tours",
  "alternateName": "Pelican Tours",
  "image": "https://pelicantravelsandtours.com/Cover_Image.webp",
  "url": "https://pelicantravelsandtours.com",
  "telephone": ["+94764705440", "+94719015403"],
  "email": "hello@pelicantravelsandtours.com",
  "address": {
    "@type": "PostalAddress",
    "streetAddress": "Dodangoda Toll Booth, Dodangoda Entrance",
    "addressLocality": "Kalutara",
    "addressCountry": "LK"
  },
  "sameAs": [
    "https://web.facebook.com/pelicantravels.lk",
    "https://www.linkedin.com/in/pelican-travels-and-tours-a35a45409",
    "https://www.tripadvisor.com/Attraction_Review-g293962-d17700816-Reviews-PELICAN_TRAVELS_SRI_LANKA-Colombo_Western_Province.html"
  ],
  "description": "Custom, private Sri Lanka tour packages featuring professional driver-guides and handpicked boutique stays.",
  "areaServed": { "@type": "Country", "name": "Sri Lanka" }
};

export const metadata = {
  title: "Sri Lanka Tour Packages & Private Tours | Pelican Tours",
  description: "Explore Sri Lanka tour packages and tailor-made private tours with Pelican Tours. Discover beaches, wildlife, culture, tea country, and unforgettable island experiences.",
  alternates: { canonical: 'https://pelicantravelsandtours.com' },
};

export default function HomePage() {
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
        Sri Lanka Tour Packages & Private Tours | Pelican Tours
      </h1>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }}
      />
      <HomeClient />
    </>
  );
}