export const locales = ['tr', 'en', 'ar', 'de'] as const;
export type AppLocale = (typeof locales)[number];

export const defaultLocale: AppLocale = 'tr';

// Set locale prefixing behavior: always prefix except default
export const localePrefix = 'as-needed' as const;

export const isRtl = (locale: AppLocale) => locale === 'ar';

export const localeNames: Record<AppLocale, string> = {
	tr: 'Türkçe',
	en: 'English',
	ar: 'العربية',
	de: 'Deutsch'
};

