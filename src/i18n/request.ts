import { getRequestConfig } from "next-intl/server";
import { defaultLocale } from "../../i18n.config";

export default getRequestConfig(async ({ locale }) => {
	const resolved = locale ?? defaultLocale;
	return {
		locale: resolved,
		messages: (await import(`../../messages/${resolved}.json`)).default
	};
});

