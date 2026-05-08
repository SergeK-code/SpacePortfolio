import "./globals.css";
import "./cursor.css";
import StarsCanvas from "@/components/main/StarBackground";
import Navbar from "@/components/main/Navbar";
import ScrollProgress from "@/components/sub/ScrollProgress";
import SpaceshipScroll from "@/components/sub/SpaceshipScroll";
import StructuredData from "@/components/seo/StructuredData";
import { getRootMetadata } from "@/lib/site-config";
import ToastProvider from "@/components/ui/ToastProvider";
import CustomCursor from "@/components/ui/CustomCursor";

export const metadata = getRootMetadata();

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <head>
        <StructuredData />
      </head>
      <body className="bg-[#030014] overflow-y-scroll overflow-x-hidden">
        <ScrollProgress />
        <SpaceshipScroll />
        <StarsCanvas />
        <Navbar />
        <ToastProvider />
        <CustomCursor />
        {children}
        {/* <Footer /> */}
      </body>
    </html>
  );
}
