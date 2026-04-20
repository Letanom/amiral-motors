"use client";
import { useMemo, useState } from "react";
import { cars } from "../../../data/cars";
import Image from "next/image";
import CarCard from "../../components/CarCard";
import { useTranslations } from "next-intl";

const categories = ["All", "SUV", "Sedan", "Cabrio", "Sports", "Yacht", "Helicopter"] as const;

export default function FleetPage() {
	const t = useTranslations("fleet");
	const [cat, setCat] = useState<(typeof categories)[number]>("All");
	const [search, setSearch] = useState("");

	const filtered = useMemo(() => {
		const searchLower = search.trim().toLowerCase();
		return cars.filter((car) => {
			const matchesCategory = cat === "All" || car.category === cat;
			if (!searchLower) return matchesCategory;

			const fullName = `${car.brand} ${car.model}`.toLowerCase();
			const matchesSearch = fullName.includes(searchLower);
			
			return matchesCategory && matchesSearch;
		});
	}, [cat, search]);

	return (
		<div className="max-w-7xl mx-auto px-4 py-10 text-center">
			<div className="max-w-xl mx-auto mb-10 group">
				<div className="relative h-24 rounded-2xl overflow-hidden bg-black/60 border border-white/5 flex items-center justify-center shadow-xl backdrop-blur-sm transition-all duration-300 group-hover:bg-black/80">
					<Image
						src="/logom.webp"
						alt="Amiral Motors"
						fill
						className="object-contain p-2"
						priority
					/>
				</div>
			</div>

			<div className="flex flex-col md:flex-row gap-4 mb-8">
				<div className="flex-1 flex flex-wrap gap-3">
					{categories.map((c) => (
						<button
							key={c}
							onClick={() => setCat(c)}
							className={`px-4 py-2 rounded-full border transition-all ${
								c === cat
									? "bg-[#8c2016] text-white border-transparent"
									: "border-white/15 hover:bg-white/5"
							}`}
						>
							{c === "All" ? t("all") : c}
						</button>
					))}
				</div>

				<div className="relative min-w-[300px]">
					<input
						type="text"
						placeholder={t("search")}
						value={search}
						onChange={(e) => setSearch(e.target.value)}
						className="w-full px-5 py-2.5 rounded-full bg-white/5 border border-white/15 focus:border-[#8c2016] focus:ring-1 focus:ring-[#8c2016] outline-none transition-all pr-12"
					/>
					<div className="absolute right-4 top-1/2 -translate-y-1/2 text-white/40">
						<svg
							xmlns="http://www.w3.org/2000/svg"
							className="h-5 w-5"
							fill="none"
							viewBox="0 0 24 24"
							stroke="currentColor"
						>
							<path
								strokeLinecap="round"
								strokeLinejoin="round"
								strokeWidth={2}
								d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
							/>
						</svg>
					</div>
				</div>
			</div>

			<div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
				{filtered.map((car) => (
					<CarCard key={car.id} car={car} />
				))}
			</div>

			{filtered.length === 0 && (
				<div className="text-center py-20 opacity-50">
					<p className="text-xl">{t("no_results")}</p>
				</div>
			)}
		</div>
	);
}

