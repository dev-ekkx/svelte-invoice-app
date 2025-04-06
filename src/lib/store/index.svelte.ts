let invoiceValue = $state(false);

export const showInvoiceMutation = () => invoiceValue;

export const updateInvoiceMutation = (value: boolean) => {
	invoiceValue = value;
};
