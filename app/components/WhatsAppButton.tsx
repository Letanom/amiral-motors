"use client";
import { useTranslations } from "next-intl";
import { FaWhatsapp } from "react-icons/fa";
import { buildWhatsAppLink } from "../../lib/utils";

export default function WhatsAppButton({
	phone = "905316350034",
	displayPhone,
	hideText = false,
	className,
	labelClassName
}: {
	phone?: string;
	displayPhone?: string;
	hideText?: boolean;
	className?: string;
	labelClassName?: string;
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
			<span className="relative shrink-0">
				<FaWhatsapp className="text-xl" />
			</span>
			{!hideText && (
				<span className={labelClassName}>
					{displayPhone || `+${phone}`}
				</span>
			)}
		</a>
	);
}

