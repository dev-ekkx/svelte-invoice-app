import { doublePrecision, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const invoiceTable = pgTable("invoices", {
	id: serial("id").primaryKey(),
	status: text("status"),
	invoiceNumber: text("invoiceNumber"),
	fromStreetAddress: text("fromStreetAddress"),
	fromCity: text("fromCity"),
	fromPostCode: text("fromPostCode"),
	fromCountry: text("fromCountry"),
	toClientName: text("toClientName"),
	toClientEmail: text("toClientEmail"),
	toStreet: text("toStreet"),
	toCity: text("toCity"),
	toPostCode: text("toPostCode"),
	toCountry: text("toCountry"),
	projectDescription: text("projectDescription"),
	invoiceDate: text("invoiceDate"),
	paymentTerms: text("paymentTerms"),
	amount: doublePrecision()
});

export const itemsTable = pgTable("items", {
	id: serial("id").primaryKey(),
	invoiceId: serial("invoiceId").references(() => invoiceTable.id, {
		onDelete: "cascade",
		onUpdate: "cascade"
	}),
	itemName: text("itemName"),
	quantity: integer("quantity"),
	price: doublePrecision()
});
