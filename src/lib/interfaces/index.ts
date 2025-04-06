import type { HTMLButtonAttributes, HTMLInputAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface ButtonInterface extends HTMLButtonAttributes {
	children?: Snippet;
	size?: "sm" | "md" | "lg" | null;
	color?: "primary" | "secondary" | "tertiary" | "danger" | null;
	isIcon?: boolean;
}

export interface InputInterface extends HTMLInputAttributes {
	type: "text" | "email" | "password" | "number" | "tel" | "date" | "select";
	label?: string;
	errorMessage?: string;
	inputClass?: string;
	items?: Array<{ value: string; label: string; selected?: boolean }>;
}

export interface StatusChipInterface {
	status: "paid" | "pending" | "draft";
}

export interface ListItemInterface {
	id: string;
	itemName: string;
	quantity: number;
	price: number;
}

export interface BillFromField {
	streetAddress: string;
	city: string;
	postCode: string;
	country: string;
}

export interface BillToField {
	clientName: string;
	clientEmail: string;
	street: string;
	city: string;
	postCode: string;
	country: string;
}

export interface InvoiceFromField extends InputInterface {
	id: keyof BillFromField;
}

export interface InvoiceToField extends InputInterface {
	id: keyof BillToField;
}
