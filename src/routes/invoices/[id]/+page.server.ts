import type { PageServerLoad } from "../../../../.svelte-kit/types/src/routes/invoices/[id]/$types";
import { db } from "$lib/server/db";
import { invoiceTable as invoices, itemsTable as items } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const load: PageServerLoad = async ({ params }) => {
	try {
		const invoiceNumber = params.id;
		const result = await db
			.select()
			.from(invoices)
			.leftJoin(items, eq(invoices.id, items.invoiceId))
			.where(eq(invoices.invoiceNumber, invoiceNumber));

		const { invoices: invoiceData } = result[0];
		const allItems = result.filter((row) => row.items != null).map((row) => row.items);

		const invoice = {
			...invoiceData,
			items: allItems
		};

		return { invoice };
	} catch {
		return { error: "Invoice not found" };
	}
};
