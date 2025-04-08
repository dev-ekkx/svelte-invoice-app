import clsx, { type ClassValue } from "clsx";
import { twMerge } from "tailwind-merge";

export function cn(...inputs: ClassValue[]) {
	return twMerge(clsx(inputs));
}

export const generateInvoiceNumber = () => {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const prefix = Array.from(
		{ length: 2 },
		() => letters[Math.floor(Math.random() * letters.length)]
	).join("");
	const randomDigits = Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, "0");
	return `${prefix}${randomDigits}`;
};

export const formatDueDate = (dateString: string): string => {
	const date = new Date(dateString);

	// Define formatting options
	const options: Intl.DateTimeFormatOptions = {
		day: "2-digit",
		month: "short",
		year: "numeric"
	};

	return new Intl.DateTimeFormat("en-GB", options).format(date);
};

export const formatAmount = (amount: number): string => {
	return new Intl.NumberFormat("en-GB", {
		style: "currency",
		currency: "GHS"
	}).format(amount);
};
