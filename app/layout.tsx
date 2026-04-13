import type { Metadata } from "next";
import { Inter, Playfair_Display } from "next/font/google";
import "./globals.css";
import { defaultLocale } from "../i18n.config";

const inter = Inter({
  variable: "--font-inter",
  subsets: ["latin"]
});

const playfair = Playfair_Display({
  variable: "--font-playfair",
  subsets: ["latin"]
});

export const metadata: Metadata = {
  title: "Amiral Motors | İstanbul Lüks Araç Kiralama & VIP Rent a Car",
  description:
    "İstanbul'da lüks araç kiralama (VIP rent a car) hizmeti. En iyi fiyat garantisiyle premium, spor ve VIP Vito kiralayın. Amiral Motors ayrıcalığıyla yola çıkın.",
  keywords: "lüks araç kiralama, araç kiralama, rent a car, vip araç kiralama, spor araç kiralama, istanbul lüks araç kiralama, amiral motors, suv kiralama, ucuz araç kiralama, oto kiralama",
  authors: [{ name: "Amiral Motors" }],
  formatDetection: {
    email: false,
    address: false,
    telephone: false,
  },
  openGraph: {
    title: "Amiral Motors | İstanbul Lüks Araç Kiralama & Premium Rent a Car",
    description: "Amiral Motors ile İstanbul'da en lüks araçları kiralayın. Güvenilir rent a car deneyimi, 7/24 destek ve havalimanı teslimatı.",
    type: "website",
    locale: "tr_TR",
    url: "https://amiralmotors.com",
    siteName: "Amiral Motors"
  }
};

export default async function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang={defaultLocale} dir="ltr" className={`${inter.variable} ${playfair.variable} h-full antialiased`}>
      <body className="min-h-full flex flex-col bg-[#0a0a0a] text-white">{children}</body>
    </html>
  );
}
