/*
 * A low electric fastback seen from behind at night: the body is almost black, so what
 * reads is its full-width tail-light bar. It idles under the poster wordmark and, as the
 * poster scrolls (--p on .poster), pulls away into the dark leaving red smears behind it.
 * Pure SVG + CSS; the motion lives in globals.css under .car-away.
 */

const BAR = "M150 232 C 172 221, 204 217, 246 217 L 754 217 C 796 217, 828 221, 850 232";

function Bar({ id, idle = false }: { id: string; idle?: boolean }) {
	return (
		<>
			<path d={BAR} stroke={`url(#${id}-glow)`} strokeWidth="46" strokeLinecap="round" fill="none" filter={`url(#${id}-blur)`} opacity="0.6" />
			<path d={BAR} stroke={`url(#${id}-lamp)`} strokeWidth="9" strokeLinecap="round" fill="none" className={idle ? "car-away__lamp" : undefined} />
			<path d={BAR} stroke="#ffd2c8" strokeWidth="1.6" strokeLinecap="round" fill="none" opacity="0.55" />
		</>
	);
}

export default function TaillightCar({ className }: { className?: string }) {
	const id = "taillight";

	return (
		<div className={`car-away ${className ?? ""}`} aria-hidden>
			{/* Smears left behind as the car accelerates: copies of the light bar that lag and fade. */}
			{[1, 2, 3].map((n) => (
				<svg key={n} viewBox="0 0 1000 420" className="car-away__smear" style={{ "--lag": n } as React.CSSProperties}>
					<Bar id={id} />
				</svg>
			))}

			<svg viewBox="0 0 1000 420" className="car-away__car">
				<defs>
					<linearGradient id={`${id}-body`} x1="0" y1="0" x2="0" y2="1">
						<stop offset="0" stopColor="#1c1c20" />
						<stop offset="0.55" stopColor="#121214" />
						<stop offset="1" stopColor="#0c0c0d" />
					</linearGradient>
					<linearGradient id={`${id}-rim`} x1="0" y1="0" x2="1" y2="0">
						<stop offset="0" stopColor="#fff" stopOpacity="0" />
						<stop offset="0.5" stopColor="#fff" stopOpacity="0.28" />
						<stop offset="1" stopColor="#fff" stopOpacity="0" />
					</linearGradient>
					<linearGradient id={`${id}-lamp`} x1="0" y1="0" x2="1" y2="0">
						<stop offset="0" stopColor="#ff4a38" />
						<stop offset="0.12" stopColor="#d32a1f" />
						<stop offset="0.5" stopColor="#e3321f" />
						<stop offset="0.88" stopColor="#d32a1f" />
						<stop offset="1" stopColor="#ff4a38" />
					</linearGradient>
					<linearGradient id={`${id}-glow`} x1="0" y1="0" x2="1" y2="0">
						<stop offset="0" stopColor="#ff3a28" />
						<stop offset="0.5" stopColor="#d32a1f" />
						<stop offset="1" stopColor="#ff3a28" />
					</linearGradient>
					<radialGradient id={`${id}-pool`} cx="0.5" cy="0.5" r="0.5">
						<stop offset="0" stopColor="#d32a1f" stopOpacity="0.45" />
						<stop offset="1" stopColor="#d32a1f" stopOpacity="0" />
					</radialGradient>
					{/* Fixed user-space region: the bar's own bounding box is only a few units tall and would clip the halo square. */}
					<filter id={`${id}-blur`} filterUnits="userSpaceOnUse" x="40" y="120" width="920" height="220">
						<feGaussianBlur stdDeviation="14" />
					</filter>
					<filter id={`${id}-soft`} x="-10%" y="-50%" width="120%" height="200%">
						<feGaussianBlur stdDeviation="6" />
					</filter>
				</defs>

				{/* Red light pooling on the road under the bar. */}
				<ellipse cx="500" cy="392" rx="430" ry="34" fill={`url(#${id}-pool)`} />
				<ellipse cx="500" cy="378" rx="400" ry="16" fill="#000" opacity="0.7" filter={`url(#${id}-soft)`} />

				{/* Tyres. */}
				<rect x="96" y="318" width="118" height="68" rx="16" fill="#060607" />
				<rect x="786" y="318" width="118" height="68" rx="16" fill="#060607" />

				{/* Body: wide haunches, a low roof, a short tail. */}
				<path
					d="M70 302 C 60 252, 82 214, 142 201 C 192 191, 216 166, 262 121 C 302 82, 380 62, 500 60 C 620 62, 698 82, 738 121 C 784 166, 808 191, 858 201 C 918 214, 940 252, 930 302 L 926 344 C 923 360, 906 368, 886 368 L 114 368 C 94 368, 77 360, 74 344 Z"
					fill={`url(#${id}-body)`}
				/>
				{/* Light catching the roof and shoulders. */}
				<path
					d="M142 201 C 192 191, 216 166, 262 121 C 302 82, 380 62, 500 60 C 620 62, 698 82, 738 121 C 784 166, 808 191, 858 201"
					stroke={`url(#${id}-rim)`}
					strokeWidth="2"
					fill="none"
				/>
				{/* Rear glass. */}
				<path d="M258 190 C 292 140, 342 99, 500 95 C 658 99, 708 140, 742 190 Z" fill="#070708" />
				<path d="M300 150 C 340 112, 400 100, 500 98" stroke="#fff" strokeOpacity="0.07" strokeWidth="2" fill="none" />

				{/* Diffuser and plate recess. */}
				<path d="M210 338 L 790 338" stroke="#000" strokeOpacity="0.6" strokeWidth="3" />
				<path d="M250 352 L 750 352" stroke="#000" strokeOpacity="0.5" strokeWidth="2" />
				<rect x="420" y="262" width="160" height="36" rx="4" fill="#09090a" />

				<Bar id={id} idle />
			</svg>
		</div>
	);
}
