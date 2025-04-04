import type { HTMLButtonAttributes, HTMLInputAttributes } from "svelte/elements";
import type { Snippet } from "svelte";

export interface ButtonInterface extends HTMLButtonAttributes {
	children?: Snippet;
	size?: "sm" | "md" | "lg" | null;
	color?: "primary" | "secondary" | "tertiary" | "danger" | null;
	isIcon?: boolean;
}

export interface InputInterface extends HTMLInputAttributes {
	type: "text" | "email" | "password" | "number" | "tel";
	label?: string;
	errorMessage?: string;
}

export interface StatusChipInterface {
	status: "paid" | "pending" | "draft";
}
