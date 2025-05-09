import type { InvoiceForm } from "$lib/interfaces/index";
import { db } from "$lib/server/db";
import { invoiceTable, itemsTable } from "$lib/server/db/schema";
import { generateInvoiceNumber } from "$lib/utils/utils";
import type { RequestHandler } from "@sveltejs/kit";

export const POST: RequestHandler = async ({ request }) => {
	try {
		const {
			invoiceForm,
			status
		}: {
			invoiceForm: InvoiceForm;
			status: "pending" | "draft";
		} = await request.json();
		const { items, billTo, billFrom, ...rest } = invoiceForm;
		const currentDate = new Date(rest.invoiceDate);
		const paymentDueDate = rest.paymentTerms.split("-")[1].trim();
		currentDate.setDate(currentDate.getDate() + +paymentDueDate);

		const invoice = {
			invoiceNumber: generateInvoiceNumber(),
			status: status,
			...rest,
			invoiceDate: new Date(rest.invoiceDate).toISOString(),
			invoiceDueDate: new Date(currentDate).toISOString(),
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
		});
	} catch (e) {
		const error = e instanceof Error ? e.message : "An unknown error occurred";
		return new Response(JSON.stringify({ error }), { status: 500 });
	}
};
