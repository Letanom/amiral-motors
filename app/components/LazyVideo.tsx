"use client";
import { useState, useEffect, useRef } from "react";

interface LazyVideoProps extends React.VideoHTMLAttributes<HTMLVideoElement> {
	src: string;
	poster?: string;
}

export default function LazyVideo({ src, poster, className, ...props }: LazyVideoProps) {
	const [isInView, setIsInView] = useState(false);
	const videoRef = useRef<HTMLDivElement>(null);

	useEffect(() => {
		const observer = new IntersectionObserver(
			(entries) => {
				if (entries[0].isIntersecting) {
					setIsInView(true);
					observer.disconnect();
				}
			},
			{ rootMargin: "200px" } // Load when within 200px of viewport
		);

		if (videoRef.current) {
			observer.observe(videoRef.current);
		}

		return () => observer.disconnect();
	}, []);

	return (
		<div ref={videoRef} className={`relative overflow-hidden ${className}`}>
			{isInView ? (
				<video
					src={src}
					poster={poster}
					preload="metadata"
					{...props}
					className="w-full h-full object-cover"
				/>
			) : (
				// Placeholder while loading or before in view
				<div className="absolute inset-0 bg-neutral-900 animate-pulse">
					{poster && <img src={poster} alt="" className="w-full h-full object-cover opacity-50" />}
				</div>
			)}
		</div>
	);
}
