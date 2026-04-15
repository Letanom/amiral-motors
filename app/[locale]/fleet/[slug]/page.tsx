import { Metadata } from "next";
import { notFound } from "next/navigation";
import { cars } from "../../../../data/cars";
import CarColorSwitcher from "../../../components/CarColorSwitcher";
import WhatsAppButton from "../../../components/WhatsAppButton";
import { getTranslations } from "next-intl/server";

type Props = { params: { slug: string; locale: "tr" | "en" | "ar" | "de" } };

export function generateStaticParams() {
	return cars.map((c) => ({ slug: c.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const car = cars.find((c) => c.slug === params.slug);
	if (!car) return {};
	const title = `${car.brand} ${car.model} | AMİRAL GROUP`;
	const description =
		`Luxury car rental in Istanbul: ${car.brand} ${car.model}. Premium service, 24/7 support, multilingual.`;
	const url = `https://amiral-group.example.com/fleet/${car.slug}`;
	return {
		title,
		description,
		alternates: { canonical: url },
		openGraph: {
			title,
			description,
			images: car.colors.map((c) => ({ url: c.image, alt: `${car.brand} ${car.model} ${c.name}` })),
			type: "website",
			url
		}
	};
}

export default async function CarDetailPage({ params }: Props) {
	const t = await getTranslations();
	const car = cars.find((c) => c.slug === params.slug);
	if (!car) return notFound();

	const jsonLd = {
		"@context": "https://schema.org",
		"@type": "Product",
		name: `${car.brand} ${car.model}`,
		description: car.description[params.locale],
		image: car.colors.map((c) => c.image),
		brand: car.brand,
		offers: {
			"@type": "Offer",
			priceCurrency: "TRY",
			price: car.dailyPrice,
			availability: "https://schema.org/InStock"
		}
	};

	return (
		<div className="max-w-7xl mx-auto px-4 py-16 grid gap-8 lg:grid-cols-5">
			<script type="application/ld+json" dangerouslySetInnerHTML={{ __html: JSON.stringify(jsonLd) }} />
			<div className="lg:col-span-3">
				<CarColorSwitcher colors={car.colors} />
			</div>
			<div className="lg:col-span-2">
				<h1 className="text-3xl font-semibold">
					{car.brand} {car.model}
				</h1>
				<p className="text-white/80 mt-3">{car.description[params.locale]}</p>
				{car.category !== "Yacht" && car.category !== "Helicopter" && (
					<table className="mt-6 w-full text-sm border-separate border-spacing-y-2">
						<tbody>
							<tr className="bg-white/[0.03]">
								<td className="px-3 py-2 text-white/60">{t("car.engine")}</td>
								<td className="px-3 py-2">{car.specs.engine}</td>
							</tr>
							<tr className="bg-white/[0.03]">
								<td className="px-3 py-2 text-white/60">Power</td>
								<td className="px-3 py-2">{car.specs.power}</td>
							</tr>
							<tr className="bg-white/[0.03]">
								<td className="px-3 py-2 text-white/60">0-100 km/h</td>
								<td className="px-3 py-2">{car.specs.acceleration}</td>
							</tr>
							<tr className="bg-white/[0.03]">
								<td className="px-3 py-2 text-white/60">{t("car.seats")}</td>
								<td className="px-3 py-2">{car.specs.seats}</td>
							</tr>
							<tr className="bg-white/[0.03]">
								<td className="px-3 py-2 text-white/60">{t("car.transmission")}</td>
								<td className="px-3 py-2">{car.specs.transmission}</td>
							</tr>
							<tr className="bg-white/[0.03]">
								<td className="px-3 py-2 text-white/60">Drive</td>
								<td className="px-3 py-2">{car.specs.drive}</td>
							</tr>
						</tbody>
					</table>
				)}
				<div className="mt-6 grid grid-cols-1 sm:grid-cols-2 gap-3">
					<WhatsAppButton />
					<WhatsAppButton />
				</div>
			</div>
			<div className="lg:col-span-5 mt-8">
				<h2 className="text-2xl font-semibold mb-4">Benzer Araçlar</h2>
				{/* Similar cars placeholder */}
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{cars
						.filter((c) => c.category === car.category && c.slug !== car.slug)
						.slice(0, 3)
						.map((c) => (
							<div key={c.id} className="border border-white/10 rounded-xl p-4">
								{c.brand} {c.model}
							</div>
						))}
				</div>
			</div>
		</div>
	);
}

