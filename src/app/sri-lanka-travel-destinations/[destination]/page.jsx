import React from 'react'

export async function generateMetadata({ params }) {
  const { destination } = await params;
  const destinationName = decodeURIComponent(destination)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());

  return {
    title: `${destinationName} Travel Guide | Pelican Tours`,
    description: `Explore the best things to do, places to visit, and travel tips for ${destinationName}, Sri Lanka. Plan your custom private tour with Pelican Tours.`,
    alternates: {
      canonical: `https://pelicantravelsandtours.com/sri-lanka-travel-destinations/${destination}`,
    },
  };
}

async function page({ params }) {
  const { destination } = await params;
  const destinationName = decodeURIComponent(destination)
    .replace(/[-_]+/g, ' ')
    .replace(/\b\w/g, (character) => character.toUpperCase());

  return (
    <main>
      <h1>{destinationName} Travel Guide</h1>
    </main>
  )
}

export default page