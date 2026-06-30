import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import { LayoutShell } from "@/components/layout/LayoutShell";
import { Toaster } from "sonner";

const geist = Geist({ variable: "--font-sans", subsets: ["latin"] });

export const metadata: Metadata = {
  title: "CNC Laundry — Layanan Laundry Premium",
  description:
    "Rasakan layanan laundry premium bersama CNC Laundry. Cuci profesional, antar cepat, dan ramah lingkungan.",
  keywords: ["laundry", "cuci baju", "laundry kiloan", "CNC Laundry", "Barabai", "Kalimantan Selatan"],
};

export default function RootLayout({
  children,
}: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="id" className={`${geist.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-background">
        <LayoutShell>
          <main className="flex-1">{children}</main>
        </LayoutShell>
        <Toaster richColors position="top-right" />
      </body>
    </html>
  );
}
