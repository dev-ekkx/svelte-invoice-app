import type { InvoiceDetails } from "$lib/interfaces";
import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ params, fetch }) => {
	const invoiceNumber = params.id;
	const res = await fetch(`/invoices/${invoiceNumber}`);
	if (!res.ok) {
		throw new Error(`Invoice #${invoiceNumber} not found`);
	}

	const data = await res.json();
	const invoice = data.invoice as InvoiceDetails;
	return { invoice };
};
