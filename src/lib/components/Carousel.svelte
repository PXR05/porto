<script lang="ts">
	import { duration } from '@/routes/terminal/stores';
	import * as CarouselUI from '@/lib/components/ui/carousel';
	import type { CarouselAPI } from '@/lib/components/ui/carousel/context';

	let {
		proj,
		count,
		index = $bindable(0),
		className,
		animate = true,
		onclick = () => {}
	}: {
		proj: string;
		count: number;
		index: number;
		className?: string;
		animate?: boolean;
		onclick?: () => void;
	} = $props();

	let api = $state<CarouselAPI | undefined>(undefined);
	let isSettingFromParent = $state(false);

	$effect(() => {
		const target = index;
		if (!api) return;
		const current = api.selectedScrollSnap();
		if (current !== target) {
			isSettingFromParent = true;
			api.scrollTo(target);
			setTimeout(() => {
				isSettingFromParent = false;
			}, 300);
		}
	});

	function onInit(newApi: CarouselAPI) {
		api = newApi;
		api.on('select', () => {
			if (isSettingFromParent) return;
			index = api!.selectedScrollSnap();
		});
	}
</script>

<CarouselUI.Root
	class="carousel-root {animate ? 'img' : ''} {className ?? ''}"
	style="--duration: {animate ? $duration : 0}ms;"
	setApi={onInit}
>
	<CarouselUI.Content class="-ms-0 h-full">
		{#each Array.from({ length: count }) as _, i}
			<CarouselUI.Item class="relative h-full ps-0">
				<!-- svelte-ignore a11y_click_events_have_key_events -->
				<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
				<img
					{onclick}
					alt="{proj}-{i}"
					draggable="false"
					src="/assets/{proj}_{i}.webp"
					class="h-full w-full object-cover object-center select-none"
				/>
				{#if i === index}
					<div class="absolute top-2 right-2 flex gap-2">
						<button
							onclick={(e) => {
								e.stopPropagation();
								api?.scrollPrev();
							}}
							class="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
						>
							❰
						</button>
						<button
							onclick={(e) => {
								e.stopPropagation();
								api?.scrollNext();
							}}
							class="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
						>
							❱
						</button>
					</div>
				{/if}
			</CarouselUI.Item>
		{/each}
	</CarouselUI.Content>
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
	}

	:global(.carousel-root [data-embla-slide]) {
		height: 100%;
	}
</style>
