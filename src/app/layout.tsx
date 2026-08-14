import type { Metadata } from "next";
import { Gugi } from "next/font/google";
import { AuthProvider } from "@/lib/auth/AuthContext";
import { AuthGateProvider } from "@/components/auth/AuthGateModal";
import { CurrencyProvider } from "@/context/CurrencyContext";
import SmoothScroll from "@/components/layout/SmoothScroll";
import "./globals.css";

const gugi = Gugi({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-gugi",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Genzcodemy — Learn to Ship, Not Just to Study",
  description:
    "Genzcodemy is an edtech platform training the next generation of developers and analysts through project-first, mentor-led courses.",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`h-full antialiased ${gugi.variable}`}>
      <body className="min-h-full flex flex-col bg-white text-[#1a1a1a]">
        <SmoothScroll />
        <CurrencyProvider>
          <AuthProvider>
            <AuthGateProvider>{children}</AuthGateProvider>
          </AuthProvider>
        </CurrencyProvider>
      </body>
    </html>
  );
}
