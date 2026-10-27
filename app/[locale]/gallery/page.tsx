import type { Metadata } from "next";
import { getTranslations, setRequestLocale } from "next-intl/server";
import GalleryGrid from "../../components/GalleryGrid";

type Props = { params: Promise<{ locale: string }> };

export async function generateMetadata({ params }: Props): Promise<Metadata> {
	const { locale } = await params;
	const t = await getTranslations({ locale, namespace: "meta" });
	return { title: t("galleryTitle"), alternates: { canonical: `/${locale}/gallery` } };
}

const FILMS = ["video-night", "video2", "video3", "video4"];

export default async function GalleryPage({ params }: Props) {
	const { locale } = await params;
	setRequestLocale(locale);
	const t = await getTranslations("gallery");

	const films = FILMS.map((name, i) => ({
		src: `/${name}.mp4`,
		poster: `/posters/${name}.jpg`,
		title: t(`video${i + 1}_title`),
		text: t(`video${i + 1}_desc`)
	}));

	return (
		<div className="mx-auto max-w-[1320px] px-4 pt-12 sm:px-6 lg:px-10 lg:pt-16">
			<header className="enter max-w-2xl">
				<h1 className="wide text-4xl sm:text-6xl">{t("title")}</h1>
				<p className="mt-5 text-lg leading-relaxed text-muted">{t("subtitle")}</p>
			</header>
			<div className="mt-14">
				<GalleryGrid films={films} watchLabel={t("watch")} closeLabel={t("close")} />
			</div>
		</div>
	);
}
