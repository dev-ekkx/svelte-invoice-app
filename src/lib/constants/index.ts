import type { InvoiceFromField, InvoiceToField } from "$lib/interfaces";

export const createInvoiceForm = {
	billFrom: [
		{
			class: "col-span-3",
			id: "fromStreetAddress",
			label: "street address",
			placeholder: "1234 Main St",
			type: "text"
		},
		{
			id: "fromCity",
			label: "city",
			placeholder: "Accra",
			type: "text"
		},
		{
			id: "fromPostCode",
			label: "post code",
			placeholder: "E13 9PG",
			type: "text"
		},
		{
			id: "fromCountry",
			label: "country",
			placeholder: "Ghana",
			type: "text"
		}
	] as InvoiceFromField[],
	billTo: [
		{
			class: "col-span-3",
			id: "toClientName",
			label: "client's name",
			placeholder: "John Doe",
			type: "text"
		},
		{
			class: "col-span-3",
			id: "toClientEmail",
			label: "client's email",
			placeholder: "john.doe@gmail.com",
			type: "email"
		},
		{
			class: "col-span-3",
			id: "toStreet",
			label: "street address",
			placeholder: "56 Wayward St",
			type: "text"
		},
		{
			id: "toCity",
			label: "City",
			placeholder: "Accra",
			type: "text"
		},
		{
			id: "toPostCode",
			label: "Post Code",
			placeholder: "4DF4 4G",
			type: "text"
		},
		{
			id: "toCountry",
			label: "country",
			placeholder: "Ghana",
			type: "text"
		}
	] as InvoiceToField[]
};

export enum ItemsHeaderEnum {
	NAME = "Item Name",
	QUANTITY = "QTY.",
	PRICE = "Price",
	TOTAL = "Total"
}

export const itemHeaders = ["Item Name", "QTY.", "Price", "Total"];
