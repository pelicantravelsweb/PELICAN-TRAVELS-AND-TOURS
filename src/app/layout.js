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
  title: "Pelican Tours Sri Lanka | Custom Tours & Packages",
  description: "Discover Sri Lanka with Pelican Tours. Explore custom tours and flexible travel packages designed around your interests, from beaches and wildlife to culture and adventure.",
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
