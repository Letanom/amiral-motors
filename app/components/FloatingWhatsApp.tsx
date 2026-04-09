"use client";
import WhatsAppButton from "./WhatsAppButton";

export default function FloatingWhatsApp() {
	return (
		<div className="fixed bottom-6 right-6 z-50 md:bottom-10 md:right-10">
			<div className="relative group">
				<div className="absolute inset-2 rounded-full bg-green-500/10 blur-xl group-hover:bg-green-500/30 transition-colors" />
				<WhatsAppButton 
					phone="905316350034"
					displayPhone="WhatsApp"
					className="shadow-2xl !p-2.5 sm:!px-4 sm:!py-2 !gap-0 sm:!gap-2 rounded-full flex items-center justify-center min-w-[42px] h-[42px] sm:w-auto sm:h-auto"
					labelClassName="hidden sm:inline text-sm whitespace-nowrap"
				/>
			</div>
		</div>
	);
}

