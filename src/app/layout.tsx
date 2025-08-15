import type { Metadata } from "next";
import "./globals.css";
import { geistMono, geistSans } from "../config/fonts";
import { Footer } from "@/components";
import { AuthProvider } from "./auth/components/AuthProvider";


export const metadata: Metadata = {
  title: "Teslo Shop",
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
