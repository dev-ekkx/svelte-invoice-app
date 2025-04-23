import { error, json, type RequestHandler } from "@sveltejs/kit";
import { db } from "$lib/server/db";
import { invoiceTable } from "$lib/server/db/schema";
import { eq } from "drizzle-orm";

export const PATCH: RequestHandler = async ({ params }) => {
	try {
		const invoiceNumber = params.id ?? "";
		console.log(invoiceNumber);

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
