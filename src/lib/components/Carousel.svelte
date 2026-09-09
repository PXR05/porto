<script lang="ts">
	import { duration } from '@/routes/terminal/stores';
	import * as CarouselUI from '@/lib/components/ui/carousel';
	import type { CarouselAPI } from '@/lib/components/ui/carousel/context';
	import { untrack } from 'svelte';

	let {
		proj,
		count,
		index = $bindable(0),
		className,
		animate = true,
		preview = false,
		onclick = () => {}
	}: {
		proj: string;
		count: number;
		index: number;
		className?: string;
		animate?: boolean;
		preview?: boolean;
		onclick?: () => void;
	} = $props();

	let api = $state<CarouselAPI | undefined>(undefined);

	$effect(() => {
		const target = index;
		if (!api) return;
		const current = api.selectedScrollSnap();
		if (current !== target) {
			api.scrollTo(target);
		}
	});

	function onInit(newApi: CarouselAPI | undefined) {
		api = newApi;
		newApi?.scrollTo(
			untrack(() => index),
			true
		);
	}

	$effect(() => {
		const currentApi = api;
		if (!currentApi) return;
		const onSelect = () => {
			index = currentApi.selectedScrollSnap();
		};
		currentApi.on('select', onSelect);
		return () => {
			currentApi.off('select', onSelect);
		};
	});

	function handleKeyDown(event: KeyboardEvent) {
		if (event.key !== 'ArrowLeft' && event.key !== 'ArrowRight') return;
		event.preventDefault();
		event.stopPropagation();
		if (event.key === 'ArrowLeft') api?.scrollPrev();
		else api?.scrollNext();
	}
</script>

{#snippet galleryImage(i: number)}
	<img
		alt="{proj}-{i}"
		draggable="false"
		src="/assets/{proj}_{i}.webp"
		class="h-full w-full {preview ? 'object-contain' : 'object-cover'} object-center select-none"
	/>
{/snippet}

<CarouselUI.Root
	class="carousel-root {animate ? 'img' : ''} {className ?? ''}"
	style="--duration: {animate ? $duration : 0}ms;"
	setApi={onInit}
	onkeydown={handleKeyDown}
	tabindex={0}
	aria-label={`${proj} image gallery`}
>
	<CarouselUI.Content class="-ms-0 h-full">
		{#each Array.from({ length: count }) as _, i}
			<CarouselUI.Item class="relative h-full ps-0">
				{#if preview}
					{@render galleryImage(i)}
				{:else}
					<button
						type="button"
						class="block h-full w-full cursor-zoom-in"
						tabindex={i === index ? 0 : -1}
						aria-label={`Preview ${proj} image ${i + 1}`}
						{onclick}
					>
						{@render galleryImage(i)}
					</button>
				{/if}
			</CarouselUI.Item>
		{/each}
	</CarouselUI.Content>
	{#if count > 1}
		<div
			class="absolute {preview
				? 'inset-x-0 bottom-6 justify-center'
				: 'top-2 right-2'} flex items-center gap-2"
		>
			<button
				type="button"
				aria-label="Previous image"
				disabled={index === 0}
				onclick={() => api?.scrollPrev()}
				class="flex size-9 items-center justify-center rounded-full bg-black/60 text-sm text-white backdrop-blur-sm hover:bg-black/80 disabled:opacity-40 sm:size-10"
				>❰</button
			>
			<span
				class="rounded-full bg-black/60 px-2.5 py-1.5 text-xs text-white sm:text-sm"
				aria-live="polite"
				aria-atomic="true">{index + 1} / {count}</span
			>
			<button
				type="button"
				aria-label="Next image"
				disabled={index === count - 1}
				onclick={() => api?.scrollNext()}
				class="flex size-9 items-center justify-center rounded-full bg-black/60 text-sm text-white backdrop-blur-sm hover:bg-black/80 disabled:opacity-40 sm:size-10"
				>❱</button
			>
		</div>
	{/if}
</CarouselUI.Root>

<style>
	:global(.carousel-root) {
		height: 100%;
		width: 100%;
		overflow: hidden;
	}

	:global(.carousel-root [data-slot='carousel-content']) {
		height: 100%;
	}

	:global(.carousel-root [data-embla-container]) {
		height: 100%;
		touch-action: pan-y pinch-zoom;
	}

	:global(.carousel-root [data-embla-slide]) {
		height: 100%;
	}
</style>
