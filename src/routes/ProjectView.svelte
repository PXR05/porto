<script lang="ts">
	import Carousel from '@/lib/components/Carousel.svelte';
	import * as Dialog from '@/lib/components/ui/dialog';
	import type { projects } from '@/lib/data';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let {
		selectedProject
	}: {
		selectedProject: (typeof projects)[string];
	} = $props();

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

<div class="relative col-[1/1] row-[1/1] flex h-[100dvh] w-screen flex-col gap-8 p-4 md:p-8">
	<Carousel
		className="rounded-lg border border-foreground hover:border-primary h-full m-4 mb-0"
		bind:index
		proj={selectedProject.title.toLowerCase()}
		count={selectedProject.carouselLength}
		onclick={openImageViewer}
		animate={false}
	/>
	<h1 class="flex flex-col gap-4 font-serif text-4xl md:text-6xl">
		<a
			href={selectedProject.link}
			target="_blank"
			rel="noopener noreferrer"
			class="w-fit break-words border-b-2 border-transparent transition-all hover:border-primary"
		>
			{selectedProject.title}
		</a>
		<div class="flex flex-wrap gap-2">
			{#each selectedProject.tags as tag}
				<span
					class="border border-foreground px-3 py-1 font-sans text-sm transition-all hover:border-primary hover:bg-primary hover:text-background md:text-base"
				>
					{tag}
				</span>
			{/each}
		</div>
	</h1>
	<p class="font-sans text-base md:text-xl">
		{selectedProject.content}
	</p>
</div>

<Dialog.Root bind:open>
	<Dialog.Content class="h-[100dvh] w-screen max-w-full rounded-none p-0">
		<img
			src="/assets/{selectedProject?.title.toLowerCase()}_{index}.webp"
			alt="{selectedProject?.title.toLowerCase()}-{index}"
			class="h-full w-full object-contain"
		/>
	</Dialog.Content>
</Dialog.Root>
