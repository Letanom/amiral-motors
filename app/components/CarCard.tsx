"use client";
import { useState } from "react";
import Image from "next/image";
import { useTranslations } from "next-intl";
import type { Car } from "../../data/cars";
import { Link } from "../../i18n/navigation";
import { carName, isVessel } from "../../lib/fleet";
import { cn } from "../../lib/utils";

export function useSpecLine(car: Car) {
	const t = useTranslations("car");
	const tr = (key: string) => (t.has(key) ? t(key) : key);

	if (isVessel(car)) {
		return [car.specs.power, car.specs.acceleration].filter(Boolean);
	}
	return [tr(car.specs.engine), tr(car.specs.transmission)];
}

/** Feeds the glowing edge: pointer direction from the card centre and how close it is to the edge. */
function trackPointer(e: React.PointerEvent<HTMLElement>) {
	const el = e.currentTarget;
	const rect = el.getBoundingClientRect();
	const dx = e.clientX - rect.left - rect.width / 2;
	const dy = e.clientY - rect.top - rect.height / 2;

	let angle = (Math.atan2(dy, dx) * 180) / Math.PI + 90;
	if (angle < 0) angle += 360;

	// 0 at the centre, 1 on the nearest edge.
	const kx = dx === 0 ? Infinity : rect.width / 2 / Math.abs(dx);
	const ky = dy === 0 ? Infinity : rect.height / 2 / Math.abs(dy);
	const edge = Math.min(Math.max(1 / Math.min(kx, ky), 0), 1);

	el.style.setProperty("--pointer-deg", `${angle.toFixed(2)}deg`);
	el.style.setProperty("--pointer-d", (edge * 100).toFixed(2));
}

export function useColorName() {
	const t = useTranslations("colors");
	return (color: Car["colors"][number]) => (t.has(color.nameKey) ? t(color.nameKey) : color.name);
}

export function Swatches({
	colors,
	selected,
	onSelect,
	size = "sm"
}: {
	colors: Car["colors"];
	selected: Car["colors"][number];
	onSelect: (color: Car["colors"][number]) => void;
	size?: "sm" | "lg";
}) {
	const colorName = useColorName();

	return (
		<div className="flex flex-wrap items-center gap-2.5">
			{colors.map((option) => {
				const active = option.image === selected.image;
				return (
					<button
						key={option.image}
						type="button"
						onClick={() => onSelect(option)}
						aria-label={colorName(option)}
						aria-pressed={active}
						title={colorName(option)}
						className={cn(
							"rounded-full border border-white/45 transition-shadow",
							size === "lg" ? "h-7 w-7" : "h-4 w-4",
							active ? "ring-1 ring-fg ring-offset-2 ring-offset-bg" : "hover:ring-1 hover:ring-white/40 hover:ring-offset-2 hover:ring-offset-bg"
						)}
						style={{ backgroundColor: option.hex }}
					/>
				);
			})}
		</div>
	);
}

export default function CarCard({ car, priority = false }: { car: Car; priority?: boolean }) {
	const c = useTranslations("categories");
	const colorName = useColorName();
	const specs = useSpecLine(car);
	const [color, setColor] = useState(car.colors[0]);
	const href = `/fleet/${car.slug}`;

	return (
		<article onPointerMove={trackPointer} className="glow-card group h-full">
			<div className="glow-card__edge" aria-hidden />
			<div className="glow-card__body relative flex flex-col p-2.5 pb-5">
				<div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-raised">
					<Image
						key={color.image}
						src={color.image}
						alt={`${carName(car)} — ${colorName(color)}`}
						fill
						priority={priority}
						sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
						className="img-in object-cover transition-transform duration-[1.2s] ease-out-quint group-hover:scale-[1.04]"
					/>
				</div>

				<div className="px-2.5">
					<div className="mt-5 flex items-center justify-between gap-4">
						<span lang="en" className="eyebrow">
							{car.brand}
						</span>
						<span className="eyebrow">{c(car.category)}</span>
					</div>
					<h3 lang="en" className="wide mt-2 text-xl uppercase sm:text-[1.375rem]">
						{/* Stretched link: the whole card, photo included, opens the car. */}
						<Link href={href} className="after:absolute after:inset-0">
							{car.model}
						</Link>
					</h3>
					<p className="mt-2 text-sm text-muted">{specs.join(" · ")}</p>

					{car.colors.length > 1 && (
						<div className="relative z-10 mt-4 flex items-center gap-3 self-start">
							<Swatches colors={car.colors} selected={color} onSelect={setColor} />
							<span className="text-xs text-muted">{colorName(color)}</span>
						</div>
					)}
				</div>
			</div>
			<div className="glow-card__glow" aria-hidden />
		</article>
	);
}
