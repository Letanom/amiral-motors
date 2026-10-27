import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowUpRight, Phone } from "lucide-react";
import { FaInstagram, FaWhatsapp } from "react-icons/fa";
import { whatsappLink } from "../../../lib/fleet";
import { BRANCHES, INSTAGRAM_URL, PHONE, SAHIBINDEN_URL, WHATSAPP_LINES } from "../../../lib/site";
import SahibindenBadge from "../../components/SahibindenBadge";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });
	return {
		title: t("contactTitle"),
		description: t("contactDescription"),
		alternates: { canonical: `/${locale}/contact` }
	};
}

const row =
	"group flex items-center justify-between gap-4 rounded-md border border-line bg-surface px-5 py-5 transition-colors hover:border-white/30";

export default async function ContactPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations();

	return (
		<div className="mx-auto max-w-[1320px] px-4 pt-12 sm:px-6 lg:px-10 lg:pt-16">
			<header className="enter max-w-2xl">
				<h1 className="wide text-4xl sm:text-6xl">{t("contact.title")}</h1>
				<p className="mt-5 text-lg leading-relaxed text-muted">{t("contact.lead")}</p>
			</header>

			<div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-12">
				<section className="flex flex-col gap-3">
					<h2 className="eyebrow mb-2">{t("contact.whatsappTitle")}</h2>
					{WHATSAPP_LINES.map((line, i) => (
						<a key={line.id} href={whatsappLink(t("whatsapp.message"), i)} target="_blank" rel="noopener noreferrer" className={row}>
							<span className="flex items-center gap-4">
								<FaWhatsapp className="text-2xl text-[#25d366]" />
								<span>
									<span className="block text-sm text-muted">{i === 0 ? t("contact.line1Desc") : t("contact.line2Desc")}</span>
									<span dir="ltr" className="mt-0.5 block text-xl font-medium tabular-nums">
										{line.display}
									</span>
								</span>
							</span>
							<ArrowUpRight size={18} strokeWidth={1.75} className="text-muted transition-colors group-hover:text-fg rtl:-scale-x-100" />
						</a>
					))}

					<h2 className="eyebrow mt-8 mb-2">{t("contact.callCenter")}</h2>
					<a href={PHONE.href} className={row}>
						<span className="flex items-center gap-4">
							<Phone size={22} strokeWidth={1.5} className="text-muted" />
							<span>
								<span className="block text-sm text-muted">{t("contact.hours")}</span>
								<span dir="ltr" className="mt-0.5 block text-xl font-medium tabular-nums">
									{PHONE.display}
								</span>
							</span>
						</span>
						<ArrowUpRight size={18} strokeWidth={1.75} className="text-muted transition-colors group-hover:text-fg rtl:-scale-x-100" />
					</a>

					<h2 className="eyebrow mt-8 mb-2">{t("contact.elsewhere")}</h2>
					<div className="grid grid-cols-2 gap-3">
						<a href={INSTAGRAM_URL} target="_blank" rel="noopener noreferrer" className={row}>
							<span className="flex items-center gap-3">
								<FaInstagram className="text-xl" /> Instagram
							</span>
						</a>
						<a href={SAHIBINDEN_URL} target="_blank" rel="noopener noreferrer" className={row}>
							<SahibindenBadge />
							<ArrowUpRight size={18} strokeWidth={1.75} className="text-muted transition-colors group-hover:text-fg rtl:-scale-x-100" />
						</a>
					</div>
				</section>

				<section>
					<h2 className="eyebrow mb-5">{t("contact.branchesTitle")}</h2>
					<div className="overflow-hidden rounded-lg border border-line">
						<iframe
							title={t("contact.istanbul")}
							src={BRANCHES[0].embed}
							loading="lazy"
							referrerPolicy="no-referrer-when-downgrade"
							className="block h-72 w-full border-0 grayscale invert-[0.9] hue-rotate-180"
						/>
					</div>
					<div className="mt-6 grid gap-6 sm:grid-cols-2">
						{BRANCHES.map((b) => (
							<div key={b.id} className="border-t border-line pt-5">
								<h3 className="text-lg font-medium">{t(`contact.${b.id}`)}</h3>
								<p className="mt-2 text-sm leading-relaxed text-muted">
									{b.lines.map((l) => (
										<span key={l} className="block">
											{l}
										</span>
									))}
								</p>
								<a
									href={b.map}
									target="_blank"
									rel="noopener noreferrer"
									className="mt-4 inline-flex items-center gap-1.5 text-sm underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
								>
									{t("contact.viewMap")}
									<ArrowUpRight size={14} strokeWidth={1.75} className="rtl:-scale-x-100" />
								</a>
							</div>
						))}
					</div>
				</section>
			</div>
		</div>
	);
}
