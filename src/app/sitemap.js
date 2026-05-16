// app/sitemap.js
export default async function sitemap() {
  const baseUrl = "https://pelicantravelsandtours.com";
  const now = new Date().toISOString();

  // Static pages
  const staticPages = [
    { url: `${baseUrl}/`,              priority: 1.0,  changeFrequency: "weekly" },
    { url: `${baseUrl}/sri-lanka-tour-packages`, priority: 0.9,  changeFrequency: "weekly" },
    { url: `${baseUrl}/sri-lanka-travel-destinations`,  priority: 0.9,  changeFrequency: "monthly" },
    { url: `${baseUrl}/sri-lanka-tour-services`,      priority: 0.8,  changeFrequency: "monthly" },
    { url: `${baseUrl}/contact-sri-lanka-tour-agent`,    priority: 0.7,  changeFrequency: "yearly" },
  ].map((page) => ({ ...page, lastModified: now }));

  // Dynamic tour package pages — fetch from Firestore
  // Replace this with your actual Firestore fetch logic
  const tourIds = [
    "3hrumfK0tfHEXkXBCV12",
    "AKvGtOLu2IsUzprJcdiC",
    "H7e0jCKt7JCk66yQ1jZ4",
    "HPJwHyK5IUUbmLg6DHlC",
    "sDOgrjEvWHJ2cU4SWcYW",
    "z6kf9PXvELkTkqmkNyic",
    "06RhE4L4KZrctSKnodQG",
  ];

  const tourPages = tourIds.map((id) => ({
    url: `${baseUrl}/sri-lanka-tour-packages/${id}`,
    lastModified: now,
    changeFrequency: "weekly",
    priority: 0.8,
  }));

  return [...staticPages, ...tourPages];
}