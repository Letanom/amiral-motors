"use client";
import Image from "next/image";
import Link from "next/link";

export default function FloatingSahibinden() {
	return (
		<div className="fixed bottom-5 left-5 z-50">
			<Link
				href="https://amiralmotors.sahibinden.com/"
				target="_blank"
				rel="noopener noreferrer"
				className="block hover:opacity-80 transition"
			>
				<Image
					src="/Bant_Logo_Sahibinden.png"
					alt="Sahibinden.com"
					width={150}
					height={42}
					className="object-contain"
				/>
			</Link>
		</div>
	);
}
