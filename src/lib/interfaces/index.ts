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

export interface ItemInterface {
	id: string;
	itemName: string;
	quantity: number;
	price: number;
}

export interface BillFromField {
	fromStreetAddress: string;
	fromCity: string;
	fromPostCode: string;
	fromCountry: string;
}

export interface BillToField {
	toClientName: string;
	toClientEmail: string;
	toStreet: string;
	toCity: string;
	toPostCode: string;
	toCountry: string;
}

export interface InvoiceFromField extends InputInterface {
	id: keyof BillFromField;
}

export interface InvoiceToField extends InputInterface {
	id: keyof BillToField;
}

export interface InvoiceForm {
	billFrom: BillFromField;
	billTo: BillToField;
	items: ItemInterface[];
	projectDescription: string;
	paymentTerms: string;
	invoiceDate: string;
}

export interface InvoiceInterface {
	id: number;
	status: "pending" | "draft" | "paid";
	invoiceNumber: string;
	fromStreetAddress: string;
	fromCity: string;
	fromPostCode: string;
	fromCountry: string;
	toClientName: string;
	toClientEmail: string;
	toStreet: string;
	toCity: string;
	toPostCode: string;
	toCountry: string;
	projectDescription: string;
	invoiceDate: string;
	paymentTerms: string;
	amount: number;
}

export interface InvoiceDetails extends InvoiceInterface {
	items: ItemInterface[];
}
