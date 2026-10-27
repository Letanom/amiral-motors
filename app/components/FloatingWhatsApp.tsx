"use client";
import { useEffect, useState } from "react";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "../../lib/fleet";
import { cn } from "../../lib/utils";

/**
 * Phone-only WhatsApp shortcut. On desktop the header's Reserve button does this job,
 * so the floating button is hidden there. On phones it stays out of the opening
 * frame and fades in once the visitor has scrolled past the first screen.
 */
export default function FloatingWhatsApp() {
	const t = useTranslations("whatsapp");
	const [shown, setShown] = useState(false);

	useEffect(() => {
		const update = () => setShown(window.scrollY > window.innerHeight * 0.9);
		update();
		window.addEventListener("scroll", update, { passive: true });
		return () => window.removeEventListener("scroll", update);
	}, []);

	return (
		<a
			href={whatsappLink(t("message"))}
			target="_blank"
			rel="noopener noreferrer"
			aria-label="WhatsApp"
			aria-hidden={!shown}
			tabIndex={shown ? 0 : -1}
			className={cn(
				"fixed end-4 bottom-4 z-30 flex h-12 w-12 items-center justify-center rounded-full border border-white/15 bg-surface/95 text-xl text-fg shadow-[0_8px_30px_-8px_rgb(0_0_0/0.8)] transition-all duration-500 ease-out-quint lg:hidden",
				shown ? "translate-y-0 opacity-100" : "pointer-events-none translate-y-3 opacity-0"
			)}
		>
			<FaWhatsapp />
		</a>
	);
}
