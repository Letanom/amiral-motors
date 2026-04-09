"use client";
import { useEffect, useState } from "react";

export default function AnimatedCounter({ end, duration = 1200 }: { end: number; duration?: number }) {
	const [count, setCount] = useState(0);
	useEffect(() => {
		let raf: number;
		const start = performance.now();
		const step = (now: number) => {
			const p = Math.min(1, (now - start) / duration);
			setCount(Math.floor(end * p));
			if (p < 1) raf = requestAnimationFrame(step);
		};
		raf = requestAnimationFrame(step);
		return () => cancelAnimationFrame(raf);
	}, [end, duration]);
	return <span>{count}</span>;
}

