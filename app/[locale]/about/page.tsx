import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import MoltenField from "../../components/MoltenField";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });
	return { title: t("aboutTitle"), alternates: { canonical: `/${locale}/about` } };
}

const YEARS = ["2014", "2019", "2020", "2025"];

export default async function AboutPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations();

	return (
		<div className="mx-auto max-w-[1320px] px-4 pt-12 sm:px-6 lg:px-10 lg:pt-16">
			<MoltenField className="pointer-events-none fixed inset-0 -z-10 h-full w-full opacity-45" />
			<header className="enter max-w-3xl">
				<p className="eyebrow">{t("about.title")}</p>
				<h1 className="wide mt-5 text-4xl sm:text-6xl">{t("about.lead")}</h1>
			</header>

			<div className="mt-16 grid gap-14 lg:grid-cols-12 lg:gap-12">
				<div className="space-y-6 text-lg leading-relaxed text-fg/85 lg:col-span-6">
					<p>{t("about.p1")}</p>
					<p className="text-muted">{t("about.p3")}</p>
					<p className="text-muted">{t("about.p4")}</p>
				</div>

				<section className="lg:col-span-5 lg:col-start-8">
					<h2 className="eyebrow">{t("about.timelineLabel")}</h2>
					<ol className="mt-6">
						{YEARS.map((year) => (
							<li key={year} className="grid grid-cols-[5.5rem_1fr] gap-4 border-t border-line py-5">
								<span className="wide text-xl tabular-nums">{year}</span>
								<span className="leading-relaxed text-muted">{t(`about.y${year}`)}</span>
							</li>
						))}
					</ol>
				</section>
			</div>

			<section className="mt-24">
				<h2 className="eyebrow">{t("about.sectorsLabel")}</h2>
				<div className="mt-6 grid gap-3 sm:grid-cols-3">
					{[t("about.rental"), t("footer.construction"), t("footer.textile")].map((s) => (
						<div key={s} className="rounded-md bg-surface px-6 py-8 text-xl font-medium">
							{s}
						</div>
					))}
				</div>
				<p className="wide mx-auto mt-24 max-w-3xl text-center text-2xl text-muted sm:text-3xl">{t("about.footer")}</p>
			</section>
		</div>
	);
}
