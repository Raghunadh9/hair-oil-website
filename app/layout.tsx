import type { Metadata } from "next";
import { Montserrat } from "next/font/google";
import "./globals.css";
import { config } from "@/config/config";
import Navbar from "@/components/shared/components/Navbar";
import Footer from "@/components/shared/components/Footer";
import { ClerkProvider } from "@clerk/nextjs";

const montserrat = Montserrat({ subsets: ["latin"] });

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
          <main className="px-8">{children}</main>
          <Footer />
        </body>
      </html>
    </ClerkProvider>
  );
}
