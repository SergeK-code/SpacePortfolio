import type { Metadata } from "next";
import "./globals.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import ScrollProgress from "@/components/sub/ScrollProgress";
import SpaceshipScroll from "@/components/sub/SpaceshipScroll";

export const metadata: Metadata = {
  title: "Portfolio",
  description: "My portfolio",
  generator:
    process.env.NODE_ENV === "development" ? `dev-${Date.now()}` : "Next.js",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <body className="bg-[#030014] overflow-y-scroll overflow-x-hidden">
        <ScrollProgress />
        <SpaceshipScroll />
        <StarsCanvas />
        <Navbar />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
