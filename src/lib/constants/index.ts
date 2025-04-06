import type { InvoiceFromField, InvoiceToField } from "$lib/interfaces";

export const createInvoiceForm = {
	billFrom: [
		{
			class: "col-span-3",
			id: "streetAddress",
			label: "street address",
			placeholder: "1234 Main St",
			type: "text"
		},
		{
			id: "city",
			label: "city",
			placeholder: "Accra",
			type: "text"
		},
		{
			id: "postCode",
			label: "post code",
			placeholder: "E13 9PG",
			type: "text"
		},
		{
			id: "country",
			label: "country",
			placeholder: "Ghana",
			type: "text"
		}
	] as InvoiceFromField[],
	billTo: [
		{
			class: "col-span-3",
			id: "clientName",
			label: "client's name",
			placeholder: "John Doe",
			type: "text"
		},
		{
			class: "col-span-3",
			id: "clientEmail",
			label: "client's email",
			placeholder: "john.doe@gmail.com",
			type: "email"
		},
		{
			class: "col-span-3",
			id: "street",
			label: "street address",
			placeholder: "56 Wayward St",
			type: "text"
		},
		{
			id: "city",
			label: "City",
			placeholder: "Accra",
			type: "text"
		},
		{
			id: "postCode",
			label: "Post Code",
			placeholder: "4DF4 4G",
			type: "text"
		},
		{
			id: "country",
			label: "country",
			placeholder: "Ghana",
			type: "text"
		}
	] as InvoiceToField[]
};
