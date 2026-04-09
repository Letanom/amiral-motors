"use client";
import WhatsAppButton from "./WhatsAppButton";

export default function FloatingWhatsApp() {
	return (
		<div className="fixed bottom-6 right-6 z-50">
			<div className="relative group">
				<div className="absolute inset-0 rounded-full bg-green-500/30 blur-2xl group-hover:bg-green-500/50 transition-colors" />
				<WhatsAppButton 
					phone="905316350034"
					displayPhone="WhatsApp'tan Ulaşın"
					className="shadow-2xl !px-6 !py-3 text-lg"
				/>
			</div>
		</div>
	);
}

