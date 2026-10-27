import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { Archivo, IBM_Plex_Sans_Arabic } from "next/font/google";
import { hasLocale, NextIntlClientProvider } from "next-intl";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { isRtl, locales } from "../../i18n.config";
import { routing } from "../../i18n/routing";
import { SITE_URL } from "../../lib/site";
import Header from "../components/Header";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import "../globals.css";

const archivo = Archivo({
	variable: "--font-archivo",
	subsets: ["latin", "latin-ext"],
	axes: ["wdth"]
});

const plexArabic = IBM_Plex_Sans_Arabic({
	variable: "--font-plex-arabic",
	subsets: ["arabic"],
	weight: ["400", "500", "600"],
	preload: false
});

type Props = {
	children: React.ReactNode;
	params: Promise<{ locale: string }>;
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export async function generateMetadata({ params }: Omit<Props, "children">): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });

	return {
		metadataBase: new URL(SITE_URL),
		title: t("title"),
		description: t("description"),
		keywords: t("keywords"),
		authors: [{ name: "Amiral Motors" }],
		formatDetection: { email: false, address: false, telephone: false },
		alternates: {
			canonical: `/${locale}`,
			languages: Object.fromEntries(locales.map((l) => [l, `/${l}`]))
		},
		openGraph: {
			title: t("title"),
			description: t("description"),
			url: `/${locale}`,
			siteName: "Amiral Motors",
			locale,
			type: "website",
			images: [{ url: "/lamborghini-huracan.webp", width: 1536, height: 1024 }]
		}
	};
}

export default async function LocaleLayout({ children, params }: Props) {
	const { locale } = await params;
	if (!hasLocale(routing.locales, locale)) notFound();
	setRequestLocale(locale);

	const fonts = [archivo, plexArabic].map((f) => f.variable).join(" ");

	return (
		<html lang={locale} dir={isRtl(locale) ? "rtl" : "ltr"} className={`${fonts} antialiased`}>
			<body className="flex min-h-dvh flex-col font-sans">
				<NextIntlClientProvider>
					<Header />
					<main className="flex-1">{children}</main>
					<Footer />
					<FloatingWhatsApp />
				</NextIntlClientProvider>
			</body>
		</html>
	);
}
