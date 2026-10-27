"use client";
import { useEffect, useState } from "react";
import { Play, X } from "lucide-react";
import LoopVideo from "./LoopVideo";

type Film = { src: string; poster: string; title: string; text: string };

export default function GalleryGrid({ films, watchLabel, closeLabel }: { films: Film[]; watchLabel: string; closeLabel: string }) {
	const [active, setActive] = useState<Film | null>(null);

	useEffect(() => {
		if (!active) return;
		const onKey = (e: KeyboardEvent) => e.key === "Escape" && setActive(null);
		window.addEventListener("keydown", onKey);
		return () => window.removeEventListener("keydown", onKey);
	}, [active]);

	return (
		<>
			<div className="grid grid-cols-2 gap-x-4 gap-y-10 lg:grid-cols-4 lg:gap-x-6">
				{films.map((film) => (
					<button key={film.src} type="button" onClick={() => setActive(film)} className="group text-start">
						<span className="relative block aspect-[9/16] overflow-hidden rounded-md bg-surface">
							<LoopVideo
								src={film.src}
								poster={film.poster}
								className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.2s] ease-out-quint group-hover:scale-[1.04]"
							/>
							<span className="absolute inset-0 flex items-center justify-center bg-black/20 opacity-0 transition-opacity group-hover:opacity-100">
								<span className="flex h-14 w-14 items-center justify-center rounded-full bg-fg text-bg">
									<Play size={20} fill="currentColor" className="ms-0.5" />
									<span className="sr-only">{watchLabel}</span>
								</span>
							</span>
						</span>
						<span className="mt-4 block font-medium">{film.title}</span>
						<span className="mt-1 block text-sm text-muted">{film.text}</span>
					</button>
				))}
			</div>

			{active && (
				<div
					role="dialog"
					aria-modal="true"
					aria-label={active.title}
					className="fixed inset-0 z-50 flex items-center justify-center bg-black/90 p-4 backdrop-blur-sm"
					onClick={() => setActive(null)}
				>
					<button
						type="button"
						onClick={() => setActive(null)}
						aria-label={closeLabel}
						className="absolute end-4 top-4 flex h-11 w-11 items-center justify-center rounded-full border border-white/20 bg-bg sm:end-6 sm:top-6"
					>
						<X size={18} />
					</button>
					<video
						src={active.src}
						poster={active.poster}
						autoPlay
						controls
						playsInline
						onClick={(e) => e.stopPropagation()}
						className="max-h-[88vh] w-auto max-w-full rounded-md"
					/>
				</div>
			)}
		</>
	);
}
