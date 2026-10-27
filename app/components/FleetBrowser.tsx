"use client";
import { useMemo, useState } from "react";
import { useSearchParams } from "next/navigation";
import { useTranslations } from "next-intl";
import { Search } from "lucide-react";
import { cars } from "../../data/cars";
import { carName, categories, type CategoryFilter } from "../../lib/fleet";
import { cn } from "../../lib/utils";
import CarCard from "./CarCard";

const counts = Object.fromEntries(
	categories.map((c) => [c, c === "All" ? cars.length : cars.filter((car) => car.category === c).length])
) as Record<CategoryFilter, number>;

const isCategory = (value: string | null): value is CategoryFilter =>
	categories.includes(value as CategoryFilter);

export default function FleetBrowser() {
	const t = useTranslations("fleet");
	const c = useTranslations("categories");
	const params = useSearchParams();
	const initial = params.get("cat");
	const [category, setCategory] = useState<CategoryFilter>(isCategory(initial) ? initial : "All");
	const [query, setQuery] = useState("");

	const visible = useMemo(() => {
		const q = query.trim().toLocaleLowerCase();
		return cars.filter(
			(car) =>
				(category === "All" || car.category === category) &&
				(!q || carName(car).toLocaleLowerCase().includes(q))
		);
	}, [category, query]);

	const select = (next: CategoryFilter) => {
		setCategory(next);
		const url = new URL(window.location.href);
		if (next === "All") url.searchParams.delete("cat");
		else url.searchParams.set("cat", next);
		window.history.replaceState(null, "", url);
	};

	return (
		<>
			<div className="sticky top-16 z-20 -mx-4 border-b border-line bg-bg/95 px-4 py-4 sm:-mx-6 sm:px-6 lg:top-[4.5rem] lg:-mx-10 lg:px-10">
				<div className="flex flex-col gap-4 lg:flex-row lg:items-center lg:justify-between">
					<div className="no-scrollbar -mx-4 flex gap-2 overflow-x-auto px-4 lg:mx-0 lg:px-0">
						{categories.map((cat) => (
							<button
								key={cat}
								type="button"
								onClick={() => select(cat)}
								aria-pressed={category === cat}
								className={cn(
									"shrink-0 rounded-full border px-4 py-2 text-sm transition-colors",
									category === cat ? "border-fg bg-fg text-bg" : "border-line text-muted hover:border-white/30 hover:text-fg"
								)}
							>
								{c(cat)} <span className="ms-1 opacity-60 tabular-nums">{counts[cat]}</span>
							</button>
						))}
					</div>
					<label className="relative block lg:w-72">
						<span className="sr-only">{t("search")}</span>
						<Search size={16} strokeWidth={1.75} className="pointer-events-none absolute start-4 top-1/2 -translate-y-1/2 text-muted" />
						<input
							id="fleet-search"
							type="search"
							value={query}
							onChange={(e) => setQuery(e.target.value)}
							placeholder={t("search")}
							className="w-full rounded-full border border-line bg-surface py-2.5 ps-11 pe-4 text-sm placeholder:text-muted focus:border-white/40 focus:outline-none"
						/>
					</label>
				</div>
			</div>

			<p className="mt-8 text-sm text-muted">{t("count", { count: visible.length })}</p>

			{visible.length > 0 ? (
				<div className="mt-6 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
					{visible.map((car, i) => (
						<CarCard key={car.id} car={car} priority={i < 3} />
					))}
				</div>
			) : (
				<div className="mt-6 rounded-lg bg-surface px-6 py-16 text-center">
					<p className="text-lg">{t("no_results")}</p>
					<button
						type="button"
						onClick={() => {
							setQuery("");
							select("All");
						}}
						className="mt-5 rounded-full border border-white/20 px-5 py-2.5 text-sm transition-colors hover:border-white/50"
					>
						{t("clear")}
					</button>
				</div>
			)}
		</>
	);
}
