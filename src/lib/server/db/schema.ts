import { doublePrecision, integer, pgTable, serial, text } from "drizzle-orm/pg-core";

export const invoiceTable = pgTable("invoices", {
	id: serial("id").primaryKey(),
	invoiceNumber: text("invoiceNumber").notNull(),
	billFrom_streetAddress: text("streetAddress").notNull(),
	billFrom_city: text("city").notNull(),
	billFrom_postCode: text("postCode").notNull(),
	billFrom_country: text("country").notNull(),
	billTo_clientName: text("clientName").notNull(),
	billTo_clientEmail: text("clientEmail").notNull(),
	billTo_street: text("street").notNull(),
	billTo_city: text("city").notNull(),
	billTo_postCode: text("postCode").notNull(),
	billTo_country: text("country").notNull(),
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
