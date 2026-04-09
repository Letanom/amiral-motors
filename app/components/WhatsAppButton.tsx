"use client";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppLink } from "../../lib/utils";

export default function WhatsAppButton({
	phone = "905316350034",
	displayPhone,
	className
}: {
	phone?: string;
	displayPhone?: string;
	className?: string;
}) {
	const t = useTranslations("whatsapp");
	const href = buildWhatsAppLink(phone, t("message"));
	return (
		<a
			href={href}
			target="_blank"
			rel="noopener noreferrer"
			className={`inline-flex items-center gap-2 rounded-full bg-green-500 text-white px-4 py-2 font-medium transition hover:bg-green-600 hover:scale-105 active:scale-95 ${className || ""}`}
		>
			<span className="relative">
				<FaWhatsapp className="text-xl" />
			</span>
			<span>{displayPhone || `+${phone}`}</span>
		</a>
	);
}

