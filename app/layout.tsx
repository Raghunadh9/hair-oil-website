import type { Metadata } from "next";
import { Montserrat, Poppins } from "next/font/google";
import "./globals.css";
import { config } from "@/config/config";
import Navbar from "@/components/shared/components/Navbar";
import Footer from "@/components/shared/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";
import toast, { Toaster } from "react-hot-toast";

const montserrat = Poppins({ weight: "400", subsets: ["latin"] });

export const metadata: Metadata = {
  title: config.websiteTitle,
  description: config.websiteDescription,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <ClerkProvider
      appearance={{
        variables: { colorPrimary: config.websiteThemeColor },
      }}
    >
      <html lang="en">
        <body className={montserrat.className}>
          <Navbar />
          <main className="">{children}</main>
          <Footer />
          <Toaster />
        </body>
      </html>
    </ClerkProvider>
  );
}
