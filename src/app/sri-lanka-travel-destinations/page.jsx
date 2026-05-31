import { Suspense } from "react";
import DestinationsContent from "./DestinationsContent";

export const metadata = {
  title: "Sri Lanka Travel Destinations & Attractions | Pelican Tours",
  description: "Explore Sri Lanka's top travel destinations including Kandy, Galle, Yala, Sigiriya, Colombo, Dambulla and more. Discover iconic attractions with Pelican Tours.",
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