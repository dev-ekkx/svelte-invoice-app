import { db } from "$lib/server/db";
import { invoiceTable, itemsTable } from "$lib/server/db/schema";
import { error, json, type RequestHandler } from "@sveltejs/kit";
import { eq } from "drizzle-orm";

export const GET: RequestHandler = async ({ params }) => {
	try {
		const invoiceNumber = params.id ?? "";
		const result = await db
			.select()
			.from(invoiceTable)
			.leftJoin(itemsTable, eq(invoiceTable.id, itemsTable.invoiceId))
			.where(eq(invoiceTable.invoiceNumber, invoiceNumber));

		if (!result.length) {
			return new Response(JSON.stringify({ error: "Invoice not found" }), { status: 404 });
		}

		const { invoices: invoiceData } = result[0];
		const allItems = result.filter((row) => row.items != null).map((row) => row.items);

		const invoice = {
			...invoiceData,
			items: allItems
		};

		return new Response(JSON.stringify({ invoice }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch {
		return new Response(JSON.stringify({ error: "Internal server error" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};

export const PATCH: RequestHandler = async ({ params }) => {
	try {
		const invoiceNumber = params.id ?? "";

		const invoice = await db
			.select()
			.from(invoiceTable)
			.where(eq(invoiceTable.invoiceNumber, invoiceNumber))
			.then((res) => res[0]);

		if (!invoice) {
			throw error(404, `Invoice #${invoiceNumber} not found`);
		}

		await db
			.update(invoiceTable)
			.set({
				status: "paid"
			})
			.where(eq(invoiceTable.invoiceNumber, invoiceNumber));

		return json(
			{ message: `Invoice #${invoiceNumber} marked as paid`, success: true },
			{ status: 200 }
		);
	} catch (err) {
		console.log(err);

		return new Response(JSON.stringify({ message: params, success: false }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	}
};

export const DELETE: RequestHandler = async ({ params }) => {
	try {
		const invoiceNumber = params.id ?? "";
		const invoice = await db
			.select()
			.from(invoiceTable)
			.where(eq(invoiceTable.invoiceNumber, invoiceNumber))
			.then((res) => res[0]);

		if (!invoice) {
			throw error(404, `Invoice #${invoiceNumber} not found`);
		}

		await db.delete(invoiceTable).where(eq(invoiceTable.invoiceNumber, invoiceNumber));

		return json({ message: `Invoice #${invoiceNumber} deleted`, success: true }, { status: 200 });
	} catch (err) {
		console.log(err);

		return new Response(JSON.stringify({ message: params, success: false }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	}
};
