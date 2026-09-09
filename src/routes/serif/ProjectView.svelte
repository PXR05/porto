<script lang="ts">
	import { SquareArrowOutUpRight } from '@lucide/svelte';
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

<div
	class="relative col-[1/1] row-[1/1] flex h-[100dvh] w-screen flex-col gap-4 overflow-y-auto p-4 md:gap-8 md:p-8"
>
	<Carousel
		className="rounded-lg border border-foreground hover:border-primary min-h-56 flex-1 shrink-0 md:mt-4 mt-8 mb-0"
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
			class="hover:border-primary flex w-full items-end gap-3 border-b-2 border-transparent break-words transition-all md:w-fit"
		>
			<span>
				{selectedProject.title}
			</span>
			<SquareArrowOutUpRight
				strokeWidth={1.5}
				absoluteStrokeWidth
				class="mb-1 inline-block size-6 max-md:ml-auto md:size-8"
			/>
		</a>
		<div class="flex flex-wrap gap-2">
			{#each selectedProject.tags as tag}
				<span
					class="border-foreground hover:border-primary hover:bg-primary hover:text-background border px-3 py-1 font-sans text-sm transition-all md:text-base"
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
	<Dialog.Content class="h-[100dvh] w-screen max-w-full grid-rows-[minmax(0,1fr)] rounded-none p-0">
		<Dialog.Title class="sr-only">{selectedProject.title} image preview</Dialog.Title>
		<Dialog.Description class="sr-only"
			>Swipe or use the previous and next buttons or arrow keys to switch images.</Dialog.Description
		>
		<Carousel
			bind:index
			proj={selectedProject.title.toLowerCase()}
			count={selectedProject.carouselLength}
			animate={false}
			preview
		/>
	</Dialog.Content>
</Dialog.Root>
