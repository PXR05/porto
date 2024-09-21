<script lang="ts">
	import type { Snippet } from 'svelte';
	import { cn } from '../utils';

	let {
		children,
		className,
		duration = 500
	}: {
		children: Snippet<[]>;
		className?: string;
		duration?: number;
	} = $props();
</script>

<div
	style="--duration: {duration}ms;"
	class={cn(
		'cont overflow-hidden relative border-2 border-primary h-[calc(100svh-1rem)] md:h-[calc(100svh-10rem)] w-full max-w-3xl flex flex-col',
		className
	)}
>
	<div class="screen z-50 w-full h-full bg-primary absolute inset-0"></div>
	{@render children()}
</div>

<style>
	.cont {
		animation: vertical-wipe-in calc(var(--duration) / 2) ease-in-out var(--duration) forwards;
	}
	.screen {
		animation: vertical-wipe-out calc(var(--duration) / 2) ease-in-out calc(var(--duration) * 1.5)
			forwards;
	}
</style>
