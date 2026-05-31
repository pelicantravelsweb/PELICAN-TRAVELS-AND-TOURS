import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import { redirect } from 'next/navigation';
import PackageDetailClient from './PackageDetailClient';

// 🆕 Convert Firebase Timestamps and non-plain objects to serializable values
function serializePackageData(data) {
  if (!data) return null;

  const serialize = (value) => {
    if (value === null || value === undefined) return value;
    // Convert Firestore Timestamps to ISO string
    if (value?.toDate && typeof value.toDate === 'function') {
      return value.toDate().toISOString();
    }
    // Recursively handle arrays
    if (Array.isArray(value)) {
      return value.map(serialize);
    }
    // Recursively handle plain objects
    if (typeof value === 'object') {
      return Object.fromEntries(
        Object.entries(value).map(([k, v]) => [k, serialize(v)])
      );
    }
    return value;
  };

  return serialize(data);
}

export async function generateStaticParams() {
  try {
    const snapshot = await getDocs(collection(db, 'packages'));
    return snapshot.docs.map((d) => ({
      id: d.data().slug || d.id,
    }));
  } catch (error) {
    console.error('generateStaticParams error:', error);
    return [];
  }
}

export const revalidate = 86400;

async function getPackageData(id) {
  try {
    const slugQuery = query(collection(db, 'packages'), where('slug', '==', id));
    const slugSnap = await getDocs(slugQuery);
    if (!slugSnap.empty) {
      const docSnap = slugSnap.docs[0];
      return { id: docSnap.id, ...docSnap.data() };
    }
    const packageRef = doc(db, 'packages', id);
    const packageSnap = await getDoc(packageRef);
    if (packageSnap.exists()) {
      return { id: packageSnap.id, ...packageSnap.data() };
    }
    return null;
  } catch (error) {
    console.error('getPackageData error:', error);
    return null;
  }
}

export async function generateMetadata({ params }) {
  const { id } = await params;
  const packageData = await getPackageData(id);
  return {
    title: packageData?.title || 'Sri Lanka Tour Package',
    description: packageData?.description || 'Explore Sri Lanka with Pelican Tours.',
    alternates: {
      canonical: `https://pelicantravelsandtours.com/sri-lanka-tour-packages/${id}`,
    },
  };
}

export default async function PackageDetailPage({ params }) {
  const { id } = await params;
  const packageData = await getPackageData(id);

  if (packageData?.slug && packageData.slug !== id) {
    redirect(`/sri-lanka-tour-packages/${packageData.slug}`);
  }

  if (!packageData) {
    redirect('/sri-lanka-tour-packages');
  }

  return <PackageDetailClient serverPackageData={serializePackageData(packageData)} />; // 🆕
}