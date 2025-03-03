<script lang="ts">
	import { page } from '$app/state';
	import type { Component } from 'svelte';

	let {
		ref,
		sections,
		entries
	}: {
		ref: HTMLDivElement;
		sections: { name: string; el: Component<any, any, any> }[];
		entries: { el: HTMLDivElement; viewed: boolean }[];
	} = $props();

	let currentIndex = $derived.by(() => {
		return sections.findIndex((section) => section.name === page.url.hash.substring(1));
	});
</script>

<div
	class="fixed z-10 p-4 max-md:bottom-2 max-md:left-1/2 max-md:-translate-x-1/2 max-sm:bottom-0 md:right-4 md:top-1/2 md:-translate-y-1/2"
>
	<div class="flex items-center gap-2 md:flex-col">
		{#each sections as _, i}
			<button
				onclick={() => {
					ref.scrollTo({
						top: entries[i].el.offsetTop,
						behavior: 'smooth'
					});
				}}
			>
				{@render star({
					size: 1,
					className:
						currentIndex === i ? 'bg-primary' : 'bg-muted-foreground/50 hover:bg-primary/50'
				})}
			</button>
			{#if i !== sections.length - 1}
				<div
					class="h-px w-8 transition-colors md:h-8 md:w-px {currentIndex === i ||
					i + 1 === currentIndex
						? 'bg-primary'
						: 'bg-muted-foreground/50'}"
				></div>
			{/if}
		{/each}
	</div>
</div>

{#snippet star({ size, className }: { size: number; className?: string })}
	<div
		style="--w: {size}rem"
		class="relative aspect-square h-[var(--w)] w-[var(--w)] overflow-clip transition-all {className}"
	>
		<span
			class="absolute -right-[calc(var(--w)/2)] -top-[calc(var(--w)/2)] aspect-square h-[var(--w)] w-[var(--w)] rounded-full bg-background"
		></span>
		<span
			class="absolute -bottom-[calc(var(--w)/2)] -right-[calc(var(--w)/2)] aspect-square h-[var(--w)] w-[var(--w)] rounded-full bg-background"
		></span>
		<span
			class="absolute -left-[calc(var(--w)/2)] -top-[calc(var(--w)/2)] aspect-square h-[var(--w)] w-[var(--w)] rounded-full bg-background"
		></span>
		<span
			class="absolute -bottom-[calc(var(--w)/2)] -left-[calc(var(--w)/2)] aspect-square h-[var(--w)] w-[var(--w)] rounded-full bg-background"
		></span>
	</div>
{/snippet}
