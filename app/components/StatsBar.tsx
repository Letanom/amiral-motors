"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { Headset, Car, MapPin } from "lucide-react";

export default function StatsBar() {
	const t = useTranslations("stats");
	
	const features = [
		{ 
			icon: <Headset className="w-8 h-8 md:w-10 md:h-10 text-[#c9a84c]" />, 
			label: t("support")
		},
		{ 
			icon: <Car className="w-8 h-8 md:w-10 md:h-10 text-[#c9a84c]" />, 
			label: t("transfer")
		},
		{ 
			icon: <MapPin className="w-8 h-8 md:w-10 md:h-10 text-[#c9a84c]" />, 
			label: t("delivery")
		}
	];

	return (
		<section className="relative bg-[#050505] py-20 overflow-hidden border-y border-white/5">
			<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.06),transparent_60%)]" />
			
			<div className="max-w-7xl mx-auto px-4 relative z-10 grid grid-cols-1 sm:grid-cols-3 gap-6 lg:gap-12">
				{features.map((feature, i) => (
					<motion.div 
						key={i} 
						initial={{ opacity: 0, y: 40 }}
						whileInView={{ opacity: 1, y: 0 }}
						viewport={{ once: true }}
						transition={{ duration: 0.7, delay: i * 0.15, ease: "easeOut" }}
						className="group relative flex flex-col items-center justify-center text-center p-8 lg:p-10 rounded-3xl bg-white/[0.02] border border-white/5 hover:border-[#c9a84c]/40 hover:bg-[#c9a84c]/[0.03] hover:-translate-y-2 transition-all duration-500 overflow-hidden shadow-xl shadow-black/50"
					>
						<div className="absolute inset-0 bg-gradient-to-b from-white/[0.04] to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-500" />
						
						<div className="mb-6 p-4 rounded-2xl bg-white/[0.03] shadow-[inset_0_0_20px_rgba(255,255,255,0.02)] group-hover:scale-110 group-hover:rotate-3 transition-transform duration-500">
							{feature.icon}
						</div>
						
						<h3 className="text-xl lg:text-2xl text-white/90 font-display font-medium tracking-wide">
							{feature.label}
						</h3>
						
						{/* Decorative underline */}
						<div className="mt-6 w-12 h-[2px] bg-[#8c2016]/50 group-hover:bg-[#c9a84c] group-hover:w-24 transition-all duration-500" />
					</motion.div>
				))}
			</div>
		</section>
	);
}

