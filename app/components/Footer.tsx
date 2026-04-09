"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { AppLocale } from "../../i18n.config";
import { FaInstagram } from "react-icons/fa";

export default function Footer({ locale }: { locale: AppLocale }) {
	const t = useTranslations("footer");
	const n = useTranslations("nav");
	return (
		<footer className="border-t border-[#8c2016]/30 mt-16">
			<div className="max-w-7xl mx-auto px-4 py-10 grid gap-8 md:grid-cols-5">
				<div>
					<div className="font-display text-2xl">
						<span>AMIRAL</span> <span className="text-[#8c2016]">GROUP</span>
					</div>
					<p className="text-sm text-white/70 mt-2">"{t("slogan")}"</p>
				</div>
				<div>
					<h4 className="font-semibold mb-3">{t("links")}</h4>
					<ul className="space-y-2 text-white/80">
						<li>
							<Link href={`/${locale}`}>{n("home")}</Link>
						</li>
						<li>
							<Link href={`/${locale}/fleet`}>{n("fleet")}</Link>
						</li>
						<li>
							<Link href={`/${locale}/about`}>{n("about")}</Link>
						</li>
						<li>
							<Link href={`/${locale}/contact`}>{n("contact")}</Link>
						</li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold mb-3">{t("sectors")}</h4>
					<ul className="space-y-2 text-white/80">
						<li>{t("construction")}</li>
						<li>{t("textile")}</li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold mb-3">{t("contactTitle")}</h4>
					<ul className="space-y-2 text-white/80">
						<li>WhatsApp 1: +90 531 635 00 34</li>
						<li>WhatsApp 2: +90 532 659 99 34</li>
						<li className="pt-2 text-xs opacity-60 uppercase tracking-widest">Şubelerimiz</li>
						<li className="text-sm">İstanbul: Skyland Residence, Sarıyer</li>
						<li className="text-sm">Bodrum: Türkbükü, Muğla</li>
					</ul>
				</div>
				<div>
					<h4 className="font-semibold mb-3">{t("social")}</h4>
					<div className="flex gap-3 text-white/70">
						<a
							href="https://www.instagram.com/amiralmotors/"
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center justify-center w-9 h-9 rounded-full border border-white/10 hover:bg-white/10 transition hover:text-[#8c2016]"
							aria-label="Instagram"
						>
							<FaInstagram size={18} />
						</a>
					</div>
				</div>
			</div>
			<div className="border-t border-[#8c2016]/20">
				<p className="max-w-7xl mx-auto px-4 py-6 text-sm text-white/60">{t("rights")}</p>
			</div>
		</footer>
	);
}

