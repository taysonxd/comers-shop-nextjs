import type { Metadata } from "next";
import { AuthProvider } from "./auth/components/AuthProvider";

import "./globals.css";

import { geistMono, geistSans } from "../config/fonts";

export const metadata: Metadata = {
  title: "Comers Shop",
  description: "Tienda virtual de productos",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <AuthProvider>
      <html lang="en">
        <body
          className={`${geistSans.variable} ${geistMono.variable} antialiased`}
        >
          {children}
        </body>
      </html>
    </AuthProvider>
  );
}
