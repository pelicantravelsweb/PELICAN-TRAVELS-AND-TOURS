import { MetadataRoute } from 'next';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './lib/firebase';

export const dynamic = 'force-dynamic';

const BASE_URL = 'https://pelicantravelsandtours.com';

export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  // ─── Static Pages ───────────────────────────────────────────────────────────
  const staticPages: MetadataRoute.Sitemap = [
    {
      url: `${BASE_URL}/`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 1.0,
    },
    {
      url: `${BASE_URL}/sri-lanka-tour-packages`,
      lastModified: new Date(),
      changeFrequency: 'weekly',
      priority: 0.9,
    },
    {
      url: `${BASE_URL}/sri-lanka-tour-services`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/sri-lanka-travel-destinations`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.8,
    },
    {
      url: `${BASE_URL}/contact-sri-lanka-tour-agent`,
      lastModified: new Date(),
      changeFrequency: 'monthly',
      priority: 0.7,
    },
  ];

  // ─── Dynamic Package Pages (from Firestore) ──────────────────────────────────
  let packagePages: MetadataRoute.Sitemap = [];

  try {
    const packagesSnapshot = await getDocs(collection(db, 'packages'));

    packagePages = packagesSnapshot.docs
      .map((doc) => {
        const data = doc.data();
        const slug = data.slug || doc.id; // use slug field, fallback to doc ID
        const updatedAt = data.updatedAt?.toDate?.() ?? new Date();

        return {
          url: `${BASE_URL}/sri-lanka-tour-packages/${slug}`,
          lastModified: updatedAt,
          changeFrequency: 'weekly' as const,
          priority: 0.8,
        };
      });
  } catch (error) {
    console.error('Sitemap: failed to fetch packages from Firestore:', error);
    // Gracefully degrade — static pages still get indexed
  }

  return [...staticPages, ...packagePages];
}
