import { db } from "$lib/server/db";
import { invoiceTable } from "$lib/server/db/schema";
import type { RequestHandler } from "@sveltejs/kit";

export const GET: RequestHandler = async () => {
	try {
		const invoices = await db.select().from(invoiceTable);

		return new Response(JSON.stringify({ invoices }), {
			status: 200,
			headers: { "Content-Type": "application/json" }
		});
	} catch {
		return new Response(JSON.stringify({ error: "An error occurred while fetching invoices" }), {
			status: 500,
			headers: { "Content-Type": "application/json" }
		});
	}
};
