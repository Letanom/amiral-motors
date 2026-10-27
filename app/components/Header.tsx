"use client";
import { useEffect, useState } from "react";
import { useLocale, useTranslations } from "next-intl";
import { Phone } from "lucide-react";
import { Link, usePathname } from "../../i18n/navigation";
import { locales } from "../../i18n.config";
import { PHONE } from "../../lib/site";
import { whatsappLink } from "../../lib/fleet";
import { cn } from "../../lib/utils";
import Wordmark from "./Wordmark";

const NAV = [
	{ href: "/fleet", key: "fleet" },
	{ href: "/gallery", key: "gallery" },
	{ href: "/about", key: "about" },
	{ href: "/contact", key: "contact" }
] as const;

function LanguageSwitch({ className }: { className?: string }) {
	const t = useTranslations("nav");
	const pathname = usePathname();
	const current = useLocale();

	return (
		<nav aria-label={t("language")} className={cn("flex items-center gap-3 text-xs font-medium tracking-wider", className)}>
			{locales.map((loc) => (
				<Link
					key={loc}
					href={pathname}
					locale={loc}
					aria-current={loc === current ? "true" : undefined}
					className={cn("transition-colors", loc === current ? "text-fg" : "text-muted hover:text-fg")}
				>
					{loc.toUpperCase()}
				</Link>
			))}
		</nav>
	);
}

export default function Header() {
	const t = useTranslations("nav");
	const w = useTranslations("whatsapp");
	const pathname = usePathname();
	const locale = useLocale();
	const [menuOpen, setMenuOpen] = useState(false);

	// Close the mobile menu whenever the route or language changes.
	const route = `${locale}${pathname}`;
	const [lastRoute, setLastRoute] = useState(route);
	if (route !== lastRoute) {
		setLastRoute(route);
		setMenuOpen(false);
	}

	useEffect(() => {
		document.documentElement.style.overflow = menuOpen ? "hidden" : "";
		return () => {
			document.documentElement.style.overflow = "";
		};
	}, [menuOpen]);

	const isActive = (href: string) => pathname.startsWith(href);

	return (
		<>
			<header className="sticky top-0 z-40 border-b border-line bg-bg/85 backdrop-blur-md">
				<div className="mx-auto flex h-16 max-w-[1320px] items-center justify-between gap-6 px-4 sm:px-6 lg:h-[4.5rem] lg:px-10">
					<Link href="/" className="shrink-0">
						<Wordmark />
					</Link>

					<nav className="hidden items-center gap-8 lg:flex">
						{NAV.map((item) => (
							<Link
								key={item.key}
								href={item.href}
								aria-current={isActive(item.href) ? "page" : undefined}
								className={cn(
									"text-[0.9375rem] transition-colors",
									isActive(item.href) ? "text-fg" : "text-muted hover:text-fg"
								)}
							>
								{t(item.key)}
							</Link>
						))}
					</nav>

					<div className="hidden items-center gap-7 lg:flex">
						<LanguageSwitch />
						<a href={PHONE.href} className="flex items-center gap-2 text-sm text-muted transition-colors hover:text-fg">
							<Phone size={14} strokeWidth={1.75} />
							<span dir="ltr" className="tabular-nums">
								{PHONE.display}
							</span>
						</a>
						<a
							href={whatsappLink(w("message"))}
							target="_blank"
							rel="noopener noreferrer"
							className="beam px-6 py-2.5 text-sm font-medium"
						>
							{t("reserve")}
						</a>
					</div>

					<div className="flex items-center gap-2 lg:hidden">
						<a
							href={PHONE.href}
							aria-label={t("call")}
							className="flex h-10 w-10 items-center justify-center rounded-full border border-line"
						>
							<Phone size={16} strokeWidth={1.75} />
						</a>
						<button
							type="button"
							onClick={() => setMenuOpen((v) => !v)}
							aria-expanded={menuOpen}
							aria-controls="mobile-menu"
							aria-label={menuOpen ? t("close") : t("menu")}
							className="flex h-10 w-10 items-center justify-center rounded-full border border-line"
						>
							<span className="relative block h-2.5 w-4" aria-hidden>
								<span className={cn("absolute inset-x-0 top-0 h-px bg-fg transition-transform duration-300", menuOpen && "translate-y-[5px] rotate-45")} />
								<span className={cn("absolute inset-x-0 bottom-0 h-px bg-fg transition-transform duration-300", menuOpen && "-translate-y-[4px] -rotate-45")} />
							</span>
						</button>
					</div>
				</div>
			</header>

			{/*
			  Sibling of <header>, not a child: the header's backdrop-filter makes it the containing
			  block for fixed descendants, which would collapse this overlay to zero height.
			*/}
			<div id="mobile-menu" hidden={!menuOpen} className="fixed inset-x-0 top-16 bottom-0 z-40 overflow-y-auto bg-bg lg:hidden">
					<nav className="flex flex-col px-4 pt-4 sm:px-6">
						{[{ href: "/", key: "home" } as const, ...NAV].map((item, i) => (
							<Link
								key={item.key}
								href={item.href}
								className={cn("enter wide border-b border-line py-5 text-3xl", item.href !== "/" && isActive(item.href) && "text-muted")}
								style={{ "--d": `${i * 50}ms` } as React.CSSProperties}
							>
								{t(item.key)}
							</Link>
						))}
					</nav>
					<div className="flex flex-col gap-6 px-4 py-8 sm:px-6">
						<LanguageSwitch className="text-sm" />
						<a
							href={whatsappLink(w("message"))}
							target="_blank"
							rel="noopener noreferrer"
							className="beam px-5 py-4 text-center font-medium"
						>
							{t("reserve")}
						</a>
						<a href={PHONE.href} dir="ltr" className="text-center text-muted tabular-nums">
							{PHONE.display}
						</a>
					</div>
				</div>
		</>
	);
}
