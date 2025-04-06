import type { Actions } from "@sveltejs/kit";

export const actions = {
	create: async (event) => {
		console.log(event);
	}
} satisfies Actions;
