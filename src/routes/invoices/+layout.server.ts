import { db } from "$lib/server/db";
import { invoiceTable } from "$lib/server/db/schema";
import type { PageServerLoad } from "../../../.svelte-kit/types/src/routes/invoices/[id]/$types";

export const load: PageServerLoad = async () => {
	try {
		const invoices = await db.select().from(invoiceTable);

		if (invoices.length < 1) {
			return { invoices: [], message: "No invoices found" };
		}

		return { invoices };
	} catch {
		return {
			invoices: [],
			error: "An error occurred while fetching invoices"
		};
	}
};
