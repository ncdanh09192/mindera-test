import type { Metadata } from "next";
import "./globals.css";

export const metadata: Metadata = {
  title: "Mindera Shopify Store",
  description: "Headless Shopify product listing page",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className="antialiased">
        {children}
      </body>
    </html>
  );
}
