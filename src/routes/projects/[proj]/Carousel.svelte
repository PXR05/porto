<script lang="ts">
	import { duration } from '@/lib/stores';

	let {
		proj,
		count,
		index = $bindable(0),
		animate = true,
		onclick = () => {}
	}: {
		proj: string;
		count: number;
		index: number;
		animate?: boolean;
		onclick?: () => void;
	} = $props();

	let images = $state<HTMLImageElement[]>([]);
	$effect(() => {
		if (images.length > 1 && images[index]) {
			images[index].scrollIntoView({ inline: 'center', behavior: 'smooth' });
		}
	});
</script>

<div
	style="--duration: {animate ? $duration : 0}ms ; grid-template-columns: repeat({count}, 100%);"
	class="img relative grid snap-x snap-mandatory overflow-hidden"
>
	{#each Array.from({ length: count }) as _, i}
		<!-- svelte-ignore a11y_click_events_have_key_events -->
		<!-- svelte-ignore a11y_no_noninteractive_element_interactions -->
		<img
			{onclick}
			alt="{proj}-{i}"
			bind:this={images[i]}
			src="/assets/{proj}_{i}.webp"
			class="h-full w-full snap-center object-cover {i === 0 ? 'object-center' : 'object-top'}"
		/>
		<button
			onclick={() => {
				index = (index - 1 + images.length) % images.length;
			}}
			style="left: {i * 100}%; "
			class="absolute bottom-0 top-0 h-full w-[8%] text-2xl text-white mix-blend-difference transition-all hover:opacity-100 md:opacity-50 {animate &&
				'md:opacity-0 md:hover:pr-8'}"
		>
			❰
		</button>
		<button
			onclick={() => {
				index = (index + 1 + images.length) % images.length;
			}}
			style="left: {i * 100 + 92}%;"
			class="absolute bottom-0 top-0 h-full w-[8%] text-2xl text-white mix-blend-difference transition-all hover:opacity-100 md:opacity-50 {animate &&
				'md:opacity-0 md:hover:pl-8'}"
		>
			❱
		</button>
	{/each}
</div>

<style>
	.img {
		clip-path: inset(0 0 100% 0);
		animation: vertical-wipe-in calc(var(--duration) / 2) cubic-bezier(0.85, 0, 0.15, 1)
			calc(var(--duration) * 1.5) forwards;
	}
</style>
