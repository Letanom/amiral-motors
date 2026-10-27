import Image from "next/image";
import { getTranslations, setRequestLocale } from "next-intl/server";
import { ArrowRight, ArrowUpRight } from "lucide-react";
import { FaWhatsapp } from "react-icons/fa";
import { cars } from "../../data/cars";
import { Link } from "../../i18n/navigation";
import { featuredCars, whatsappLink } from "../../lib/fleet";
import { PHONE, SAHIBINDEN_URL, WHATSAPP_LINES } from "../../lib/site";
import CarCard from "../components/CarCard";
import HeroPoster from "../components/HeroPoster";
import HeroGlow from "../components/HeroGlow";
import LoopVideo from "../components/LoopVideo";
import SahibindenBadge from "../components/SahibindenBadge";
import StatCounter from "../components/StatCounter";
import TaillightCar from "../components/TaillightCar";

const delay = (ms: number) => ({ "--d": `${ms}ms` }) as React.CSSProperties;

const shell = "mx-auto max-w-[1320px] px-4 sm:px-6 lg:px-10";

export default async function HomePage({ params }: { params: Promise<{ locale: string }> }) {
	const { locale } = await params;
	setRequestLocale(locale);

	const t = await getTranslations();
	const fleetSize = cars.length;

	const realms = [
		{ key: "land", href: "/fleet", text: t("home.landText", { count: fleetSize }), video: { src: "/video-night.mp4", poster: "/posters/video-night.jpg" } },
		{ key: "sea", href: { pathname: "/fleet", query: { cat: "Yacht" } }, text: t("home.seaText"), image: "/luxury-yacht-new.webp" },
		{ key: "air", href: { pathname: "/fleet", query: { cat: "Helicopter" } }, text: t("home.airText"), image: "/helicopter-new.webp" }
	] as const;

	const numbers = [
		{ value: 2014, label: t("home.founded"), year: true },
		{ value: 1200, label: t("counters.rented"), suffix: "+" },
		{ value: 5000, label: t("counters.customers"), suffix: "+" },
		{ value: fleetSize, label: t("home.inFleet") }
	];

	return (
		<>
			{/* Hero */}
			<HeroPoster>
				<HeroGlow className="pointer-events-none absolute inset-x-0 top-0 h-[85%] w-full opacity-60" />
				<div className="pointer-events-none absolute inset-x-0 bottom-0 z-[6] h-40 bg-gradient-to-b from-transparent to-bg" aria-hidden />

				{/* Opening frame: the name at poster scale, the car below it, the meta row at the foot. */}
				<div className="absolute inset-0 z-10 flex flex-col">
					<div className="flex-1" />
					<div className="flex justify-center" aria-hidden>
						<div className="poster__word flex flex-col items-center">
							<span lang="en" className="enter">
								Amiral
							</span>
							<span className="eyebrow enter mt-[0.18em] text-fg/70 [font-stretch:100%]" style={delay(160)}>
								Motors <span className="text-signal">·</span> Luxury Car Rentals
							</span>
						</div>
					</div>
					{/* The car gets whatever room is left between the tagline and the scroll cue, so it never touches either. */}
					<div className="flex min-h-0 flex-1 items-center justify-center py-5">
						<TaillightCar />
					</div>
					{/* Equal side columns keep the scroll cue on the true centre line whatever the side labels' lengths. */}
					<div className={`poster__meta ${shell} grid w-full grid-cols-[1fr_auto_1fr] items-end gap-6 pb-8`}>
						<span className="eyebrow enter justify-self-start" style={delay(300)}>
							{t("hero.eyebrow")}
						</span>
						<span className="eyebrow enter flex flex-col items-center gap-3" style={delay(380)}>
							{/* Letter-spacing trails the last letter; matching start padding re-centres the word. */}
							<span className="ps-[0.16em]">{t("hero.scroll")}</span>
							<span className="scroll-cue" aria-hidden />
						</span>
						<span className="eyebrow enter hidden justify-self-end text-end sm:inline" style={delay(460)}>
							{t("hero.since")}
						</span>
					</div>
				</div>

				{/* Second frame: the claim and the ways to act on it. */}
				<div className={`poster__claim absolute inset-0 z-10 flex items-center`}>
					<div className={`${shell} w-full`}>
						<p className="eyebrow">
							{t("hero.eyebrow")} — {t("hero.since")}
						</p>
						<h1 className="wide mt-7 text-[clamp(2.6rem,6.6vw,6.75rem)] leading-[0.95] [font-stretch:115%]">
							{t("hero.line1")}
							<br />
							<span className="text-muted">{t("hero.line2")}</span>
						</h1>
						<p className="mt-8 max-w-xl text-lg leading-relaxed text-muted sm:text-xl">{t("hero.subtitle")}</p>
						<div className="mt-10 flex flex-wrap items-center gap-3">
							<Link
								href="/fleet"
								className="sheen group inline-flex h-14 items-center gap-3 rounded-full bg-fg px-8 font-medium text-bg shadow-[0_10px_40px_-12px_rgb(255_255_255/0.35)]"
							>
								<span>{t("hero.cta_fleet")}</span>
								<ArrowRight size={18} strokeWidth={1.75} className="transition-transform duration-300 group-hover:translate-x-1 rtl:-scale-x-100 rtl:group-hover:-translate-x-1" />
							</Link>

							{/* One glass pill, two channels: WhatsApp on one side, the sahibinden.com showroom on the other. */}
							<div className="inline-flex h-14 items-stretch rounded-full border border-white/15 bg-white/[0.06]">
								<a
									href={whatsappLink(t("whatsapp.message"))}
									target="_blank"
									rel="noopener noreferrer"
									className="inline-flex items-center gap-2.5 rounded-s-full ps-6 pe-5 transition-colors hover:bg-white/[0.07]"
								>
									<FaWhatsapp className="text-xl text-[#25d366]" />
									<span>WhatsApp</span>
								</a>
								<span className="my-3.5 w-px bg-white/15" aria-hidden />
								<a
									href={SAHIBINDEN_URL}
									target="_blank"
									rel="noopener noreferrer"
									aria-label={`sahibinden.com — ${t("hero.sahibinden")}`}
									title={t("hero.sahibinden")}
									className="group inline-flex items-center rounded-e-full ps-5 pe-6 transition-colors hover:bg-white/[0.07]"
								>
									<SahibindenBadge className="h-[1.375rem] transition-transform duration-300 group-hover:scale-105" />
								</a>
							</div>
						</div>
					</div>
				</div>
			</HeroPoster>

			{/* Featured cars */}
			<section className={shell}>
				<div className="flex flex-wrap items-end justify-between gap-6">
					<h2 className="wide text-3xl sm:text-4xl">{t("home.collectionTitle")}</h2>
					<Link href="/fleet" className="group inline-flex items-center gap-2 text-muted transition-colors hover:text-fg">
						{t("home.viewAll")} ({fleetSize})
						<ArrowRight size={16} strokeWidth={1.75} className="transition-transform group-hover:translate-x-1 rtl:-scale-x-100" />
					</Link>
				</div>
				<div className="mt-10 grid gap-x-6 gap-y-14 sm:grid-cols-2 lg:grid-cols-3">
					{featuredCars.map((car, i) => (
						<CarCard key={car.id} car={car} priority={i < 3} />
					))}
				</div>
			</section>

			{/* Land, sea, air */}
			<section className={`${shell} pt-28 lg:pt-36`}>
				<h2 className="wide text-3xl sm:text-4xl">{t("home.realmsTitle")}</h2>
				<div className="mt-10 grid gap-6 md:grid-cols-3">
					{realms.map((realm) => (
						<Link key={realm.key} href={realm.href} className="group relative block aspect-[4/5] overflow-hidden rounded-md bg-surface">
							{"video" in realm ? (
								<LoopVideo
									src={realm.video.src}
									poster={realm.video.poster}
									className="absolute inset-0 h-full w-full object-cover transition-transform duration-[1.4s] ease-out-quint group-hover:scale-[1.04]"
								/>
							) : (
								<Image
									src={realm.image}
									alt=""
									fill
									sizes="(min-width: 768px) 33vw, 100vw"
									className="object-cover transition-transform duration-[1.4s] ease-out-quint group-hover:scale-[1.04]"
								/>
							)}
							<div className="absolute inset-0 bg-gradient-to-t from-black/85 via-black/10 to-transparent" />
							<div className="absolute inset-x-0 bottom-0 flex items-end justify-between gap-4 p-6">
								<div>
									<h3 className="wide text-3xl uppercase">{t(`home.${realm.key}`)}</h3>
									<p className="mt-2 max-w-[16rem] text-sm leading-relaxed text-white/75">{realm.text}</p>
								</div>
								<span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-white/30 transition-colors group-hover:bg-fg group-hover:text-bg">
									<ArrowUpRight size={18} strokeWidth={1.75} className="rtl:-scale-x-100" />
								</span>
							</div>
						</Link>
					))}
				</div>
			</section>

			{/* Services */}
			<section className={`${shell} pt-28 lg:pt-36`}>
				<h2 className="wide max-w-2xl text-3xl sm:text-4xl">{t("home.servicesTitle")}</h2>
				<div className="mt-12 grid gap-10 sm:grid-cols-2 lg:grid-cols-4 lg:gap-8">
					{[1, 2, 3, 4].map((n) => (
						<div key={n} className="border-t border-line pt-6">
							<h3 className="text-lg font-medium">{t(`home.s${n}Title`)}</h3>
							<p className="mt-3 leading-relaxed text-muted">{t(`home.s${n}Text`)}</p>
						</div>
					))}
				</div>
			</section>

			{/* Numbers */}
			<section className={`${shell} pt-28 lg:pt-36`}>
				<p className="eyebrow">{t("counters.title")}</p>
				<h2 className="wide mt-5 max-w-4xl text-3xl leading-[1.1] sm:text-5xl">{t("counters.desc")}</h2>
				<dl className="mt-16 grid grid-cols-2 gap-x-6 gap-y-12 lg:grid-cols-4 lg:gap-x-10">
					{numbers.map((num, i) => (
						<StatCounter key={num.label} {...num} delay={i * 140} />
					))}
				</dl>
			</section>

			{/* Reservation */}
			<section className={`${shell} pt-28 lg:pt-36`}>
				<div className="grid gap-10 rounded-lg bg-surface p-8 sm:p-12 lg:grid-cols-2 lg:items-center lg:p-16">
					<div>
						<h2 className="wide text-4xl sm:text-5xl">{t("home.ctaTitle")}</h2>
						<p className="mt-5 max-w-md text-lg leading-relaxed text-muted">{t("home.ctaText")}</p>
					</div>
					<div className="flex flex-col gap-3">
						{WHATSAPP_LINES.map((line, i) => (
							<a
								key={line.id}
								href={whatsappLink(t("whatsapp.message"), i)}
								target="_blank"
								rel="noopener noreferrer"
								className="group flex items-center justify-between gap-4 rounded-md border border-line bg-bg/40 px-5 py-4 transition-colors hover:border-white/30"
							>
								<span className="flex items-center gap-4">
									<FaWhatsapp className="text-2xl text-[#25d366]" />
									<span>
										<span className="block text-sm text-muted">{i === 0 ? t("home.lineSales") : t("home.lineVip")}</span>
										<span dir="ltr" className="mt-0.5 block text-lg font-medium tabular-nums">
											{line.display}
										</span>
									</span>
								</span>
								<ArrowUpRight size={18} strokeWidth={1.75} className="text-muted transition-colors group-hover:text-fg rtl:-scale-x-100" />
							</a>
						))}
						<a
							href={PHONE.href}
							className="group flex items-center justify-between gap-4 rounded-md border border-line bg-bg/40 px-5 py-4 transition-colors hover:border-white/30"
						>
							<span>
								<span className="block text-sm text-muted">{t("home.callCenter")}</span>
								<span dir="ltr" className="mt-0.5 block text-lg font-medium tabular-nums">
									{PHONE.display}
								</span>
							</span>
							<ArrowUpRight size={18} strokeWidth={1.75} className="text-muted transition-colors group-hover:text-fg rtl:-scale-x-100" />
						</a>
					</div>
				</div>
			</section>
		</>
	);
}
