import { Suspense } from "react";
import DestinationsContent from "./DestinationsContent";

export const metadata = {
  title: "Destinations & Attractions in Sri Lanka",
  alternates: {
    canonical: "https://pelicantravelsandtours.com/sri-lanka-travel-destinations",
  },
};

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DestinationsContent />
    </Suspense>
  );
}