import { MetadataRoute } from "next";
import { locales } from "../i18n.config";
import { cars } from "../data/cars";
import { SITE_URL } from "../lib/site";

export default function sitemap(): MetadataRoute.Sitemap {
	const base = SITE_URL;
	const routes = ["", "/fleet", "/gallery", "/about", "/contact"].flatMap((p) =>
		locales.map((l) => ({
			url: `${base}/${l}${p}`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: p === "" ? 1 : 0.8
		}))
	);
	const carRoutes = cars.flatMap((c) =>
		locales.map((l) => ({
			url: `${base}/${l}/fleet/${c.slug}`,
			lastModified: new Date(),
			changeFrequency: "weekly" as const,
			priority: 0.7
		}))
	);
	return [...routes, ...carRoutes];
}

