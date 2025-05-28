<script lang="ts">
	import { page } from '$app/state';
	import { projects } from '@/lib/data';
	import { className } from '@/lib/stores';
	import Header from '@/routes/terminal/Header.svelte';
	import { onMount } from 'svelte';
	import * as Dialog from '$lib/components/ui/dialog';
	import Carousel from '@/lib/components/Carousel.svelte';
	import { ArrowUpRight } from 'lucide-svelte';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';

	let proj = $derived(page.params.proj);
	let project = $derived(projects[proj] ?? {});

	onMount(() => {
		className.set('md:max-w-[90vw]');
	});

	let open = $state(false);
	let index = $state(0);

	$effect(() => {
		if (browser) {
			const showImage = page.url.searchParams.get('image');
			open = showImage === 'true';
		}
	});

	$effect(() => {
		if (browser && !open && page.url.searchParams.has('image')) {
			const url = new URL(page.url);
			url.searchParams.delete('image');
			goto(url, { noScroll: true });
		}
	});

	function openImageViewer() {
		if (browser) {
			const url = new URL(page.url);
			url.searchParams.set('image', 'true');
			goto(url, { noScroll: true });
		}
	}
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
	<Carousel bind:index {proj} count={project.carouselLength} onclick={openImageViewer} />
	<div class="flex w-full flex-col gap-4 border-t-2 border-primary p-4">
		<a
			href={project.link}
			target="_blank"
			rel="noopener noreferrer"
			class="flex w-fit items-center gap-2"
		>
			<h2 class="flex items-center gap-1 font-term_mono text-2xl font-semibold text-primary">
				{project.title}
				<ArrowUpRight size={28} strokeWidth={3} absoluteStrokeWidth />
			</h2>
		</a>
		<div class="flex flex-wrap gap-2 font-term_mono">
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

<Dialog.Root bind:open>
	<Dialog.Content class="h-full max-h-svh w-full max-w-[100vw] p-0">
		<img
			src="/assets/{proj}_{index}.webp"
			alt="{proj}-{index}"
			class="h-full w-full object-contain"
		/>
	</Dialog.Content>
</Dialog.Root>
