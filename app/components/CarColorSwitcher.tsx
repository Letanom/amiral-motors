"use client";
import { useState } from "react";
import Image from "next/image";
import { AnimatePresence, motion } from "framer-motion";
import type { CarColor } from "../../data/cars";

export default function CarColorSwitcher({ colors }: { colors: CarColor[] }) {
	const [selected, setSelected] = useState<CarColor>(colors[0]);
	return (
		<div>
			<div className="relative aspect-[16/10] rounded-xl overflow-hidden bg-black/30">
				<AnimatePresence mode="wait">
					<motion.div
						key={selected.nameKey}
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0 }}
						transition={{ duration: 0.3 }}
						className="absolute inset-0"
					>
						<Image src={selected.image} alt={selected.name} fill className="object-cover" />
					</motion.div>
				</AnimatePresence>
			</div>
			<div className="mt-4 flex items-center gap-3">
				{colors.map((c) => {
					const active = c.nameKey === selected.nameKey;
					return (
						<button
							key={c.nameKey}
							aria-label={c.name}
							onClick={() => setSelected(c)}
							className={`w-7 h-7 rounded-full border ${active ? "ring-2 ring-[#8c2016]" : "border-white/30"}`}
							style={{ backgroundColor: c.hex }}
							title={c.name}
						/>
					);
				})}
			</div>
			<div className="mt-2 text-sm text-white/80">{selected.name}</div>
		</div>
	);
}

