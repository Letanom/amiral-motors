"use client";
import { useState } from "react";
import Image from "next/image";
import Link from "next/link";
import { Car } from "../../data/cars";
import { motion, AnimatePresence } from "framer-motion";
import { useTranslations } from "next-intl";

export default function CarCard({ car }: { car: Car }) {
	const t = useTranslations("car");
	const [selectedColor, setSelectedColor] = useState(car.colors[0]);

	return (
		<motion.article
			initial={{ opacity: 0, y: 16 }}
			whileInView={{ opacity: 1, y: 0 }}
			viewport={{ once: true }}
			transition={{ duration: 0.4 }}
			className="group rounded-2xl border border-white/10 overflow-hidden bg-white/[0.02] hover:bg-white/[0.05] transition flex flex-col h-full"
		>
			<div className="relative aspect-[16/10] overflow-hidden bg-black/20">
				<AnimatePresence mode="wait">
					<motion.div
						key={selectedColor.image}
						initial={{ opacity: 0.5 }}
						animate={{ opacity: 1 }}
						exit={{ opacity: 0.5 }}
						transition={{ duration: 0.3 }}
						className="relative w-full h-full"
					>
						<Image
							src={selectedColor.image}
							alt={`${car.brand} ${car.model}`}
							fill
							className="object-cover transition-transform duration-500 group-hover:scale-[1.05]"
						/>
					</motion.div>
				</AnimatePresence>
				<div className="absolute inset-0 ring-0 group-hover:ring-2 group-hover:ring-[#8c2016]/60 transition pointer-events-none" />
			</div>
			<div className="p-4 flex flex-col flex-grow">
				<h3 className="font-semibold text-lg uppercase tracking-tight">
					{car.brand} {car.model}
				</h3>
				{car.category !== "Yacht" && car.category !== "Helicopter" && (
					<div className="mt-2 text-xs text-white/60 font-medium flex items-center gap-2">
						<span className="px-2 py-0.5 rounded bg-white/5 border border-white/10">{t(car.specs.engine)}</span>
						<span>•</span>
						<span>{car.specs.seats} {t("seats")}</span>
						<span>•</span>
						<span>{t(car.specs.transmission)}</span>
					</div>
				)}

				{car.colors.length > 1 && (
					<div className="mt-4 flex items-center gap-2.5">
						{car.colors.map((c) => (
							<button
								key={c.nameKey}
								title={c.name}
								onClick={(e) => {
									e.preventDefault();
									setSelectedColor(c);
								}}
								className={`w-6 h-6 rounded-full border-2 transition-all duration-200 hover:scale-110 ${
									selectedColor.nameKey === c.nameKey ? "border-[#8c2016] scale-110" : "border-white/10"
								}`}
								style={{ backgroundColor: c.hex }}
							/>
						))}
						<span className="text-[10px] text-white/40 uppercase tracking-wider ml-1">{t("colors")}</span>
					</div>
				)}

				<div className="mt-auto pt-6 flex items-center justify-between">
					<div className="text-[#8c2016] font-medium">
						{car.dailyPrice > 0 ? `${car.dailyPrice} TL / Gün` : ""}
					</div>
					<a
						href={`https://wa.me/905316350034?text=${encodeURIComponent(
							`${useTranslations("whatsapp")("message")}\n\n*${car.brand} ${car.model}*`
						)}`}
						target="_blank"
						rel="noopener noreferrer"
						className="inline-flex items-center justify-center rounded-full bg-[#8c2016]/10 text-[#8c2016] px-5 py-2 text-sm font-medium hover:bg-[#8c2016] hover:text-white transition-all active:scale-95 border border-[#8c2016]/20"
					>
						{t("contact_us")}
					</a>
				</div>
			</div>
		</motion.article>
	);
}

