import type { Metadata } from "next";
import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import { LanguageProvider } from "@/context/LanguageContext";
import Navbar from "@/components/Navbar";
import Footer from "@/components/Footer";
import SmoothScroll from "@/components/SmoothScroll";
import SidebarWidget from "@/components/SidebarWidget";

const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "TripTour Uzbekistan - Premium Travel Packages",
  description: "Luxury travel aggregator licensed in Uzbekistan (License № T-0123-45)",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className="scroll-smooth">
      <body className={`${geistSans.variable} ${geistMono.variable} antialiased selection:bg-gold selection:text-brand-deep`}>
        <LanguageProvider>
          <SmoothScroll>
            <div className="layout-frame flex flex-col min-h-screen relative">
              <Navbar />
              <SidebarWidget />
              <main className="flex-grow">{children}</main>
              <Footer />
            </div>
          </SmoothScroll>
        </LanguageProvider>
      </body>
    </html>
  );
}
