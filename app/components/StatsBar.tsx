"use client";
import { useTranslations } from "next-intl";
import AnimatedCounter from "./AnimatedCounter";

export default function StatsBar() {
	const t = useTranslations("stats");
	const stats: Array<
		| { type: "num"; label: string; value: number; suffix?: string }
		| { type: "text"; label: string }
	> = [
		{ type: "text", label: t("support") },
		{ type: "text", label: t("transfer") },
		{ type: "text", label: t("delivery") }
	];
	return (
		<section className="bg-black/40 border-y border-white/10">
			<div className="max-w-7xl mx-auto px-4 py-8 md:py-10 grid grid-cols-1 sm:grid-cols-3 gap-6 sm:gap-8 text-center">
				{stats.map((s, i) => (
					<div key={i} className="flex items-center justify-center text-white text-base sm:text-lg lg:text-xl font-semibold tracking-wide h-full w-full py-2">
						{s.type === "num" ? (
							<span className="flex items-center gap-1 justify-center">
								<AnimatedCounter end={s.value} />
								<span className="text-[#8c2016]">{s.suffix || ""}</span> {s.label}
							</span>
						) : (
							<span>{s.label}</span>
						)}
					</div>
				))}
			</div>
		</section>
	);
}

