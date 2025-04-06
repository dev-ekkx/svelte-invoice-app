import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generateInvoiceNumber = () => {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const prefix = Array.from(
		{ length: 4 },
		() => letters[Math.floor(Math.random() * letters.length)]
	).join("");
	const randomDigits = Math.floor(Math.random() * 10000)
		.toString()
		.padStart(6, "0");
	return `${prefix}${randomDigits}`;
};
