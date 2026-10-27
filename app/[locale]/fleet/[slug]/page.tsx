import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowLeft, Check } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { cars } from "../../../../data/cars";
import type { AppLocale } from "../../../../i18n.config";
import { locales } from "../../../../i18n.config";
import { Link } from "../../../../i18n/navigation";
import { carName, featuredCars, getCar, isVessel, whatsappLink } from "../../../../lib/fleet";
import { PHONE, SITE_URL } from "../../../../lib/site";
import CarCard from "../../../components/CarCard";
import CarShowcase from "../../../components/CarShowcase";

type Props = { params: Promise<{ locale: string; slug: string }> };

export function generateStaticParams() {
	return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale, slug } = await params;
	const car = getCar(slug);
	if (!car) return {};
	const t = await getTranslations({ locale, namespace: "meta" });
	const title = `${carName(car)} | Amiral Motors`;
	const description = t("carDescription", { car: carName(car) });
	const path = `/fleet/${car.slug}`;

	return {
		title,
		description,
		alternates: {
			canonical: `/${locale}${path}`,
			languages: Object.fromEntries(locales.map((l) => [l, `/${l}${path}`]))
		},
		openGraph: {
			title,
			description,
			url: `/${locale}${path}`,
			images: car.colors.map((c) => ({ url: c.image, alt: `${carName(car)} ${c.name}` }))
		}
	};
}

export default async function CarPage({ params }: Props) {
	const { locale, slug } = await params;
	setRequestLocale(locale);
	const car = getCar(slug);
	if (!car) notFound();

	const t = await getTranslations();
	const tr = (key: string) => (t.has(`car.${key}`) ? t(`car.${key}`) : key);
	const vessel = isVessel(car);

	const specs = [
		{ label: t("car.category"), value: t(`categories.${car.category}`) },
		{ label: vessel ? t("car.engine") : t("car.fuel"), value: tr(car.specs.engine) },
		{ label: t("car.power"), value: car.specs.power },
		{ label: vessel ? t("car.speed") : t("car.acceleration"), value: car.specs.acceleration },
		{ label: t("car.transmission"), value: vessel ? "" : tr(car.specs.transmission) },
		{ label: t("car.drive"), value: vessel ? "" : car.specs.drive }
	].filter((s) => s.value);

	const message = t("car.whatsappMessage", { car: carName(car) });

	const sameClass = cars.filter((c) => c.category === car.category && c.slug !== car.slug);
	const similar = [...sameClass, ...featuredCars.filter((c) => c.slug !== car.slug && !sameClass.includes(c))].slice(0, 3);

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: carName(car),
		brand: { "@type": "Brand", name: car.brand },
		description: car.description[locale as AppLocale],
		image: car.colors.map((c) => `${SITE_URL}${c.image}`),
		url: `${SITE_URL}/${locale}/fleet/${car.slug}`
	};

	return (
		<div className="mx-auto max-w-[1320px] px-4 pt-8 sm:px-6 lg:px-10 lg:pt-10">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />

			<Link href="/fleet" className="group inline-flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
				<ArrowLeft size={16} strokeWidth={1.75} className="transition-transform group-hover:-translate-x-1 rtl:-scale-x-100 rtl:group-hover:translate-x-1" />
				{t("car.back")}
			</Link>

			<div className="mt-8 grid gap-10 lg:grid-cols-12 lg:gap-14">
				<div className="enter lg:col-span-7">
					<CarShowcase car={car} colorLabel={t("car.selectedColor")} />
				</div>

				<div className="enter lg:col-span-5" style={{ "--d": "100ms" } as React.CSSProperties}>
					<div className="lg:sticky lg:top-28">
						<p lang="en" className="eyebrow">{car.brand}</p>
						<h1 lang="en" className="wide mt-3 text-4xl uppercase sm:text-5xl">{car.model}</h1>
						<p className="mt-5 text-lg leading-relaxed text-muted">{car.description[locale as AppLocale]}</p>

						{/* Three columns when that fills the rows evenly, otherwise two. */}
						<dl className={`mt-8 grid gap-x-6 ${specs.length % 3 === 0 ? "grid-cols-3" : "grid-cols-2"}`}>
							{specs.map((s) => (
								<div key={s.label} className="border-t border-line py-4">
									<dt className="text-sm text-muted">{s.label}</dt>
									<dd className="mt-1 font-medium">{s.value}</dd>
								</div>
							))}
						</dl>

						<div className="mt-8 flex flex-col gap-3">
							<a
								href={whatsappLink(message)}
								target="_blank"
								rel="noopener noreferrer"
								className="inline-flex items-center justify-center gap-3 rounded-full bg-fg px-7 py-4 font-medium text-bg transition-opacity hover:opacity-90"
							>
								<FaWhatsapp className="text-xl text-[#1faa53]" />
								{t("car.reserve")}
							</a>
							<div className="grid grid-cols-2 gap-3">
								<a
									href={whatsappLink(message, 1)}
									target="_blank"
									rel="noopener noreferrer"
									className="rounded-full border border-white/20 px-4 py-3 text-center text-sm transition-colors hover:border-white/50"
								>
									{t("car.reserveAlt")}
								</a>
								<a
									href={PHONE.href}
									dir="ltr"
									className="rounded-full border border-white/20 px-4 py-3 text-center text-sm tabular-nums transition-colors hover:border-white/50"
								>
									{PHONE.display}
								</a>
							</div>
							<p className="mt-1 text-center text-sm text-muted">{t("car.priceOnRequest")}</p>
						</div>

						<div className="mt-10 rounded-lg bg-surface p-6">
							<h2 className="eyebrow">{t("car.included")}</h2>
							<ul className="mt-4 space-y-3">
								{[t("car.inc1"), t("car.inc2"), t("car.inc3")].map((item) => (
									<li key={item} className="flex items-start gap-3 text-sm">
										<Check size={16} strokeWidth={2} className="mt-0.5 shrink-0 text-muted" />
										{item}
									</li>
								))}
							</ul>
						</div>
					</div>
				</div>
			</div>

			<section className="pt-28">
				<h2 className="wide text-3xl sm:text-4xl">{t("car.similarCars")}</h2>
				<div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
					{similar.map((c) => (
						<CarCard key={c.id} car={c} />
					))}
				</div>
			</section>
		</div>
	);
}
