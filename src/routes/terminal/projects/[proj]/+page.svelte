<script lang="ts">
	import { page } from '$app/state';
	import { projects } from '#lib/data.ts';
	import Header from '../../Header.svelte';
	import * as Dialog from '#lib/components/ui/dialog/index.js';
	import Carousel from '#lib/components/Carousel.svelte';
	import { ArrowUpRight } from '@lucide/svelte';
	import { browser } from '$app/env';
	import { goto } from '$app/navigation';

	let proj = $derived(page.params.proj ?? '');
	let project = $derived(projects[proj] ?? {});

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
			const url = new URL(page.url.href);
			url.searchParams.delete('image');
			goto(url, { reset: false });
		}
	});

	function openImageViewer() {
		if (browser) {
			const url = new URL(page.url.href);
			url.searchParams.set('image', 'true');
			goto(url, { reset: false });
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

	<div class="border-primary flex w-full flex-col gap-4 border-t-2 p-4">
		<a
			href={project.link}
			target="_blank"
			rel="noopener noreferrer"
			class="flex w-fit items-center gap-2"
		>
			<h2 class="font-term_mono text-primary flex items-center gap-1 text-2xl font-semibold">
				{project.title}
				<ArrowUpRight size={28} strokeWidth={3} absoluteStrokeWidth />
			</h2>
		</a>
		<div class="font-term_mono flex flex-wrap gap-2">
			{#each project.tags as tag}
				<span class="bg-primary text-primary-foreground px-1.5 font-medium">
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
