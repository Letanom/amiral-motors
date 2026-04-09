"use client";
import Image from "next/image";
import Link from "next/link";

export default function FloatingSahibinden() {
	return (
		<div className="fixed bottom-6 left-6 z-50 md:bottom-8 md:right-8">
			<Link
				href="https://amiralmotors.sahibinden.com/"
				target="_blank"
				rel="noopener noreferrer"
				className="block hover:opacity-80 transition transform active:scale-95 shadow-xl rounded-lg overflow-hidden"
			>
				<Image
					src="/Bant_Logo_Sahibinden.png"
					alt="Sahibinden.com"
					width={120}
					height={34}
					className="object-contain w-[100px] md:w-[140px]"
				/>
			</Link>
		</div>
	);
}
