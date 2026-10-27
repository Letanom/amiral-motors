"use client";
import { useEffect, useRef } from "react";
import { useLocale } from "next-intl";

type Props = {
	value: number;
	label: string;
	suffix?: string;
	/** Years read wrong with thousands separators or a count-up; they stay as written. */
	year?: boolean;
	delay?: number;
};

const DURATION = 1800;
const easeOutExpo = (t: number) => (t >= 1 ? 1 : 1 - Math.pow(2, -10 * t));

/**
 * A figure that counts up from zero the first time it scrolls into view, with a thin
 * red rule underneath filling in step. The server renders the final value, so the
 * real number is there without JavaScript and for reduced motion.
 */
export default function StatCounter({ value, label, suffix = "", year = false, delay = 0 }: Props) {
	const locale = useLocale();
	const numberRef = useRef<HTMLSpanElement>(null);
	const barRef = useRef<HTMLSpanElement>(null);

	const format = (n: number) => (year ? String(n) : new Intl.NumberFormat(locale).format(n)) + suffix;

	useEffect(() => {
		const el = numberRef.current;
		const bar = barRef.current;
		if (!el || !bar) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;

		const nf = new Intl.NumberFormat(locale);
		const show = (progress: number) => {
			if (!year) el.textContent = nf.format(Math.round(value * progress)) + suffix;
			bar.style.transform = `scaleX(${progress})`;
		};

		let raf = 0;
		let timer = 0;
		const run = () => {
			const start = performance.now();
			const tick = (now: number) => {
				const t = Math.min((now - start) / DURATION, 1);
				show(easeOutExpo(t));
				if (t < 1) raf = requestAnimationFrame(tick);
			};
			raf = requestAnimationFrame(tick);
		};

		const observer = new IntersectionObserver(
			([entry]) => {
				if (!entry.isIntersecting) {
					// Not reached yet: park at zero so the count has somewhere to start from.
					show(0);
					return;
				}
				observer.disconnect();
				show(0);
				timer = window.setTimeout(run, delay);
			},
			{ threshold: 0.6 }
		);
		observer.observe(el);

		return () => {
			observer.disconnect();
			cancelAnimationFrame(raf);
			window.clearTimeout(timer);
			show(1);
		};
	}, [value, suffix, year, delay, locale]);

	return (
		<div className="flex flex-col-reverse">
			<dt className="mt-4 text-sm text-muted">{label}</dt>
			<dd>
				<span ref={numberRef} className="wide block text-5xl tabular-nums sm:text-6xl">
					{format(value)}
				</span>
				<span className="mt-5 block h-px w-full bg-line" aria-hidden>
					<span ref={barRef} className="block h-px w-full origin-left bg-signal rtl:origin-right" />
				</span>
			</dd>
		</div>
	);
}
