import type { HTMLButtonAttributes } from 'svelte/elements';
import type { Snippet } from 'svelte';

export interface ButtonInterface extends HTMLButtonAttributes {
	children?: Snippet;
	size?: 'sm' | 'md' | 'lg' | null;
	color?: 'primary' | 'secondary' | 'tertiary' | 'danger' | null;
	isIcon?: boolean;
}
