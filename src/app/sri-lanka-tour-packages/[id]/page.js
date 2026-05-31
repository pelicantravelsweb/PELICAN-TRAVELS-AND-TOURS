import { collection, getDocs, query, where, doc, getDoc } from 'firebase/firestore';
import { db } from '../../lib/firebase';
import PackageDetailClient from './PackageDetailClient';

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

export const revalidate = 86400; // rebuild every 24 hours

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
  return <PackageDetailClient serverPackageData={packageData} />;
}