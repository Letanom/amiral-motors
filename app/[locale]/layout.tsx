import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { AppLocale, locales, isRtl } from "../../i18n.config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import FloatingSahibinden from "../components/FloatingSahibinden";
import "../globals.css";
import { Metadata } from "next";

export const metadata: Metadata = {
	title: "Amiral Group | Istanbul Luxury Car Rental",
	description: "Discover luxury and feel the freedom with Amiral Group. Premium car rental services in Istanbul.",
	icons: {
		icon: "/favicon.ico",
	},
};

export function generateStaticParams() {
	return locales.map((locale) => ({ locale }));
}

export const dynamic = "force-static";

export default async function LocaleLayout({
	children,
	params
}: {
	children: React.ReactNode;
	params: any;
}) {
	const resolved = await params;
	const locale: AppLocale = resolved.locale;
	if (!locales.includes(locale)) {
		notFound();
	}
	// Load messages per-locale
	// eslint-disable-next-line @typescript-eslint/no-var-requires
	const messages = require(`../../messages/${locale}.json`);

	return (
		<NextIntlClientProvider locale={locale} messages={messages}>
			<div className="min-h-dvh flex flex-col bg-[#0a0a0a] text-white">
				<Navbar locale={locale} dir={isRtl(locale) ? "rtl" : "ltr"} />
				<main className="flex-1">{children}</main>
				<Footer locale={locale} />
				<FloatingWhatsApp />
				<FloatingSahibinden />
			</div>
		</NextIntlClientProvider>
	);
}

