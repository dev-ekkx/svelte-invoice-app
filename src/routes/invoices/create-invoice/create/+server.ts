import type { RequestHandler } from "@sveltejs/kit";
import type { InvoiceForm } from "$lib/interfaces";
import { generateInvoiceNumber } from "$lib/utils/utils";
import { invoiceTable, itemsTable } from "$lib/server/db/schema";
import { db } from "$lib/server/db";

export const POST: RequestHandler = async ({ request }) => {
	try {
		const { items, billTo, billFrom, ...rest }: InvoiceForm = await request.json();
		const invoice = {
			invoiceNumber: generateInvoiceNumber(),
			status: "pending",
			...rest,
			invoiceDate: new Date().toISOString(),
			invoiceDueDate: new Date(rest.invoiceDueDate).toISOString(),
			amount: items.reduce((acc, item) => acc + item.quantity * item.price, 0),
			...billFrom,
			...billTo
		};

		const insertedInvoice = await db
			.insert(invoiceTable)
			.values(invoice)
			.returning({ id: invoiceTable.id });

		const invoiceId = insertedInvoice[0].id;
		const invoiceItems = items.map((item) => ({
			invoiceId,
			itemName: item.itemName,
			quantity: item.quantity,
			price: item.price
		}));

		await db.insert(itemsTable).values(invoiceItems);

		return new Response(JSON.stringify({ message: "Invoice created successfully" }), {
			status: 201
		}); // return new Response(JSON.stringify({ message: "Invoice created successfully" }));
	} catch (e) {
		const error = e instanceof Error ? e.message : "An unknown error occurred";
		return new Response(JSON.stringify({ error }), { status: 500 });
	}
};
