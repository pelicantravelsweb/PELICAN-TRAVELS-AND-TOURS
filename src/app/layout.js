import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({
  subsets: ["latin"],
  weight: ["100","200","300","400","500","600","700","800","900"],
});

const geistMono = Geist({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "Best Sri Lanka Tour Packages | Tailor-Made Tours – Pelican Tours",
  description:
    "Discover Sri Lanka tour packages with Pelican Tours. Custom holiday packages including beaches, wildlife safaris, culture tours, and luxury travel experiences across Sri Lanka.",

  keywords: [
    "sri lanka tour packages",
    "sri lanka tours",
    "sri lanka holiday packages",
    "custom sri lanka tours",
    "sri lanka travel agency",
  ],

  openGraph: {
    title: "Sri Lanka Tour Packages | Pelican Tours",
    description:
      "Book customized Sri Lanka tour packages with beaches, wildlife, culture & luxury experiences.",
    url: "https://pelicantravelsandtours.com",
    images: [
      {
        url: "/Cover_Image.jpg",
        width: 1200,
        height: 630,
        alt: "Sri Lanka Tour Packages",
      },
    ],
    type: "website",
  },
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

      <body className={`${geistSans.variable} ${poppins.variable} ${geistMono.variable}`}>
        {children}
      </body>
    </html>
  );
}