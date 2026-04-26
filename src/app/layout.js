import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["100", "200", "300", "400", "500", "600", "700", "800", "900"],
  display: "swap",
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  metadataBase: new URL("https://www.pelicantravelsandtours.com"),

  title: {
    default:
      "Best Sri Lanka Tour Packages | Custom Holiday & Tailor-Made Tours – Pelican Tours",
    template: "%s | Pelican Tours Sri Lanka",
  },

  description:
    "Explore Sri Lanka with custom holiday packages, luxury tours, honeymoon escapes, wildlife safaris, round tours, day excursions, and tailor-made travel experiences with Pelican Tours Sri Lanka.",

  keywords: [
    "Sri Lanka tour packages",
    "best Sri Lanka tour packages",
    "Sri Lanka holiday packages",
    "tailor made Sri Lanka tours",
    "custom Sri Lanka tours",
    "Sri Lanka honeymoon packages",
    "Sri Lanka wildlife safari tours",
    "luxury Sri Lanka tours",
    "travel agency Sri Lanka",
    "Sri Lanka inbound tour operator",
    "Sri Lanka round tours",
    "Sri Lanka day excursions",
    "Sri Lanka transport services",
    "Pelican Tours Sri Lanka",
  ],

  authors: [
    {
      name: "Pelican Tours Sri Lanka",
      url: "https://www.pelicantravelsandtours.com",
    },
  ],

  creator: "Pelican Tours Sri Lanka",
  publisher: "Pelican Tours Sri Lanka",

  alternates: {
    canonical: "https://www.pelicantravelsandtours.com",
  },

  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
      "max-video-preview": -1,
      "max-image-preview": "large",
      "max-snippet": -1,
    },
  },

  openGraph: {
    title:
      "Best Sri Lanka Tour Packages | Tailor-Made Tours – Pelican Tours",
    description:
      "Luxury Sri Lanka holidays, honeymoon packages, safaris, day tours, and tailor-made travel experiences crafted by local experts.",
    url: "https://www.pelicantravelsandtours.com",
    siteName: "Pelican Tours Sri Lanka",
    images: [
      {
        url: "/Cover_Image.jpg",
        width: 1200,
        height: 630,
        alt: "Pelican Tours Sri Lanka",
      },
    ],
    locale: "en_US",
    type: "website",
  },

  twitter: {
    card: "summary_large_image",
    title:
      "Best Sri Lanka Tour Packages | Tailor-Made Tours – Pelican Tours",
    description:
      "Custom Sri Lanka holidays, luxury tours, safaris, honeymoon escapes and unforgettable travel experiences.",
    images: ["/Cover_Image.jpg"],
  },

  category: "travel",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <head>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"
        />
      </head>

      <body
        className={`${geistSans.variable} ${poppins.variable} ${geistMono.variable}`}
      >
        {children}
      </body>
    </html>
  );
}