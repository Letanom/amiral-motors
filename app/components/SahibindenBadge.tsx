import Image from "next/image";
import { cn } from "../../lib/utils";

/** sahibinden.com wordmark on its own yellow band, kept as-is for recognition. */
export default function SahibindenBadge({ className }: { className?: string }) {
	return (
		<Image
			src="/Bant_Logo_Sahibinden.webp"
			alt="sahibinden.com"
			width={1772}
			height={379}
			className={cn("h-6 w-auto rounded-[3px]", className)}
		/>
	);
}
