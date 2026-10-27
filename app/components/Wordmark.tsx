import Image from "next/image";
import { cn } from "../../lib/utils";

/** The brand logo, cropped from its black plate so it sits directly on the page. */
export default function Wordmark({ className }: { className?: string }) {
	return (
		<Image
			src="/logo-wordmark.png"
			alt="Amiral Motors — Luxury Car Rentals"
			width={764}
			height={120}
			priority
			className={cn("h-7 w-auto sm:h-8", className)}
		/>
	);
}
