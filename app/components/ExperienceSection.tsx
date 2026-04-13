"use client";

import { useTranslations } from "next-intl";
import { motion } from "framer-motion";

export default function ExperienceSection() {
    const t = useTranslations("experience");

    return (
        <section className="py-24 bg-[#0a0a0a] relative overflow-hidden">
            {/* Background Accents */}
            <div className="absolute top-0 left-0 w-full h-full pointer-events-none">
                <div className="absolute top-[10%] left-[-10%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle,rgba(201,168,76,0.15),transparent_70%)] blur-3xl opacity-50" />
                <div className="absolute bottom-[10%] right-[-10%] w-[40%] h-[40%] rounded-full bg-[radial-gradient(circle,rgba(140,32,22,0.15),transparent_70%)] blur-3xl opacity-50" />
            </div>

            <div className="max-w-7xl mx-auto px-4 relative z-10 space-y-24">
                {/* Block 1 */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex-1 space-y-6"
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-semibold text-white">
                            {t("title1")}
                        </h2>
                        <div className="w-16 h-1 bg-[#c9a84c] rounded-full" />
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                            {t("text1")}
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex-1 w-full"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(201,168,76,0.15)] group">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                            <video 
                                src="/video2.mp4" 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="w-full h-auto object-cover scale-105 group-hover:scale-100 transition-transform duration-700" 
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Block 2 */}
                <div className="flex flex-col lg:flex-row-reverse items-center gap-12 lg:gap-20">
                    <motion.div 
                        initial={{ opacity: 0, x: 50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex-1 space-y-6"
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-semibold text-white">
                            {t("title2")}
                        </h2>
                        <div className="w-16 h-1 bg-[#8c2016] rounded-full" />
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                            {t("text2")}
                        </p>
                    </motion.div>

                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex-1 w-full"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(140,32,22,0.15)] group">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                            <video 
                                src="/video4.mp4" 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="w-full h-auto object-cover scale-105 group-hover:scale-100 transition-transform duration-700" 
                            />
                        </div>
                    </motion.div>
                </div>

                {/* Block 3 */}
                <div className="flex flex-col lg:flex-row items-center gap-12 lg:gap-20">
                    <motion.div 
                        initial={{ opacity: 0, x: -50 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex-1 space-y-6"
                    >
                        <h2 className="text-3xl md:text-5xl font-display font-semibold text-white">
                            {t("title3")}
                        </h2>
                        <div className="w-16 h-1 bg-[#c9a84c] rounded-full" />
                        <p className="text-lg md:text-xl text-white/80 leading-relaxed font-light">
                            {t("text3")}
                        </p>
                    </motion.div>
                    
                    <motion.div 
                        initial={{ opacity: 0, scale: 0.9 }}
                        whileInView={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.8 }}
                        viewport={{ once: true, margin: "-100px" }}
                        className="flex-1 w-full"
                    >
                        <div className="relative rounded-2xl overflow-hidden shadow-[0_0_50px_rgba(201,168,76,0.15)] group">
                            <div className="absolute inset-0 bg-black/20 group-hover:bg-transparent transition-all duration-500 z-10" />
                            <video 
                                src="/video3.mp4" 
                                autoPlay 
                                loop 
                                muted 
                                playsInline 
                                className="w-full h-auto object-cover scale-105 group-hover:scale-100 transition-transform duration-700" 
                            />
                        </div>
                    </motion.div>
                </div>
            </div>
        </section>
    );
}
