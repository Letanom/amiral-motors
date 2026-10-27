"use client";
import { useEffect, useRef } from "react";

/**
 * Pinned poster hero. A tall section whose sticky inner stage stays on screen while
 * the visitor scrolls through it; scroll progress (0 → 1) is written to --p and all
 * hand-overs (wordmark out, claim in) are computed from it in CSS.
 * data-stage flips to "claim" once the claim starts fading in (p > 0.45) so hidden buttons can't take focus.
 */
export default function HeroPoster({ children }: { children: React.ReactNode }) {
	const ref = useRef<HTMLElement>(null);

	useEffect(() => {
		const section = ref.current;
		if (!section) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
			section.dataset.stage = "claim";
			return;
		}

		let raf = 0;
		const measure = () => {
			raf = 0;
			const rect = section.getBoundingClientRect();
			const travel = rect.height - window.innerHeight;
			const p = travel > 0 ? Math.min(Math.max(-rect.top / travel, 0), 1) : 1;
			section.style.setProperty("--p", p.toFixed(4));
			section.dataset.stage = p > 0.45 ? "claim" : "name";
		};
		const schedule = () => {
			if (!raf) raf = requestAnimationFrame(measure);
		};

		measure();
		window.addEventListener("scroll", schedule, { passive: true });
		window.addEventListener("resize", schedule);
		return () => {
			cancelAnimationFrame(raf);
			window.removeEventListener("scroll", schedule);
			window.removeEventListener("resize", schedule);
		};
	}, []);

	return (
		<section ref={ref} className="poster -mt-16 lg:-mt-[4.5rem]" data-stage="name">
			<div className="poster__stage">{children}</div>
		</section>
	);
}
