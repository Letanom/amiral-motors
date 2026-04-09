"use client";
import Link from "next/link";
import { useTranslations } from "next-intl";
import { useEffect, useState } from "react";
import { usePathname } from "next/navigation";
import { Languages, Phone } from "lucide-react";
import { AppLocale, localeNames, locales } from "../../i18n.config";
import { cn } from "../../lib/utils";

export default function Navbar({ locale, dir }: { locale: AppLocale; dir: "ltr" | "rtl" }) {
	const t = useTranslations("nav");
	const pathname = usePathname();
	const [scrolled, setScrolled] = useState(false);
	const [menuOpen, setMenuOpen] = useState(false);
	const [langOpen, setLangOpen] = useState(false);

	useEffect(() => {
		const onScroll = () => setScrolled(window.scrollY > 4);
		onScroll();
		window.addEventListener("scroll", onScroll);
		return () => window.removeEventListener("scroll", onScroll);
	}, []);

	const switcher = (
		<div className="relative">
			<button
				onClick={() => setLangOpen((v) => !v)}
				className="flex items-center gap-2 rounded-full border border-white/10 px-3 py-1.5 hover:bg-white/5 transition-colors"
			>
				<Languages size={16} />
				<span className="text-sm shrink-0">{localeNames[locale]}</span>
			</button>
			{langOpen && (
				<div className="absolute mt-2 right-0 min-w-40 rounded-xl border border-white/10 bg-black/90 backdrop-blur-xl p-2 shadow-2xl z-50">
					{locales.map((loc) => {
						let newPath = `/${loc}`;
						if (pathname) {
							const segments = pathname.split("/");
							const hasLocale = locales.includes(segments[1] as AppLocale);
							const newSegments = [...segments];
							if (hasLocale) {
								newSegments[1] = loc;
							} else {
								newSegments.splice(1, 0, loc);
							}
							newPath = newSegments.join("/") || "/";
						}
						return (
							<Link
								key={loc}
								href={newPath}
								className={cn(
									"block px-3 py-2 rounded-lg hover:bg-white/10 text-sm transition-colors",
									loc === locale && "bg-[#8c2016]/20 text-[#8c2016] font-medium"
								)}
								onClick={() => setLangOpen(false)}
							>
								{localeNames[loc]}
							</Link>
						);
					})}
				</div>
			)}
		</div>
	);

	return (
		<header
			className={cn(
				"fixed inset-x-0 top-0 z-40 transition backdrop-blur-md",
				scrolled ? "bg-black/80 border-b border-[#8c2016]/20" : "bg-transparent"
			)}
			dir={dir}
		>
			<nav className="max-w-7xl mx-auto px-4 h-16 flex items-center justify-between">
				<Link href={`/${locale}`} className="font-display text-xl shrink-0">
					<span className="tracking-wide">AMIRAL</span>{" "}
					<span className="text-[#8c2016]">GROUP</span>
				</Link>

				<div className="hidden lg:flex items-center gap-6">
					<Link href={`/${locale}`} className="hover:text-[#8c2016] transition-colors">{t("home")}</Link>
					<Link href={`/${locale}/fleet`} className="hover:text-[#8c2016] transition-colors">{t("fleet")}</Link>
					<Link href={`/${locale}/about`} className="hover:text-[#8c2016] transition-colors">{t("about")}</Link>
					<Link href={`/${locale}/contact`} className="hover:text-[#8c2016] transition-colors">{t("contact")}</Link>
					{switcher}
					<a
						href="tel:08503404436"
						className="inline-flex items-center gap-2 rounded-full border border-[#8c2016]/30 px-4 py-2 hover:bg-[#8c2016]/10 transition-all active:scale-95"
					>
						<Phone size={16} className="text-[#8c2016]" />
						<span className="text-sm font-medium">{t("phone")}</span>
					</a>
				</div>

				<div className="lg:hidden flex items-center gap-2">
					{switcher}
					<a
						href="tel:08503404436"
						className="flex items-center justify-center h-10 w-10 sm:w-auto sm:px-4 rounded-full border border-[#8c2016]/30 hover:bg-[#8c2016]/10 transition-all active:scale-95"
						title={t("phone")}
					>
						<Phone size={16} className="text-[#8c2016]" />
						<span className="hidden sm:inline-block ml-2 text-xs font-medium">{t("phone")}</span>
					</a>
					<button
						onClick={() => setMenuOpen((v) => !v)}
						aria-label="Menu"
						className={cn(
							"relative w-10 h-10 rounded-lg border border-white/10 transition-colors bg-white/5",
							menuOpen && "bg-white/10"
						)}
					>
						<div className="absolute inset-0 m-auto w-5 h-4 flex flex-col justify-between overflow-hidden">
							<span className={cn("h-0.5 w-full bg-white transition-all transform origin-left", menuOpen && "rotate-45 translate-x-[2px] -translate-y-[1px]")} />
							<span className={cn("h-0.5 w-full bg-white transition-all", menuOpen && "opacity-0 translate-x-10")} />
							<span className={cn("h-0.5 w-full bg-white transition-all transform origin-left", menuOpen && "-rotate-45 translate-x-[2px] translate-y-[1px]")} />
						</div>
					</button>
				</div>
			</nav>

			{menuOpen && (
				<div className="lg:hidden border-t border-white/10 bg-black/95 backdrop-blur-2xl animate-in slide-in-from-top duration-300">
					<div className="max-w-7xl mx-auto px-4 py-6 flex flex-col gap-4 text-center">
						<Link href={`/${locale}`} onClick={() => setMenuOpen(false)} className="text-lg py-1">{t("home")}</Link>
						<Link href={`/${locale}/fleet`} onClick={() => setMenuOpen(false)} className="text-lg py-1">{t("fleet")}</Link>
						<Link href={`/${locale}/about`} onClick={() => setMenuOpen(false)} className="text-lg py-1">{t("about")}</Link>
						<Link href={`/${locale}/contact`} onClick={() => setMenuOpen(false)} className="text-lg py-1">{t("contact")}</Link>
						<div className="pt-2">
							<a
								href="tel:08503404436"
								className="inline-flex items-center gap-3 rounded-full border border-[#8c2016]/30 px-8 py-3 bg-[#8c2016]/5 hover:bg-[#8c2016]/10 transition-all font-medium"
							>
								<Phone size={20} className="text-[#8c2016]" />
								<span>{t("phone")}</span>
							</a>
						</div>
					</div>
				</div>
			)}
		</header>
	);
}

