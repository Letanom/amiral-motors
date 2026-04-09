"use client";
import { motion, useReducedMotion } from "framer-motion";
import Link from "next/link";

import { useTranslations } from "next-intl";

export default function HeroSection() {
	const t = useTranslations("hero");
	const prefersReducedMotion = useReducedMotion();

	const words = t("title").split(" ");

	return (
		<section className="relative min-h-[80vh] flex items-center justify-center overflow-hidden">
			<div className="absolute inset-0">
				{prefersReducedMotion ? (
					<div className="absolute inset-0 bg-[url('https://images.unsplash.com/photo-1549924231-f129b911e442?q=80&w=2069&auto=format&fit=crop')] bg-cover bg-center" />
				) : (
					<video
						className="absolute inset-0 w-full h-full object-cover"
						src="/video.mp4"
						autoPlay
						muted
						loop
						playsInline
						poster="/amiral.png"
					/>
				)}
				<div className="absolute inset-0 bg-black/55" />
				<div className="absolute inset-0 bg-[radial-gradient(circle_at_50%_0%,rgba(201,168,76,0.2),transparent_60%)]" />
			</div>
			<div className="relative z-10 max-w-5xl mx-auto px-4 text-center">
				<motion.h1
					initial="hidden"
					whileInView="visible"
					viewport={{ once: true }}
					className="text-4xl md:text-6xl font-display font-semibold leading-tight"
				>
					{words.map((w, i) => (
						<motion.span
							key={i}
							className="inline-block mr-2"
							variants={{
								hidden: { opacity: 0, y: prefersReducedMotion ? 0 : 12 },
								visible: {
									opacity: 1,
									y: 0,
									transition: { delay: i * 0.06, duration: 0.5 }
								}
							}}
						>
							{w}
						</motion.span>
					))}
				</motion.h1>
				<motion.p
					className="mt-5 text-white/80 max-w-2xl mx-auto"
					initial={{ opacity: 0 }}
					whileInView={{ opacity: 1 }}
					transition={{ duration: 0.6, delay: 0.2 }}
					viewport={{ once: true }}
				>
					{t("subtitle")}
				</motion.p>
				<div className="mt-8 flex items-center justify-center gap-4">
					<Link
						href="#featured"
						className="relative inline-block rounded-full bg-[#8c2016] text-white px-6 py-3 font-medium overflow-hidden"
					>
						<span className="relative z-10">{t("cta_fleet")}</span>
						<span className="absolute inset-0 translate-x-[-100%] bg-white/40 skew-x-12 transition-all duration-700 hover:translate-x-[100%]" />
					</Link>

				</div>
			</div>
		</section>
	);
}

