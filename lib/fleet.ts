import { cars, type Car } from "../data/cars";
import { WHATSAPP_LINES } from "./site";
import { buildWhatsAppLink } from "./utils";

export const categories = ["All", "Sports", "SUV", "Sedan", "Cabrio", "Hatchback", "Yacht", "Helicopter"] as const;
export type CategoryFilter = (typeof categories)[number];

export const carName = (car: Car) => `${car.brand} ${car.model}`;

/** Catalogue number: the car's stable position in the data file. */
export const lotNumber = (car: Car) => String(cars.findIndex((c) => c.slug === car.slug) + 1).padStart(2, "0");

/** Yachts and helicopters have no road specs worth listing. */
export const isVessel = (car: Car) => car.category === "Yacht" || car.category === "Helicopter";

export const getCar = (slug: string) => cars.find((c) => c.slug === slug);

const FEATURED_SLUGS = [
	"lamborghini-huracan",
	"ferrari-488-gtb",
	"mercedes-g63-amg",
	"lamborghini-urus",
	"porsche-taycan-turbo-s",
	"land-rover-range-rover-vogue"
];

export const featuredCars = FEATURED_SLUGS.map(getCar).filter((c): c is Car => Boolean(c));

export const whatsappLink = (message: string, line = 0) => buildWhatsAppLink(WHATSAPP_LINES[line].phone, message);
