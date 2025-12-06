import { Geist, Geist_Mono, Poppins } from "next/font/google";
import "./globals.css";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const poppins = Poppins({ subsets: ['latin'] , weight: ['100','200','300','400','500','600','700','800','900']});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "PELICAN TOURS SRI LANKA",
  description: "Explore Sri Lanka’s top tourist attractions — from pristine beaches and ancient Buddhist temples to lush tea plantations, wildlife safaris, and cultural heritage sites. Whether you're looking for all-inclusive Sri Lanka tour packages, honeymoon getaways, or custom holiday itineraries, Pelican Tours is your trusted travel agency in Sri Lanka. Let us design your unforgettable Sri Lankan vacation.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={`${geistSans.variable} ${poppins.variable} ${geistMono.variable}`}>
        {children}
              <link rel="stylesheet" href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.5.0/css/all.min.css"/>
      
      </body>
    </html>
  );
}
