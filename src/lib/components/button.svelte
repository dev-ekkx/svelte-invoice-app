<script lang="ts">
	import type { ButtonInterface } from "../interfaces";
	import { cva } from "class-variance-authority";
	import { twMerge } from "tailwind-merge";
	import { cn } from "$lib/utils/utils";
	import plusIcon from "$lib/assets/plus.svg";

	let { children, disabled, isIcon, size, color, ...otherProps }: ButtonInterface = $props();
	const classProp = otherProps.class;

	const button = cva(
		"h-[3rem] font-bold px-3 rounded-3xl cursor-pointer transition-all duration-200 ease-linear flex items-center",
		{
			variants: {
				color: {
					primary: "bg-purple-400 text-white hover:bg-purple-300",
					secondary: "bg-gray-500 text-black",
					tertiary: "text-purple-200 bg-purple-100 hover:bg-neutral-100",
					danger: "bg-error hover:bg-error-light"
				},
				size: {
					sm: "text-sm",
					md: "text-md",
					lg: "w-full justify-center"
				}
			},
			defaultVariants: {
				color: "primary",
				size: "md"
			}
		}
	);

	const mergedClass = twMerge(
		button({
			color,
			size
		})
	);
	const buttonClass = cn(mergedClass, classProp, {
		"opacity-50 cursor-not-allowed": disabled,
		"pl-2": isIcon
	});
</script>

<button {...otherProps} class={buttonClass}>
	{#if isIcon}
		<img src={plusIcon} alt="plus icon" class="mr-2" decoding="async" />
	{/if}

	{#if children}
		{@render children()}
	{/if}
</button>
