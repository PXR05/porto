<script lang="ts">
	import { page } from '$app/state';
	import type { Component } from 'svelte';
	import { innerWidth } from 'svelte/reactivity/window';

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
	class="fixed right-4 z-10 p-4 max-lg:bottom-2 max-md:bottom-1 max-md:pr-0 lg:top-1/2 lg:right-2 lg:-translate-y-1/2"
>
	<div class="flex items-center lg:flex-col">
		{#each sections as _, i}
			<button
				class="p-2"
				onclick={() => {
					ref.scrollTo({
						top: entries[i].el.offsetTop,
						behavior: 'smooth'
					});
				}}
			>
				{@render star({
					size: (innerWidth.current ?? 0) < 768 ? 1.5 : 1,
					className:
						currentIndex === i ? 'bg-primary' : 'bg-muted-foreground/50 hover:bg-primary/50'
				})}
			</button>
			{#if i !== sections.length - 1}
				<div
					class="h-px w-8 transition-colors lg:h-8 lg:w-px
					{currentIndex === i || i + 1 === currentIndex ? 'bg-primary' : 'bg-muted-foreground/50'}"
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
			class="bg-background absolute -top-[calc(var(--w)/2)] -right-[calc(var(--w)/2)] aspect-square h-[var(--w)] w-[var(--w)] rounded-full"
		></span>
		<span
			class="bg-background absolute -right-[calc(var(--w)/2)] -bottom-[calc(var(--w)/2)] aspect-square h-[var(--w)] w-[var(--w)] rounded-full"
		></span>
		<span
			class="bg-background absolute -top-[calc(var(--w)/2)] -left-[calc(var(--w)/2)] aspect-square h-[var(--w)] w-[var(--w)] rounded-full"
		></span>
		<span
			class="bg-background absolute -bottom-[calc(var(--w)/2)] -left-[calc(var(--w)/2)] aspect-square h-[var(--w)] w-[var(--w)] rounded-full"
		></span>
	</div>
{/snippet}
