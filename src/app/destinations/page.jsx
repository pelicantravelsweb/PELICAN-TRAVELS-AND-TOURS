import { Suspense } from "react";
import DestinationsContent from "./DestinationsContent";

export default function Page() {
  return (
    <Suspense fallback={<div>Loading...</div>}>
      <DestinationsContent />
    </Suspense>
  );
}