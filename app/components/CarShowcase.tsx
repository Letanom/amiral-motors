"use client";
import { useState } from "react";
import Image from "next/image";
import type { Car } from "../../data/cars";
import { carName } from "../../lib/fleet";
import { Swatches, useColorName } from "./CarCard";

/** Large photo with a colour picker underneath; picking a colour swaps the photo. */
export default function CarShowcase({ car, colorLabel }: { car: Car; colorLabel: string }) {
	const colorName = useColorName();
	const [color, setColor] = useState(car.colors[0]);

	return (
		<div>
			<div className="relative aspect-[3/2] overflow-hidden rounded-lg bg-surface">
				<Image
					key={color.image}
					src={color.image}
					alt={`${carName(car)} — ${colorName(color)}`}
					fill
					priority
					sizes="(min-width: 1024px) 58vw, 100vw"
					className="img-in object-cover"
				/>
			</div>
			{car.colors.length > 1 && (
				<div className="mt-5 flex flex-wrap items-center justify-between gap-4">
					<Swatches colors={car.colors} selected={color} onSelect={setColor} size="lg" />
					<p className="text-sm text-muted">
						{colorLabel}: <span className="text-fg">{colorName(color)}</span>
					</p>
				</div>
			)}
		</div>
	);
}
