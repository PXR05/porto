<script lang="ts">
	import { duration } from '@/lib/stores';
	import { ChevronLeft, ChevronRight } from 'lucide-svelte';

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

	let images = $state<HTMLImageElement[]>([]);
	let carouselContainer = $state<HTMLDivElement>();
	let isNavigating = $state(false);
	
	$effect(() => {
		if (images.length > 1 && images[index]) {
			isNavigating = true;
			images[index].scrollIntoView({ inline: 'center', behavior: 'smooth' });
			setTimeout(() => {
				isNavigating = false;
			}, 300);
		}
	});

	function handleScroll() {
		if (!carouselContainer || images.length === 0 || isNavigating) return;
		
		const containerWidth = carouselContainer.clientWidth;
		const scrollLeft = carouselContainer.scrollLeft;
		const newIndex = Math.round(scrollLeft / containerWidth);
		
		if (newIndex !== index && newIndex >= 0 && newIndex < images.length) {
			index = newIndex;
		}
	}
</script>

<div
	bind:this={carouselContainer}
	onscroll={handleScroll}
	style="--duration: {animate ? $duration : 0}ms; grid-template-columns: repeat({count}, 100%);"
	class="relative grid snap-x snap-mandatory overflow-scroll {className}"
	class:img={animate}
>
	{#each Array.from({ length: count }) as _, i}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<img
			{onclick}
			alt="{proj}-{i}"
			draggable="false"
			bind:this={images[i]}
			src="/assets/{proj}_{i}.webp"
			class="h-full w-full select-none snap-center object-cover {i === 0 ? 'object-center' : 'object-top'}"
		/>
	{/each}
</div>
<div class="absolute bottom-2 right-2 flex gap-2">
	<button
		onclick={() => {
			index = (index - 1 + images.length) % images.length;
		}}
		class="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
	>
		❰
	</button>
	<button
		onclick={() => {
			index = (index + 1 + images.length) % images.length;
		}}
		class="rounded-full bg-black/50 p-2 text-white backdrop-blur-sm transition-all hover:bg-black/70"
	>
		❱
	</button>
</div>

<style>
	.img {
		clip-path: inset(0 0 100% 0);
		animation: vertical-wipe-in calc(var(--duration) / 2) cubic-bezier(0.85, 0, 0.15, 1)
			calc(var(--duration) * 1.5) forwards;
	}
</style>
