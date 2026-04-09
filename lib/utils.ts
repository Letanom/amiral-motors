export function cn(...classes: Array<string | false | null | undefined>) {
	return classes.filter(Boolean).join(' ');
}

export function buildWhatsAppLink(phoneE164: string, message: string) {
	const base = 'https://wa.me/';
	const encoded = encodeURIComponent(message);
	return `${base}${phoneE164}?text=${encoded}`;
}

