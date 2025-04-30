import type { InvoiceInterface } from "$lib/interfaces";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch }) => {
	const res = await fetch("/invoices");

	console.log(res);

	if (!res.ok) {
		throw new Error("Failed to fetch invoices");
	}

	const data = await res.json();
	const invoices = data.invoices as InvoiceInterface[];

	return { invoices };
};
