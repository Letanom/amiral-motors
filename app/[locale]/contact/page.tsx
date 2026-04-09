import WhatsAppButton from "../../components/WhatsAppButton";
import { FaMapMarkerAlt, FaWhatsapp, FaBuilding } from "react-icons/fa";

export const metadata = {
	title: "İletişim | AMİRAL GROUP",
	description: "AMİRAL GROUP iletişim ve WhatsApp üzerinden hızlı ulaşım."
};

export default function ContactPage() {
	return (
		<div className="min-h-screen pt-24 pb-16 relative overflow-hidden">
			{/* Background Elements */}
			<div className="absolute top-0 right-0 w-1/3 h-1/3 bg-[#8c2016]/5 blur-[120px] rounded-full" />
			<div className="absolute bottom-0 left-0 w-1/3 h-1/3 bg-[#8c2016]/5 blur-[120px] rounded-full" />

			<div className="max-w-6xl mx-auto px-4 relative z-10">
				<h1 className="text-4xl md:text-5xl font-display font-semibold mb-12 text-white text-center">İletişim</h1>
				
				<div className="grid gap-12 lg:grid-cols-3">
					{/* Contacts Column */}
					<div className="space-y-6 lg:col-span-1">
						<h2 className="text-2xl font-display font-medium text-white/90 mb-6 flex items-center gap-3">
							<FaWhatsapp className="text-green-500" /> WhatsApp Hatlarımız
						</h2>
						
						<div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-[#8c2016]/50 transition duration-300">
							<h3 className="text-lg font-semibold text-white mb-1">WhatsApp Hattı 1</h3>
							<p className="text-white/50 text-xs mb-4 uppercase tracking-wider">Satış ve Kiralama Destek</p>
							<WhatsAppButton 
								phone="905316350034"
								displayPhone="+90 531 635 00 34"
								className="w-full justify-center py-3 text-base"
							/>
						</div>

						<div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-6 hover:border-[#8c2016]/50 transition duration-300">
							<h3 className="text-lg font-semibold text-white mb-1">WhatsApp Hattı 2</h3>
							<p className="text-white/50 text-xs mb-4 uppercase tracking-wider">VIP Transfer ve Rezervasyon</p>
							<WhatsAppButton 
								phone="905326599934"
								displayPhone="+90 532 659 99 34"
								className="w-full justify-center py-3 text-base"
							/>
						</div>
					</div>

					{/* Branches Column */}
					<div className="lg:col-span-2 space-y-8">
						<h2 className="text-2xl font-display font-medium text-white/90 mb-6 flex items-center gap-3">
							<FaBuilding className="text-[#8c2016]" /> Şubelerimiz
						</h2>
						
						{/* Interactive Map (Skyland Residence as default) */}
						<div className="rounded-3xl overflow-hidden border border-white/10 h-80 relative flex flex-col group shadow-2xl mb-8">
							<iframe
								src="https://maps.google.com/maps?q=Skyland+Residence+Istanbul&z=15&output=embed"
								width="100%"
								height="100%"
								style={{ border: 0 }}
								allowFullScreen={true}
								loading="lazy"
								referrerPolicy="no-referrer-when-downgrade"
								className="absolute inset-0 w-full h-full grayscale-[20%] contrast-[1.1] opacity-90 transition-opacity duration-300 group-hover:opacity-100"
							></iframe>
						</div>

						<div className="grid md:grid-cols-2 gap-6">
							{/* Istanbul Branch */}
							<div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-[#8c2016]/30 transition duration-300 group">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-full bg-[#8c2016]/10 flex items-center justify-center group-hover:bg-[#8c2016]/20 transition">
										<FaMapMarkerAlt className="text-[#8c2016]" />
									</div>
									<h3 className="text-xl font-semibold text-white">İstanbul Şubesi</h3>
								</div>
								<p className="text-white/70 leading-relaxed font-light mb-6 text-sm">
									Huzur Mahallesi Azerbaycan Caddesi No:4 <br />
									Skyland Residence B Blok Daire: 150 <br />
									Sarıyer / İstanbul
								</p>
								<a
									href="https://maps.google.com/?q=Skyland+Residence+Istanbul"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm font-medium text-[#8c2016] hover:underline"
								>
									Haritada Görüntüle →
								</a>
							</div>

							{/* Bodrum Branch */}
							<div className="rounded-2xl border border-white/10 bg-white/5 backdrop-blur-sm p-8 hover:border-[#8c2016]/30 transition duration-300 group">
								<div className="flex items-center gap-3 mb-4">
									<div className="w-10 h-10 rounded-full bg-[#8c2016]/10 flex items-center justify-center group-hover:bg-[#8c2016]/20 transition">
										<FaMapMarkerAlt className="text-[#8c2016]" />
									</div>
									<h3 className="text-xl font-semibold text-white">Bodrum Şubesi</h3>
								</div>
								<p className="text-white/70 leading-relaxed font-light mb-6 text-sm">
									Küçükbük Mahallesi 42. Sokak <br />
									Kanyon Sitesi No:27 <br />
									Türkbükü Bodrum / Muğla
								</p>
								<a
									href="https://maps.google.com/?q=Türkbükü+Bodrum+Küçükbük+Mahallesi+42.+Sokak+Kanyon+Sitesi+No:27"
									target="_blank"
									rel="noopener noreferrer"
									className="text-sm font-medium text-[#8c2016] hover:underline"
								>
									Haritada Görüntüle →
								</a>
							</div>
						</div>
					</div>
				</div>
			</div>
		</div>
	);
}

