import type { Metadata } from "next";
import { Suspense } from "react";
import { getTranslations, setRequestLocale } from "next-intl/server";
import FleetBrowser from "../../components/FleetBrowser";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });
	return {
		title: t("fleetTitle"),
		description: t("fleetDescription"),
		alternates: { canonical: `/${locale}/fleet` }
	};
}

export default async function FleetPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("fleet");

	return (
		<div className="mx-auto max-w-[1320px] px-4 pt-12 sm:px-6 lg:px-10 lg:pt-16">
			<header className="enter max-w-2xl pb-10">
				<h1 className="wide text-4xl sm:text-6xl">{t("title")}</h1>
				<p className="mt-5 text-lg leading-relaxed text-muted">{t("subtitle")}</p>
			</header>
			<Suspense>
				<FleetBrowser />
			</Suspense>
		</div>
	);
}
