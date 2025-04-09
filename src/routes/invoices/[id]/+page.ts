import type { PageLoad } from "./$types";

export const load: PageLoad = async ({ fetch, params }) => {
	console.log(params.id);
	const res = await fetch(`/invoices/${params.id}`);

	// const item = await res.json();
	//
	// return { item };
};
