import { relations } from "drizzle-orm";
import { invoiceTable, itemsTable } from "$lib/server/db/schema";

export const invoiceTableRelations = relations(invoiceTable, ({ many }) => ({
	itemsTable: many(itemsTable)
}));

export const itemRelations = relations(itemsTable, ({ one }) => ({
	invoiceTable: one(invoiceTable, {
		fields: [itemsTable.invoiceId],
		references: [invoiceTable.id]
	})
}));
