import { MetadataRoute } from "next";
import { locales } from "../i18n.config";
import { cars } from "../data/cars";

export default function sitemap(): MetadataRoute.Sitemap {
	const base = "https://amiral-group.example.com";
	const routes = ["", "/fleet", "/about", "/contact"].flatMap((p) =>
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

