import type { PageLoad } from "../../../.svelte-kit/types/src/routes/invoices/$types";
import type { Invoice } from "$lib/interfaces";

export const load: PageLoad = async ({ data }) => {
	return { invoices: data.invoices as Invoice[] };
};
