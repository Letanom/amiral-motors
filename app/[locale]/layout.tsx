import { NextIntlClientProvider } from "next-intl";
import { notFound } from "next/navigation";
import { AppLocale, locales, isRtl } from "../../i18n.config";
import Navbar from "../components/Navbar";
import Footer from "../components/Footer";
import FloatingWhatsApp from "../components/FloatingWhatsApp";
import FloatingSahibinden from "../components/FloatingSahibinden";
import "../globals.css";
import { Metadata } from "next";

export async function generateMetadata({ params }: { params: any }): Promise<Metadata> {
	const resolved = await params;
	const locale: AppLocale = resolved.locale;

	if (locale === 'tr') {
		return {
			title: "Amiral Motors | İstanbul Lüks Araç Kiralama & VIP Rent a Car",
			description: "İstanbul'da lüks araç kiralama hizmeti. Amiral Motors ayrıcalığıyla premium, SUV, spor ve VIP Vito araç kiralayın. En iyi fiyatlar, 7/24 destek ve havalimanı teslimatı.",
			keywords: "lüks araç kiralama, araç kiralama, rent a car, vip araç kiralama, spor araç kiralama, istanbul lüks araç kiralama, amiral motors, ucuz araç kiralama, oto kiralama, istanbul rent a car, şoförlü araç kiralama, havalimanı araç kiralama",
			openGraph: {
				title: "Amiral Motors | İstanbul Lüks Araç Kiralama",
				description: "İstanbul'da premium rent a car hizmetiyle ayrıcalıklı sürüş keyfini yaşayın.",
				url: "https://amiralmotors.com/tr",
				siteName: "Amiral Motors",
				locale: "tr_TR",
				type: "website",
			},
			icons: { icon: "/favicon.ico" },
		};
	}

	if (locale === 'ar') {
		return {
			title: "Amiral Motors | تأجير السيارات الفاخرة وتأجير سيارات VIP في اسطنبول",
			description: "استأجر سيارات فاخرة ورياضية في اسطنبول مع أميرال موتورز. أفضل الأسعار، دعم 24/7، وتوصيل للمطار.",
			keywords: "تأجير سيارات اسطنبول, تأجير سيارات فاخرة, سيارات VIP للتاجير, ايجار سيارات مطار اسطنبول, اميرال موتورز, Rent a car Istanbul",
			icons: { icon: "/favicon.ico" },
		};
	}

	if (locale === 'de') {
		return {
			title: "Amiral Motors | Luxusautovermietung & VIP Rent a Car in Istanbul",
			description: "Mieten Sie Premium- und Sportwagen in Istanbul. Beste Preise, 24/7-Support und Flughafenlieferung mit Amiral Motors.",
			keywords: "autovermietung istanbul, luxusautovermietung istanbul, vip mietwagen, amiral motors",
			icons: { icon: "/favicon.ico" },
		};
	}

	// Default fallback (English)
	return {
		title: "Amiral Motors | Luxury Car Rental Istanbul & VIP Rent a Car",
		description: "Premium luxury car rental services in Istanbul. Rent sports cars, SUVs, and VIP vehicles with Amiral Motors. Best prices, 24/7 support, airport delivery.",
		keywords: "luxury car rental istanbul, rent a car istanbul, vip rent a car, sport car rental, amiral motors, suv rental, cheap car rental istanbul, airport transfer istanbul",
		icons: {
			icon: "/favicon.ico",
		},
	};
}

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

