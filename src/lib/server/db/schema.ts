import { doublePrecision, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const invoiceTable = pgTable("invoices", {
	id: serial("id").primaryKey(),
	invoiceNumber: text("invoiceNumber").notNull(),
	fromStreetAddress: text("fromStreetAddress").notNull(),
	fromCity: text("fromCity").notNull(),
	fromPostCode: text("fromPostCode").notNull(),
	fromCountry: text("fromCountry").notNull(),
	toClientName: text("toClientName").notNull(),
	toClientEmail: text("toClientEmail").notNull(),
	toStreet: text("toStreet").notNull(),
	toCity: text("toCity").notNull(),
	toPostCode: text("toPostCode").notNull(),
	toCountry: text("toCountry").notNull(),
	projectDescription: text("projectDescription").notNull(),
	invoiceDate: text("invoiceDate").notNull(),
	paymentTerms: text("paymentTerms").notNull()
});

export const itemsTable = pgTable("items", {
	id: serial("id").primaryKey(),
	invoiceId: serial("invoiceId").references(() => invoiceTable.id, {
		onDelete: "cascade"
	}),
	itemName: text("itemName").notNull(),
	quantity: integer("quantity").notNull(),
	price: doublePrecision().notNull()
});
