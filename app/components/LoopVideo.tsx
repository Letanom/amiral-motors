"use client";
import { useEffect, useRef } from "react";

/** Muted looping clip that only loads and plays while on screen. */
export default function LoopVideo({ src, poster, className }: { src: string; poster: string; className?: string }) {
	const ref = useRef<HTMLVideoElement>(null);

	useEffect(() => {
		const video = ref.current;
		if (!video) return;
		if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) return;
		const observer = new IntersectionObserver(
			([entry]) => {
				if (entry.isIntersecting) {
					if (!video.src) video.src = src;
					video.play().catch(() => {});
				} else {
					video.pause();
				}
			},
			{ rootMargin: "200px" }
		);
		observer.observe(video);
		return () => observer.disconnect();
	}, [src]);

	return <video ref={ref} poster={poster} muted loop playsInline preload="none" className={className} />;
}
