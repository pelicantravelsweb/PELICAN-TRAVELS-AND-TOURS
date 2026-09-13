import { Suspense } from "react";
import DestinationsContent from "./DestinationsContent";

export async function generateMetadata() {
  return {
    title: "Best Places to Visit in Sri Lanka | Pelican Tours",
    description: "Discover the ultimate guide to Sri Lanka's best travel destinations. From pristine beaches and ancient ruins to misty tea hills. Plan your custom route!",
    alternates: {
      canonical: 'https://pelicantravelsandtours.com/sri-lanka-travel-destinations',
    },
  };
}

export default function Page() {
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
        Best Places to Visit in Sri Lanka
      </h1>
      <Suspense fallback={<div>Loading...</div>}>
        <DestinationsContent />
      </Suspense>
    </>
  );
}