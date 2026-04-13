"use client";
import HeroSection from "../components/HeroSection";
import StatsBar from "../components/StatsBar";
import CarCard from "../components/CarCard";
import { cars } from "../../data/cars";
import Link from "next/link";
import { useTranslations } from "next-intl";
import ExperienceSection from "../components/ExperienceSection";
import SuccessCounters from "../components/SuccessCounters";

export const dynamic = "force-static";

export default function HomePage() {
	const t = useTranslations("hero");
	const featured = cars.filter((c) => c.featured).slice(0, 6);

	return (
		<div>
			<HeroSection />
			<StatsBar />
			<section id="featured" className="max-w-7xl mx-auto px-4 py-16">
				<h2 className="text-2xl md:text-3xl font-semibold mb-6">{t("featured")}</h2>
				<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
					{featured.map((car) => (
						<CarCard key={car.id} car={car} />
					))}
				</div>
				<div className="mt-8 text-center">
					<Link
						href="fleet"
						className="inline-block rounded-full bg-[#8c2016] text-white px-6 py-3 font-medium hover:opacity-90 transition"
					>
						{t("cta_fleet")}
					</Link>
				</div>
			</section>
			<ExperienceSection />
			<SuccessCounters />
		</div>
	);
}

