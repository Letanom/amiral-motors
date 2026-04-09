"use client";
import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function AboutPage() {
	const t = useTranslations("about");

	return (
		<div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#8c2016]/5 blur-[120px] rounded-full" />
			<div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#8c2016]/5 blur-[120px] rounded-full" />

			<div className="max-w-4xl mx-auto px-4 relative z-10">
				<motion.div
					initial={{ opacity: 0, y: 20 }}
					animate={{ opacity: 1, y: 0 }}
					transition={{ duration: 0.6 }}
				>
					<h1 className="text-4xl md:text-5xl font-display font-semibold mb-8 text-white">
						{t("title")}
					</h1>
					
					<div className="space-y-8 text-lg leading-relaxed text-white/80 font-light">
						<motion.p 
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.2, duration: 0.6 }}
						>
							{t("p1")}
						</motion.p>

						<motion.p
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.3, duration: 0.6 }}
						>
							{t("p2")}
						</motion.p>

						<motion.p
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.4, duration: 0.6 }}
						>
							{t("p3")}
						</motion.p>

						<motion.p
							initial={{ opacity: 0, x: -20 }}
							animate={{ opacity: 1, x: 0 }}
							transition={{ delay: 0.5, duration: 0.6 }}
						>
							{t("p4")}
						</motion.p>
					</div>

					<motion.div 
						initial={{ opacity: 0, scale: 0.95 }}
						animate={{ opacity: 1, scale: 1 }}
						transition={{ delay: 0.7, duration: 0.6 }}
						className="mt-16 p-8 rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm text-center"
					>
						<p className="text-xl md:text-2xl font-display font-medium text-white italic">
							"{t("footer")}"
						</p>
					</motion.div>
				</motion.div>
			</div>
		</div>
	);
}

