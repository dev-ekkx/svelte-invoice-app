import type { RequestHandler } from "@sveltejs/kit";
import { invoiceTable } from "$lib/server/db/schema";
import { db } from "$lib/server/db";

export const POST: RequestHandler = async ({ request }) => {
	try {
		const formData = await request.json();
		const invoice: typeof invoiceTable.$inferInsert = {
			invoiceNumber: generateInvoiceNumber(),
			...formData
		};

		await db.insert(invoiceTable).values(invoice);

		return new Response(JSON.stringify({ message: "Invoice created successfully" }), {
			status: 201
		}); // return new Response(JSON.stringify({ message: "Invoice created successfully" }));
	} catch (e) {
		const error = e instanceof Error ? e.message : "An unknown error occurred";
		return new Response(JSON.stringify({ error }), { status: 500 });
	}
};

const generateInvoiceNumber = () => {
	const letters = "ABCDEFGHIJKLMNOPQRSTUVWXYZ";
	const prefix = Array.from(
		{ length: 2 },
		() => letters[Math.floor(Math.random() * letters.length)]
	).join("");
	const randomDigits = Math.floor(Math.random() * 10000)
		.toString()
		.padStart(4, "0");
	return `${prefix}${randomDigits}`;
};
