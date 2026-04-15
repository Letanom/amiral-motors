export type CarColor = {
	name: string;
	nameKey: string;
	hex: string;
	image: string;
};

export type Car = {
	id: string;
	slug: string;
	brand: string;
	model: string;
	category: "SUV" | "Sedan" | "Cabrio" | "Sports" | "Hatchback" | "Yacht" | "Helicopter";
	description: { tr: string; en: string; ar: string; de: string };
	specs: {
		engine: string;
		power: string;
		acceleration: string;
		seats: number;
		transmission: string;
		drive: string;
	};
	dailyPrice: number;
	colors: CarColor[];
	featured?: boolean;
};

const img = (seed: string) =>
	`https://images.unsplash.com/photo-1511396275276-6c78950aa0e0?q=80&auto=format&fit=crop&w=1600&ixid=${encodeURIComponent(seed)}`;

export const cars: Car[] = [
	{
		id: "lamborghini-huracan",
		slug: "lamborghini-huracan",
		brand: "Lamborghini",
		model: "Huracan",
		
		category: "Sports",
		description: {
			tr: "V10 motorun gücü ve keskin İtalyan tasarımı.",
			en: "The power of the V10 engine and sharp Italian design.",
			ar: "قوة محرك V10 والتصميم الإيطالي الحاد.",
			de: "Die Kraft des V10-Motors und scharfes italienisches Design."
		},
		specs: {
			engine: "petrol",
			power: "610 HP",
			acceleration: "3.2s",
			seats: 2,
			transmission: "automatic",
			drive: "AWD"
		},
		dailyPrice: 0,
		colors: [
			{ name: "Gri", nameKey: "grey", hex: "#808080", image: "/lamborghini-huracan.jpeg" },
			{ name: "Koyu Yeşil", nameKey: "dark-green", hex: "#006400", image: "/lamborghini-huracan-dark-green.jpeg" }
		],
		featured: true
	},
	{
		id: "lamborghini-urus",
		slug: "lamborghini-urus",
		brand: "Lamborghini",
		model: "Urus",
		
		category: "SUV",
		description: {
			tr: "Dünyanın ilk süper spor arazi aracı.",
			en: "The world's first Super Sport Utility Vehicle.",
			ar: "أول سيارة دفع رباعي رياضية فائقة في العالم.",
			de: "Das weltweit erste Super Sport Utility Vehicle."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 4,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/lamborghini-urus.jpeg" },
			{ name: "Yeşil", nameKey: "green", hex: "#4caf50", image: "/lamborghini-urus-green.jpeg" }
		],
		featured: true
	},
	{
		id: "ferrari-488-gtb",
		slug: "ferrari-488-gtb",
		brand: "Ferrari",
		model: "488 GTB",
		
		category: "Sports",
		description: {
			tr: "İtalyan mühendisliğinin ve hızın simgesi.",
			en: "A symbol of Italian engineering and speed.",
			ar: "رمز للهندسة الإيطالية والسرعة.",
			de: "Ein Symbol für italienische Ingenieurskunst und Geschwindigkeit."
		},
		specs: {
			engine: "petrol",
			power: "670 HP",
			acceleration: "3.0s",
			seats: 2,
			transmission: "automatic",
			drive: "RWD"
		},
		dailyPrice: 0,
		colors: [
			{ name: "Standart", nameKey: "standard", hex: "#FF0000", image: "/ferrari-488-gtb.jpeg" }
		],
		featured: true
	},
	{
		id: "mercedes-amg-gt-63-s",
		slug: "mercedes-amg-gt-63-s",
		brand: "Mercedes-AMG",
		model: "GT 63 S 4MATIC+",
		
		category: "Sedan",
		description: {
			tr: "Dört kapılı süper spor performansı.",
			en: "Four-door super sport performance.",
			ar: "أداء رياضي فائق بأربعة أبواب.",
			de: "Viertürige Supersport-Performance."
		},
		specs: {
			engine: "petrol",
			power: "639 HP",
			acceleration: "3.2s",
			seats: 4,
			transmission: "automatic",
			drive: "4MATIC+"
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/mercedes-amg-gt63s.jpeg" }
		],
		featured: true
	},
	{
		id: "mercedes-g63-amg",
		slug: "mercedes-g63-amg",
		brand: "Mercedes-Benz",
		model: "G63 AMG",
		
		category: "SUV",
		description: {
			tr: "İkonik tasarım ve üstün arazi performansı.",
			en: "Iconic design and superior off-road performance.",
			ar: "تصميم أيقوني وأداء فائق في الطرق الوعرة.",
			de: "Ikonisches Design und überlegene Offroad-Performance."
		},
		specs: {
			engine: "petrol",
			power: "585 HP",
			acceleration: "4.5s",
			seats: 5,
			transmission: "automatic",
			drive: "AWD"
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/mercedes-g63-black.jpeg" },
			{ name: "Beyaz", nameKey: "white", hex: "#FFFFFF", image: "/mercedes-g63-white.jpeg" }
		],
		featured: true
	},
	{
		id: "mercedes-s-class",
		slug: "mercedes-s-class",
		brand: "Mercedes-Benz",
		model: "S Class",
		
		category: "Sedan",
		description: {
			tr: "Lüksün ve konforun zirvesi.",
			en: "The pinnacle of luxury and comfort.",
			ar: "قمة الفخامة والراحة.",
			de: "Der Gipfel von Luxus und Komfort."
		},
		specs: {
			engine: "diesel",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/mercedes-s-class.jpeg" },
			{ name: "Beyaz", nameKey: "white", hex: "#FFFFFF", image: "/mercedes-s-class-white.jpeg" }
		],
		featured: true
	},
	{
		id: "bmw-7-serisi-elektrik",
		slug: "bmw-7-serisi-elektrik",
		brand: "BMW",
		model: "7 Serisi i7 (Elektrikli)",
		
		category: "Sedan",
		description: {
			tr: "Geleceğin lüksü, elektrikli performans.",
			en: "The luxury of the future, electric performance.",
			ar: "فخامة المستقبل، أداء كهربائي.",
			de: "Luxus der Zukunft, elektrische Leistung."
		},
		specs: {
			engine: "electric",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/bmw-i7-siyah.jpeg" },
			{ name: "Mavi", nameKey: "blue", hex: "#0000FF", image: "/bmw-i7-mavi.jpeg" }
		],
		featured: true
	},
	{
		id: "land-rover-range-rover-vogue",
		slug: "land-rover-range-rover-vogue",
		brand: "Land Rover",
		model: "Range Rover Vogue",
		
		category: "SUV",
		description: {
			tr: "Lüks SUV deneyimi.",
			en: "Luxury SUV experience.",
			ar: "تجربة دفع رباعي فاخرة.",
			de: "Luxus-SUV-Erlebnis."
		},
		specs: {
			engine: "diesel",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/range-rover-vogue.jpeg" }
		],
		featured: true
	},
	{
		id: "porsche-taycan-turbo-s",
		slug: "porsche-taycan-turbo-s",
		brand: "Porsche",
		model: "Taycan Turbo S",
		
		category: "Sports",
		description: {
			tr: "Elektrikli performansın zirvesi.",
			en: "The pinnacle of electric performance.",
			ar: "قمة الأداء الكهربائي.",
			de: "Der Gipfel der elektrischen Leistung."
		},
		specs: {
			engine: "electric",
			power: "",
			acceleration: "",
			seats: 4,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Blue", nameKey: "blue", hex: "#4a90e2", image: "/porsche-taycan-turbo-s.jpeg" },
			{ name: "Mat Siyah", nameKey: "matte-black", hex: "#1a1a1a", image: "/porsche-taycan-turbo-s-matte-black.jpeg" },
			{ name: "Kum Rengi", nameKey: "sand", hex: "#c2b280", image: "/porsche-taycan-sand.jpeg" },
			{ name: "Gri", nameKey: "grey", hex: "#808080", image: "/porsche-taycan-turbo-s-gri.jpeg" }
		],
		featured: true
	},
	{
		id: "porsche-taycan-4s",
		slug: "porsche-taycan-4s",
		brand: "Porsche",
		model: "Taycan 4S",
		
		category: "Sedan",
		description: {
			tr: "Elektrikli lüks sedan.",
			en: "Electric luxury sedan.",
			ar: "سيدان كهربائية فاخرة.",
			de: "Elektrische Luxuslimousine."
		},
		specs: {
			engine: "electric",
			power: "",
			acceleration: "",
			seats: 4,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/porsche-taycan.jpeg" },
			{ name: "Kırmızı", nameKey: "red", hex: "#FF0000", image: "/porsche-taycan-4s-red.jpeg" }
		],
		featured: true
	},
	{
		id: "porsche-718-boxster",
		slug: "porsche-718-boxster",
		brand: "Porsche",
		model: "718 Boxster",
		
		category: "Cabrio",
		description: {
			tr: "Saf spor otomobil keyfi.",
			en: "Pure sports car pleasure.",
			ar: "متعة السيارات الرياضية الخالصة.",
			de: "Reines Sportwagenvergnügen."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 2,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/porsche-718-boxster.jpeg" },
			{ name: "Sarı", nameKey: "yellow", hex: "#FFD700", image: "/porsche-718-boxster-yellow.jpeg" }
		],
		featured: true
	},
	{
		id: "mercedes-e-serisi",
		slug: "mercedes-e-serisi",
		brand: "Mercedes",
		model: "E Serisi",
		
		category: "Sedan",
		description: {
			tr: "Konfor ve prestij.",
			en: "Comfort and prestige.",
			ar: "راحة وهيبة.",
			de: "Komfort und Prestige."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/mercedes-e-class-sedan-dizel-siyah.jpeg" }
		],
		featured: true
	},
	{
		id: "land-rover-sport",
		slug: "land-rover-sport",
		brand: "Land Rover",
		model: "Range Rover Sport",
		
		category: "SUV",
		description: {
			tr: "Dinamik performans ve heybetli duruş.",
			en: "Dynamic performance and imposing presence.",
			ar: "أداء ديناميكي وحضور مهيب.",
			de: "Dynamische Leistung und imposante Präsenz."
		},
		specs: {
			engine: "diesel",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/range-rover-sport.jpeg" }
		],
		featured: true
	},
	{
		id: "land-rover-velar",
		slug: "land-rover-velar",
		brand: "Land Rover",
		model: "Range Rover Velar",
		
		category: "SUV",
		description: {
			tr: "Avangart tasarım ve üstün performans.",
			en: "Avant-garde design and superior performance.",
			ar: "تصميم طليعي وأداء فائق.",
			de: "Avantgardistisches Design und überlegene Leistung."
		},
		specs: {
			engine: "diesel",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/range-rover-velar.jpeg" }
		],
		featured: true
	},
	{
		id: "porsche-macan",
		slug: "porsche-macan",
		brand: "Porsche",
		model: "Macan",
		
		category: "SUV",
		description: {
			tr: "Kompakt SUV sınıfında Porsche heyecanı.",
			en: "Porsche excitement in the compact SUV class.",
			ar: "إثارة بورشه in فئة سيارات الدفع الرباعي المدمجة.",
			de: "Porsche-Erlebnis in der kompakten SUV-Klasse."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/porsche-macan.jpeg" },
			{ name: "Beyaz", nameKey: "white", hex: "#FFFFFF", image: "/porsche-macan-white.jpeg" }
		],
		featured: true
	},
	{
		id: "land-rover-defender",
		slug: "land-rover-defender",
		brand: "Land Rover",
		model: "Defender",
		
		category: "SUV",
		description: {
			tr: "Heryere gitme yeteneği ve efsanevi dayanıklılık.",
			en: "Go-anywhere capability and legendary durability.",
			ar: "القدرة على الذهاب إلى أي مكان والمتانة الأسطورية.",
			de: "Überall einsetzbar und legendäre Langlebigkeit."
		},
		specs: {
			engine: "diesel",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/range-rover-defender.jpeg" }
		],
		featured: true
	},
	{
		id: "chevrolet-camaro",
		slug: "chevrolet-camaro",
		brand: "Chevrolet",
		model: "Camaro",
		
		category: "Sports",
		description: {
			tr: "Amerikan kaslı gücü ve adrenalin.",
			en: "American muscle power and adrenaline.",
			ar: "قوة العضلات الأمريكية والأدرينالين.",
			de: "Amerikanische Muskelkraft und Adrenalin."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 4,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Sarı", nameKey: "yellow", hex: "#FFFF00", image: "/chevrolet-camaro-yellow.jpeg" },
			{ name: "Kırmızı", nameKey: "red", hex: "#FF0000", image: "/chevrolet-camaro-red.jpeg" }
		],
		featured: true
	},
	{
		id: "ford-mustang",
		slug: "ford-mustang",
		brand: "Ford",
		model: "Mustang",
		
		category: "Sports",
		description: {
			tr: "Güç ve performans.",
			en: "Power and performance.",
			ar: "قوة وأداء.",
			de: "Kraft und Leistung."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 4,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Lacivert", nameKey: "navy", hex: "#000080", image: "/ford-mustang.jpeg" },
			{ name: "Gri", nameKey: "grey", hex: "#808080", image: "/ford-mustang-grey.jpeg" },
			{ name: "Sarı", nameKey: "yellow", hex: "#FFD700", image: "/ford-mustang-sari.jpeg" }
		],
		featured: true
	},
	{
		id: "bmw-z4",
		slug: "bmw-z4",
		brand: "BMW",
		model: "Z4",
		
		category: "Cabrio",
		description: {
			tr: "Saf sürüş keyfi ve sportif ruh.",
			en: "Pure driving pleasure and sporty spirit.",
			ar: "متعة قيادة خالصة وروح رياضية.",
			de: "Reine Fahrfreude und sportlicher Geist."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 2,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Kırmızı", nameKey: "red", hex: "#FF0000", image: "/bmw-z4.jpeg" },
			{ name: "Gri", nameKey: "grey", hex: "#808080", image: "/bmw-z4-grey.jpeg" },
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/bmw-z4-black.jpeg" },
			{ name: "Bebek Mavisi", nameKey: "baby-blue", hex: "#89CFF0", image: "/bmw-z4-baby-blue.jpeg" }
		],
		featured: true
	},
	{
		id: "bmw-5-serisi-elektrik",
		slug: "bmw-5-serisi-elektrik",
		brand: "BMW",
		model: "5 Serisi i5 (Elektrikli)",
		
		category: "Sedan",
		description: {
			tr: "Yenilikçi teknoloji ve sürdürülebilir lüks.",
			en: "Innovative technology and sustainable luxury.",
			ar: "تكنولوجيا مبتكرة وفخامة مستدامة.",
			de: "Innovative Technologie und nachhaltiger Luxus."
		},
		specs: {
			engine: "electric",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/bmw-5-series-electric.jpeg" },
			{ name: "Koyu Kırmızı", nameKey: "dark-red", hex: "#8B0000", image: "/bmw-i5-koyu-kirmizi.jpeg" }
		],
		featured: true
	},
	{
		id: "volvo-xc90",
		slug: "volvo-xc90",
		brand: "Volvo",
		model: "XC90",
		
		category: "SUV",
		description: {
			tr: "İskandinav lüksü ve en üst düzey güvenlik.",
			en: "Scandinavian luxury and top-tier safety.",
			ar: "الفخامة الاسكندنافية وأعلى مستويات الأمان.",
			de: "Skandinavischer Luxus und erstklassige Sicherheit."
		},
		specs: {
			engine: "diesel",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/volvo-xc90.jpeg" }
		],
		featured: true
	},
	{
		id: "audi-a5-cabrio",
		slug: "audi-a5-cabrio",
		brand: "Audi",
		model: "A5 Cabrio",
		
		category: "Cabrio",
		description: {
			tr: "Açık hava sürüş keyfi ve şıklık.",
			en: "Open-air driving pleasure and elegance.",
			ar: "متعة القيادة في الهواء الطلق والأناقة.",
			de: "Open-Air-Fahrspaß und Eleganz."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 4,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/audi-a5-cabrio.jpeg" },
			{ name: "Kırmızı", nameKey: "red", hex: "#FF0000", image: "/audi-a5-cabrio-kirmizi.jpeg" }
		],
		featured: true
	},
	{
		id: "bmw-4-serisi",
		slug: "bmw-4-serisi",
		brand: "BMW",
		model: "4 Serisi",
		
		category: "Sports",
		description: {
			tr: "Estetik dizayn ve etkileyici dinamizm.",
			en: "Aesthetic design and impressive dynamism.",
			ar: "تصميم جمالي وديناميكية مثيرة للإعجاب.",
			de: "Ästhetisches Design und beeindruckende Dynamik."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 4,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Yeşil", nameKey: "green", hex: "#2e7d32", image: "/bmw-4-series.jpeg" },
			{ name: "Mavi", nameKey: "blue", hex: "#1565c0", image: "/bmw-4-series-blue.jpeg" },
			{ name: "Nardo Gri", nameKey: "nardo-grey", hex: "#8A8D8F", image: "/bmw-4-series-nardo-gri.jpeg" },
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/bmw-4-series-black.jpeg" },
			{ name: "Kırmızı", nameKey: "red", hex: "#FF0000", image: "/bmw-4-series-red.jpeg" },
			{ name: "Neon Yeşil", nameKey: "neon-green", hex: "#39FF14", image: "/bmw-4-series-neon-green.jpeg" }
		],
		featured: true
	},
	{
		id: "audi-a5-coupe",
		slug: "audi-a5-coupe",
		brand: "Audi",
		model: "A5 Coupe",
		
		category: "Sports",
		description: {
			tr: "Sportif zarafet ve yüksek performans.",
			en: "Sporty elegance and high performance.",
			ar: "أناقة رياضية وأداء عالي.",
			de: "Sportliche Eleganz und hohe Leistung."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 4,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Kırmızı", nameKey: "red", hex: "#FF0000", image: "/audi-a5-coupe.jpeg" },
			{ name: "Mavi", nameKey: "blue", hex: "#0000FF", image: "/audi-a5-coupe-mavi.jpeg" },
			{ name: "Koyu Mavi", nameKey: "dark-blue", hex: "#00008B", image: "/audi-a5-coupe-dark-blue.jpeg" }
		],
		featured: true
	},
	{
		id: "volvo-xc60",
		slug: "volvo-xc60",
		brand: "Volvo",
		model: "XC60",
		
		category: "SUV",
		description: {
			tr: "İskandinav zarafeti ve dinamik performans.",
			en: "Scandinavian elegance and dynamic performance.",
			ar: "الأناقة الاسكندنافية والأداء الديناميكي.",
			de: "Skandinavische Eleganz und dynamische Leistung."
		},
		specs: {
			engine: "diesel",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/volvo-xc60.jpeg" }
		],
		featured: true
	},
	{
		id: "land-rover-range-rover-evoque",
		slug: "land-rover-range-rover-evoque",
		brand: "Land Rover",
		model: "Range Rover Evoque",
		
		category: "SUV",
		description: {
			tr: "Premium SUV deneyimi.",
			en: "Premium SUV experience.",
			ar: "تجربة دفع رباعي فاخرة.",
			de: "Premium-SUV-Erlebnis."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Gri", nameKey: "grey", hex: "#808080", image: "/land_rover.jpeg" }
		],
		featured: true
	},
	{
		id: "mercedes-eqe",
		slug: "mercedes-eqe",
		brand: "Mercedes-Benz",
		model: "EQE",
		
		category: "Sedan",
		description: {
			tr: "Tam elektrikli lüks ve inovasyon.",
			en: "All-electric luxury and innovation.",
			ar: "الفخامة والابتكار الكهربائي بالكامل.",
			de: "Voll elektrische Luxus und Innovation."
		},
		specs: {
			engine: "electric",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/mercedes-eqe.jpeg" },
			{ name: "Beyaz", nameKey: "white", hex: "#FFFFFF", image: "/mercedes-eqe-white.jpeg" }
		],
		featured: true
	},
	{
		id: "bmw-x3",
		slug: "bmw-x3",
		brand: "BMW",
		model: "X3",
		
		category: "SUV",
		description: {
			tr: "Maceraya hazır, güçlü ve şık.",
			en: "Ready for adventure, powerful and stylish.",
			ar: "جاهزة للمغامرة، قوية وأنيقة.",
			de: "Bereit für Abenteuer, kraftvoll und stilvoll."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Beyaz", nameKey: "white", hex: "#FFFFFF", image: "/bmw-x3.jpeg" },
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/bmw-x3-black.jpeg" }
		],
		featured: true
	},
	{
		id: "audi-q3",
		slug: "audi-q3",
		brand: "Audi",
		model: "Q3",
		
		category: "SUV",
		description: {
			tr: "Şehir içi ve dışı için mükemmel kompakt SUV.",
			en: "The perfect compact SUV for city and beyond.",
			ar: "سيارة دفع رباعي مدمجة مثالية للمدينة وخارجها.",
			de: "Der perfekte Kompakt-SUV für Stadt und mehr."
		},
		specs: {
			engine: "petrol",
			power: "150 HP",
			acceleration: "9.2s",
			seats: 5,
			transmission: "automatic",
			drive: "FWD"
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/audi-q3-black.jpeg" },
			{ name: "Kırmızı", nameKey: "red", hex: "#FF0000", image: "/audi-q3-red.jpeg" }
		],
		featured: true
	},
	{
		id: "bmw-3-serisi",
		slug: "bmw-3-serisi",
		brand: "BMW",
		model: "3 Serisi",
		
		category: "Sedan",
		description: {
			tr: "Yüksek performans ve konforun buluştuğu nokta.",
			en: "Where high performance meets comfort.",
			ar: "حيث يلتقي الأداء العالي مع الراحة.",
			de: "Wo hohe Leistung auf Komfort trifft."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Lacivert", nameKey: "navy", hex: "#1a237e", image: "/bmw-3-series-sedan.jpeg" },
			{ name: "Açık Mavi", nameKey: "light-blue", hex: "#4fc3f7", image: "/bmw-3-series-light-blue.jpeg" },
			{ name: "Beyaz", nameKey: "white", hex: "#FFFFFF", image: "/bmw-3-series-white.jpeg" },
			{ name: "Nardo Gri", nameKey: "nardo-grey", hex: "#8A8A8C", image: "/bmw-3-series-nardo-grey.jpeg" },
			{ name: "Gümüş Gri", nameKey: "silver-grey", hex: "#C0C0C0", image: "/bmw-3-series-silver-grey.jpeg" },
			{ name: "Mavi", nameKey: "blue", hex: "#0000FF", image: "/bmw-3-series-blue-another.jpeg" },
			{ name: "Mat Siyah", nameKey: "matte-black", hex: "#1A1A1A", image: "/bmw-3-series-matte-black.jpeg" },
			{ name: "Yeşil", nameKey: "green", hex: "#008000", image: "/bmw-3-series-green.jpeg" }
		],
		featured: true
	},
	{
		id: "audi-a4",
		slug: "audi-a4",
		brand: "Audi",
		model: "A4",
		
		category: "Sedan",
		description: {
			tr: "Konfor ve prestijin simgesi.",
			en: "A symbol of comfort and prestige.",
			ar: "رمز للراحة والهيبة.",
			de: "Ein Symbol für Komfort und Prestige."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/audi-a4-black.jpeg" },
			{ name: "Lacivert", nameKey: "navy", hex: "#000080", image: "/audi-a4-navy.jpeg" },
			{ name: "Gri", nameKey: "grey", hex: "#808080", image: "/audi-a4-grey.jpeg" }
		],
		featured: true
	},
	{
		id: "mercedes-cla",
		slug: "mercedes-cla",
		brand: "Mercedes-Benz",
		model: "CLA",
		
		category: "Sedan",
		description: {
			tr: "Sportif dizayn ve modern teknoloji.",
			en: "Sporty design and modern technology.",
			ar: "تصميم رياضي وتكنولوجيا حديثة.",
			de: "Sportliches Design und moderne Technologie."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/mercedes-cla.jpeg" }
		],
		featured: true
	},
	{
		id: "bmw-x1",
		slug: "bmw-x1",
		brand: "BMW",
		model: "X1",
		
		category: "SUV",
		description: {
			tr: "Şehir içi maceraları için mükemmel bir SUV.",
			en: "A perfect SUV for urban adventures.",
			ar: "سيارة دفع رباعي مثالية للمغامرات الحضرية.",
			de: "Ein perfekter SUV für urbane Abenteuer."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/bmw-x1.jpeg" }
		],
		featured: true
	},
	{
		id: "mercedes-a-serisi-sedan",
		slug: "mercedes-a-serisi-sedan",
		brand: "Mercedes-Benz",
		model: "A Serisi Sedan",
		
		category: "Sedan",
		description: {
			tr: "Modern lüksün kompakt hali.",
			en: "The compact form of modern luxury.",
			ar: "الشكل المدمج للفخامة الحديثة.",
			de: "Die kompakte Form des modernen Luxus."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Kırmızı", nameKey: "red", hex: "#FF0000", image: "/mercedes-a-class-sedan.jpeg" },
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/mercedes-a-class-sedan-black.jpeg" }
		],
		featured: true
	},
	{
		id: "audi-a3-sedan",
		slug: "audi-a3-sedan",
		brand: "Audi",
		model: "A3 Sedan",
		
		category: "Sedan",
		description: {
			tr: "Kompakt lüks ve verimlilik.",
			en: "Compact luxury and efficiency.",
			ar: "الفخامة والفعالية المدمجة.",
			de: "Kompakter Luxus und Effizienz."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Gri", nameKey: "grey", hex: "#808080", image: "/audi-a3-sedan.jpeg" },
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/audi-a3-sedan-black.jpeg" },
			{ name: "Koyu Yeşil", nameKey: "dark-green", hex: "#006400", image: "/audi-a3-sedan-yesil.jpeg" },
			{ name: "Açık Mavi", nameKey: "light-blue", hex: "#ADD8E6", image: "/audi-a3-sedan-light-blue.jpeg" }
		],
		featured: true
	},
	{
		id: "bmw-ix1",
		slug: "bmw-ix1",
		brand: "BMW",
		model: "iX1",
		
		category: "SUV",
		description: {
			tr: "Tamamen elektrikli sürüş keyfi ve SUV konforu.",
			en: "All-electric driving pleasure and SUV comfort.",
			ar: "متعة القيادة الكهربائية بالكامل وراحة الدفع الرباعي.",
			de: "Vollelektrischer Fahrspaß und SUV-Komfort."
		},
		specs: {
			engine: "electric",
			power: "313 HP",
			acceleration: "5.6s",
			seats: 5,
			transmission: "automatic",
			drive: "AWD"
		},
		dailyPrice: 0,
		colors: [
			{ name: "Beyaz", nameKey: "white", hex: "#FFFFFF", image: "/bmw-ix1-white.jpeg" }
		],
		featured: true
	},
	{
		id: "alfa-romeo-tonale",
		slug: "alfa-romeo-tonale",
		brand: "Alfa Romeo",
		model: "Tonale",
		
		category: "SUV",
		description: {
			tr: "İtalyan asaleti ve sportif ruh.",
			en: "Italian nobility and sporty spirit.",
			ar: "النبل الإيطالي والروح الرياضية.",
			de: "Italienischer Adel und sportlicher Geist."
		},
		specs: {
			engine: "petrol_diesel",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/alfa-romeo-tonale.jpeg" },
			{ name: "Gri", nameKey: "grey", hex: "#808080", image: "/alfa-romeo-tonale-grey.jpeg" }
		],
		featured: true
	},
	{
		id: "audi-a3-cabrio",
		slug: "audi-a3-cabrio",
		brand: "Audi",
		model: "A3 Cabrio",
		
		category: "Cabrio",
		description: {
			tr: "Şık tasarım ve üstü açık özgürlük.",
			en: "Stylish design and open-top freedom.",
			ar: "تصميم أنيق وحرية السقف المفتوح.",
			de: "Stilvolles Design und Open-Top-Freiheit."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 4,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/audi-a3-cabrio.jpeg" }
		],
		featured: true
	},
	{
		id: "bmw-2-serisi-grand-coupe",
		slug: "bmw-2-serisi-grand-coupe",
		brand: "BMW",
		model: "2 Serisi Grand Coupe",
		
		category: "Sedan",
		description: {
			tr: "Şık ve dinamik tasarım.",
			en: "Sleek and dynamic design.",
			ar: "تصميم أنيق وديناميكي.",
			de: "Elegantes und dynamisches Design."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Kırmızı", nameKey: "red", hex: "#FF0000", image: "/bmw-2-series.jpeg" },
			{ name: "Beyaz", nameKey: "white", hex: "#FFFFFF", image: "/bmw-2-series-white.jpeg" }
		],
		featured: true
	},
	{
		id: "mercedes-a-serisi",
		slug: "mercedes-a-serisi",
		brand: "Mercedes",
		model: "A Serisi",
		
		category: "Hatchback",
		description: {
			tr: "Kompakt ve sportif.",
			en: "Compact and sporty.",
			ar: "مدمجة ورياضية.",
			de: "Kompakt und sportlich."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Kırmızı", nameKey: "red", hex: "#FF0000", image: "/mercedes-a-serisi.jpeg" }
		],
		featured: true
	},
	{
		id: "mini-cooper",
		slug: "mini-cooper",
		brand: "Mini",
		model: "Cooper",
		
		category: "Hatchback",
		description: {
			tr: "İkonik tasarım ve eğlenceli sürüş.",
			en: "Iconic design and fun driving.",
			ar: "تصميم أيقوني وقيادة ممتعة.",
			de: "Ikonisches Design und Fahrspaß."
		},
		specs: {
			engine: "petrol",
			power: "",
			acceleration: "",
			seats: 5,
			transmission: "automatic",
			drive: ""
		},
		dailyPrice: 0,
		colors: [
			{ name: "Gri", nameKey: "grey", hex: "#808080", image: "/mini-cooper-grey.jpeg" },
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/mini-cooper.jpeg" },
			{ name: "Yeşil", nameKey: "green", hex: "#008000", image: "/mini-cooper-yesil.jpeg" },
			{ name: "Kırmızı", nameKey: "red", hex: "#FF0000", image: "/mini-cooper-red.jpeg" }
		],
		featured: true
	},
	{
		id: "mercedes-c-serisi",
		slug: "mercedes-c-serisi",
		brand: "Mercedes-Benz",
		model: "C Serisi",
		
		category: "Sedan",
		description: {
			tr: "Modern lüks ve dinamizmin mükemmel dengesi.",
			en: "The perfect balance of modern luxury and dynamism.",
			ar: "التوازن المثالي بين الفخامة الحديثة والديناميكية.",
			de: "Die perfekte Balance aus modernem Luxus und Dynamik."
		},
		specs: {
			engine: "petrol",
			power: "204 HP",
			acceleration: "7.3s",
			seats: 5,
			transmission: "automatic",
			drive: "RWD"
		},
		dailyPrice: 0,
		colors: [
			{ name: "Lacivert", nameKey: "navy", hex: "#000080", image: "/mercedes-c-class-navy.jpeg" },
			{ name: "Siyah", nameKey: "black", hex: "#000000", image: "/mercedes-c-class-black.jpeg" }
		],
		featured: true
	},
	{
		id: "amiral-luxury-yacht",
		slug: "amiral-luxury-yacht",
		brand: "Amiral",
		model: "Luxury Yacht",
		
		category: "Yacht",
		description: {
			tr: "Denizde lüks ve konforun buluştuğu nokta.",
			en: "Where luxury and comfort meet on the sea.",
			ar: "حيث تلتقي الفخامة والراحة في البحر.",
			de: "Wo Luxus und Komfort auf dem Meer aufeinandertreffen."
		},
		specs: {
			engine: "Twin Diesel",
			power: "2000 HP",
			acceleration: "25 knots",
			seats: 12,
			transmission: "Marine",
			drive: "Propeller"
		},
		dailyPrice: 0,
		colors: [
			{ name: "Standart", nameKey: "standard", hex: "#FFFFFF", image: "/yacht-main.jpeg" }
		],
		featured: true
	},
	{
		id: "amiral-private-helicopter",
		slug: "amiral-private-helicopter",
		brand: "Amiral",
		model: "Private Helicopter",
		
		category: "Helicopter",
		description: {
			tr: "Hızlı, güvenli ve özel hava ulaşımı.",
			en: "Fast, safe, and exclusive air travel.",
			ar: "سفر جوي سريع وآمن وحصري.",
			de: "Schnelle, sichere und exklusive Flugreisen."
		},
		specs: {
			engine: "Turboshaft",
			power: "Single/Twin",
			acceleration: "150 knots",
			seats: 6,
			transmission: "Rotor",
			drive: "Helipad"
		},
		dailyPrice: 0,
		colors: [
			{ name: "Standart", nameKey: "standard", hex: "#FFFFFF", image: "/helicopter-main.jpeg" }
		],
		featured: true
	}
];
