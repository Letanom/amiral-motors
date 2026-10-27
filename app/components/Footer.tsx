import { useTranslations } from "next-intl";
import { FaInstagram } from "react-icons/fa";
import { Link } from "../../i18n/navigation";
import { BRANCHES, INSTAGRAM_URL, PHONE, SAHIBINDEN_URL, WHATSAPP_LINES } from "../../lib/site";
import SahibindenBadge from "./SahibindenBadge";
import Wordmark from "./Wordmark";

export default function Footer() {
	const t = useTranslations("footer");
	const n = useTranslations("nav");
	const c = useTranslations("contact");

	const pages = [
		{ href: "/fleet", label: n("fleet") },
		{ href: "/gallery", label: n("gallery") },
		{ href: "/about", label: n("about") },
		{ href: "/contact", label: n("contact") }
	];

	return (
		<footer className="mt-28 border-t border-line">
			<div className="mx-auto grid max-w-[1320px] gap-12 px-4 py-16 sm:px-6 md:grid-cols-2 lg:grid-cols-[1.4fr_1fr_1.2fr_1fr] lg:px-10">
				<div className="flex flex-col gap-6">
					<Wordmark />
					<p className="max-w-xs text-sm leading-relaxed text-muted">{t("slogan")}</p>
					<div className="flex items-center gap-5 text-sm text-muted">
						<a
							href={INSTAGRAM_URL}
							target="_blank"
							rel="noopener noreferrer"
							className="flex items-center gap-2 transition-colors hover:text-fg"
						>
							<FaInstagram /> Instagram
						</a>
						<a href={SAHIBINDEN_URL} target="_blank" rel="noopener noreferrer" className="transition-opacity hover:opacity-80">
							<SahibindenBadge className="h-5" />
						</a>
					</div>
				</div>

				<div>
					<h2 className="eyebrow mb-5">{t("pages")}</h2>
					<ul className="space-y-3">
						{pages.map((p) => (
							<li key={p.href}>
								<Link href={p.href} className="text-fg/85 transition-colors hover:text-fg">
									{p.label}
								</Link>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h2 className="eyebrow mb-5">{t("branches")}</h2>
					<ul className="space-y-5 text-sm leading-relaxed">
						{BRANCHES.map((b) => (
							<li key={b.id}>
								<a href={b.map} target="_blank" rel="noopener noreferrer" className="group block">
									<span className="block font-medium text-fg">{c(b.id)}</span>
									<span className="text-muted transition-colors group-hover:text-fg/80">{b.lines.join(", ")}</span>
								</a>
							</li>
						))}
					</ul>
				</div>

				<div>
					<h2 className="eyebrow mb-5">{t("contactTitle")}</h2>
					<ul className="space-y-3 text-sm tabular-nums">
						<li>
							<a href={PHONE.href} dir="ltr" className="text-fg/85 transition-colors hover:text-fg">
								{PHONE.display}
							</a>
						</li>
						{WHATSAPP_LINES.map((line) => (
							<li key={line.id}>
								<a
									href={`https://wa.me/${line.phone}`}
									target="_blank"
									rel="noopener noreferrer"
									dir="ltr"
									className="text-fg/85 transition-colors hover:text-fg"
								>
									{line.display}
								</a>
							</li>
						))}
					</ul>
				</div>
			</div>

			<div className="border-t border-line">
				<div className="mx-auto flex max-w-[1320px] flex-col gap-2 px-4 py-6 text-xs text-muted sm:flex-row sm:justify-between sm:px-6 lg:px-10">
					<span>{t("rights", { year: new Date().getFullYear() })}</span>
					<span>
						{t("rental")} · {t("construction")} · {t("textile")}
					</span>
					<span>
						{t("createdBy")}{" "}
						<a
							href="http://keweble.com/"
							target="_blank"
							rel="noopener"
							className="text-fg underline decoration-white/30 underline-offset-4 transition-colors hover:decoration-white"
						>
							Keweble
						</a>
					</span>
				</div>
			</div>
		</footer>
	);
}
