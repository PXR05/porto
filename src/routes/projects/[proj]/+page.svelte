<script lang="ts">
	import { page } from '$app/stores';
	import { projects } from '@/lib/data';
	import { className, duration } from '@/lib/stores';
	import Header from '@/routes/Header.svelte';
	import { onMount } from 'svelte';

	let proj = $derived($page.params.proj);
	let project = $derived(projects[proj] ?? {});

	onMount(() => {
		className.set('md:max-w-[90vw]');
	});

	let carouselIndex = $state(0);
	let images = $state<HTMLImageElement[]>([]);
	$effect(() => {
		if (images.length > 1) {
			carouselIndex = (carouselIndex + images.length) % images.length;
			images[carouselIndex].scrollIntoView({ behavior: 'smooth', block: 'center' });
		}
	});
</script>

<svelte:head>
	<title>
		PXR/Projects/{proj.charAt(0).toUpperCase() + proj.slice(1)}
	</title>
</svelte:head>

<Header>
	<span> PXR/Projects/ </span>
	<span class="font-semibold underline">
		{proj.charAt(0).toUpperCase() + proj.slice(1)}
	</span>
</Header>
<div class="grid overflow-scroll">
	<div
		style="--duration: {$duration}ms ; grid-template-columns: repeat({project.carouselLength}, 100%);"
		class="img relative grid snap-x snap-mandatory overflow-hidden"
	>
		{#each Array.from({ length: project.carouselLength }) as _, i}
			<img
				alt="{proj}-{i}"
				bind:this={images[i]}
				src="/assets/{proj}_{i}.webp"
				class="h-full w-full snap-center border-b-2 border-primary object-cover {i === 0
					? 'object-center'
					: 'object-top'}"
			/>
			<button
				onclick={() => (carouselIndex -= 1)}
				style="left: {i * 100}%; "
				class="absolute bottom-0 top-0 h-full w-[10%] text-2xl text-white mix-blend-difference transition-all hover:pr-8 hover:opacity-100 {carouselIndex !==
					0 && 'opacity-0'}"
			>
				❰
			</button>
			<button
				onclick={() => (carouselIndex += 1)}
				style="left: {i * 100 + 90}%;"
				class="absolute bottom-0 top-0 h-full w-[10%] text-2xl text-white mix-blend-difference transition-all hover:pl-8 hover:opacity-100 {carouselIndex !==
					0 && 'opacity-0'}"
			>
				❱
			</button>
		{/each}
	</div>
	<div class="flex w-full flex-col gap-4 p-4">
		<a
			href={project.link}
			target="_blank"
			rel="noopener noreferrer"
			class="flex w-fit items-center gap-2"
		>
			<h2 class="text-2xl font-semibold text-primary">{project.title}</h2>
		</a>
		<div class="flex flex-wrap gap-2">
			{#each project.tags as tag}
				<span class="bg-primary px-1.5 font-medium text-primary-foreground">
					{tag}
				</span>
			{/each}
		</div>
		<div class="w-full">
			{project.content}
		</div>
	</div>
</div>

<style>
	.img {
		clip-path: inset(0 0 100% 0);
		animation: vertical-wipe-in calc(var(--duration) / 2) cubic-bezier(0.85, 0, 0.15, 1)
			calc(var(--duration) * 1.5) forwards;
	}
</style>
