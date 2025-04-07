let invoiceValue = $state(false);

export const showInvoiceMutation = () => invoiceValue;

export const updateInvoiceMutation = (value: boolean) => {
	invoiceValue = value;
};

let invoiceTotal = $state(0);

export const totalInvoices = () => invoiceTotal;
export const setInvoiceTotal = (value: number) => {
	invoiceTotal = value;
};
