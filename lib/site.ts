export const SITE_URL = "https://amiralmotors.com";

export const PHONE = { href: "tel:08503404436", display: "0850 340 44 36" };

export const WHATSAPP_LINES = [
	{ id: "sales", phone: "905316350034", display: "+90 531 635 00 34" },
	{ id: "vip", phone: "905326599934", display: "+90 532 659 99 34" }
] as const;

export const INSTAGRAM_URL = "https://www.instagram.com/amiralmotors/";
export const SAHIBINDEN_URL = "https://amiralmotors.sahibinden.com/";

export const BRANCHES = [
	{
		id: "istanbul",
		lines: ["Huzur Mahallesi Azerbaycan Caddesi No:4", "Skyland Residence B Blok Daire: 150", "Sarıyer / İstanbul"],
		map: "https://maps.google.com/?q=Skyland+Residence+Istanbul",
		embed: "https://maps.google.com/maps?q=Skyland+Residence+Istanbul&z=15&output=embed"
	},
	{
		id: "bodrum",
		lines: ["Küçükbük Mahallesi 42. Sokak", "Kanyon Sitesi No:27", "Türkbükü Bodrum / Muğla"],
		map: "https://maps.google.com/?q=Türkbükü+Bodrum+Küçükbük+Mahallesi+42.+Sokak+Kanyon+Sitesi+No:27",
		embed: "https://maps.google.com/maps?q=T%C3%BCrkb%C3%BCk%C3%BC+Bodrum&z=14&output=embed"
	}
] as const;
