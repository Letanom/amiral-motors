"use client";

import { useTranslations } from "next-intl";
import { motion, useInView } from "framer-motion";
import { useRef } from "react";
import AnimatedCounter from "./AnimatedCounter";

export default function SuccessCounters() {
    const t = useTranslations("counters");
    const ref = useRef(null);
    const isInView = useInView(ref, { once: true, margin: "-100px" });

    const stats = [
        { value: 1200, suffix: "+", label: t("rented") },
        { value: 5000, suffix: "+", label: t("customers") },
        { value: 10, suffix: "+", label: t("years") }
    ];

    return (
        <section className="relative py-24 bg-[#0a0a0a] overflow-hidden" ref={ref}>
            <div className="absolute inset-0 bg-gradient-to-b from-[#0a0a0a] via-[#100d08] to-[#0a0a0a]" />
            <div className="absolute inset-0 bg-[radial-gradient(ellipse_at_center,rgba(201,168,76,0.1),transparent_70%)]" />

            <div className="max-w-7xl mx-auto px-4 relative z-10">
                <div className="text-center max-w-2xl mx-auto mb-16 space-y-4">
                    <motion.h2 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        className="text-3xl md:text-5xl font-display font-semibold text-white"
                    >
                        {t("title")}
                    </motion.h2>
                    <motion.p 
                        initial={{ opacity: 0, y: 20 }}
                        whileInView={{ opacity: 1, y: 0 }}
                        viewport={{ once: true }}
                        transition={{ delay: 0.2 }}
                        className="text-white/70 text-lg md:text-xl font-light"
                    >
                        {t("desc")}
                    </motion.p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 md:gap-12">
                    {stats.map((stat, i) => (
                        <motion.div 
                            key={i}
                            initial={{ opacity: 0, scale: 0.9 }}
                            whileInView={{ opacity: 1, scale: 1 }}
                            viewport={{ once: true }}
                            transition={{ duration: 0.5, delay: i * 0.15 }}
                            className="flex flex-col items-center justify-center p-8 lg:p-12 rounded-3xl bg-white/[0.02] border border-white/5 shadow-2xl backdrop-blur-sm relative group overflow-hidden"
                        >
                            <div className="absolute inset-0 bg-gradient-to-br from-[#c9a84c]/10 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-700" />
                            
                            <div className="text-5xl md:text-6xl font-display font-bold text-[#c9a84c] mb-4 flex items-center shadow-black drop-shadow-xl">
                                {isInView ? <AnimatedCounter end={stat.value} duration={2500} /> : "0"}
                                <span className="text-[#8c2016] ml-1">{stat.suffix}</span>
                            </div>
                            <div className="text-lg md:text-xl text-white/90 font-medium tracking-wide">
                                {stat.label}
                            </div>
                        </motion.div>
                    ))}
                </div>
            </div>
        </section>
    );
}
