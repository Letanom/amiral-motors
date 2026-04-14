"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";
import { useState } from "react";
import { Play, X } from "lucide-react";

const VIDEOS = [
	{ src: "/video.mp4", id: "v1" },
	{ src: "/video2.mp4", id: "v2" },
	{ src: "/video3.mp4", id: "v3" },
	{ src: "/video4.mp4", id: "v4" },
];

export default function GalleryPage() {
	const t = useTranslations("gallery");
	const [activeVideo, setActiveVideo] = useState<string | null>(null);

	return (
		<div className="min-h-screen pt-24 pb-20">
			{/* Hero Header */}
			<section className="relative py-16 md:py-24 overflow-hidden">
				<div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.08),transparent_60%)]" />
				<div className="max-w-7xl mx-auto px-4 relative z-10 text-center">
					<motion.h1
						initial={{ opacity: 0, y: 30 }}
						animate={{ opacity: 1, y: 0 }}
						transition={{ duration: 0.7 }}
						className="text-4xl md:text-6xl font-display font-semibold text-white"
					>
						{t("title")}
					</motion.h1>
					<motion.div
						initial={{ width: 0 }}
						animate={{ width: "4rem" }}
						transition={{ duration: 0.6, delay: 0.3 }}
						className="h-1 bg-[#c9a84c] rounded-full mx-auto mt-6"
					/>
					<motion.p
						initial={{ opacity: 0 }}
						animate={{ opacity: 1 }}
						transition={{ duration: 0.7, delay: 0.4 }}
						className="mt-6 text-lg md:text-xl text-white/70 max-w-2xl mx-auto font-light"
					>
						{t("subtitle")}
					</motion.p>
				</div>
			</section>

			{/* Video Grid */}
			<section className="max-w-7xl mx-auto px-4">
				<div className="grid grid-cols-1 md:grid-cols-2 gap-8">
					{VIDEOS.map((video, i) => (
						<motion.div
							key={video.id}
							initial={{ opacity: 0, y: 40 }}
							whileInView={{ opacity: 1, y: 0 }}
							viewport={{ once: true }}
							transition={{ duration: 0.7, delay: i * 0.12 }}
							className="group relative rounded-3xl overflow-hidden bg-white/[0.02] border border-white/5 shadow-2xl shadow-black/50 hover:border-[#c9a84c]/30 transition-all duration-500 cursor-pointer"
							onClick={() => setActiveVideo(video.src)}
						>
							<div className="relative aspect-[16/10] overflow-hidden">
								<video
									src={video.src}
									muted
									loop
									playsInline
									autoPlay
									className="w-full h-full object-cover scale-105 group-hover:scale-100 transition-transform duration-700"
								/>
								{/* Overlay */}
								<div className="absolute inset-0 bg-black/30 group-hover:bg-black/10 transition-all duration-500 flex items-center justify-center">
									<div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 flex items-center justify-center group-hover:scale-110 group-hover:bg-[#c9a84c]/20 group-hover:border-[#c9a84c]/40 transition-all duration-500">
										<Play className="w-7 h-7 md:w-8 md:h-8 text-white/90 ml-1" />
									</div>
								</div>
							</div>
							<div className="p-5 md:p-6">
								<h3 className="text-lg md:text-xl font-display font-medium text-white/90">
									{t(`video${i + 1}_title`)}
								</h3>
								<p className="mt-2 text-sm md:text-base text-white/50 font-light">
									{t(`video${i + 1}_desc`)}
								</p>
							</div>
						</motion.div>
					))}
				</div>
			</section>

			{/* Lightbox Modal */}
			{activeVideo && (
				<motion.div
					initial={{ opacity: 0 }}
					animate={{ opacity: 1 }}
					exit={{ opacity: 0 }}
					className="fixed inset-0 z-50 bg-black/90 backdrop-blur-xl flex items-center justify-center p-4"
					onClick={() => setActiveVideo(null)}
				>
					<button
						onClick={() => setActiveVideo(null)}
						className="absolute top-6 right-6 w-12 h-12 rounded-full bg-white/10 border border-white/20 flex items-center justify-center hover:bg-white/20 transition-colors z-50"
					>
						<X className="w-6 h-6 text-white" />
					</button>
					<motion.div
						initial={{ scale: 0.9, opacity: 0 }}
						animate={{ scale: 1, opacity: 1 }}
						transition={{ duration: 0.3 }}
						className="w-full max-w-5xl rounded-2xl overflow-hidden shadow-2xl"
						onClick={(e) => e.stopPropagation()}
					>
						<video
							src={activeVideo}
							autoPlay
							controls
							playsInline
							className="w-full h-auto"
						/>
					</motion.div>
				</motion.div>
			)}
		</div>
	);
}
