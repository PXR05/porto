<script lang="ts">
	import * as Dialog from '@/lib/components/ui/dialog';
	import { projects } from '@/lib/data';
	import ProjectView from './ProjectView.svelte';
	import { blur, fly } from 'svelte/transition';
	import { browser } from '$app/environment';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';

	let {
		inview
	}: {
		inview: boolean;
	} = $props();

	let selectedProject = $state<(typeof projects)[string]>();
	let open = $state(false);

	$effect(() => {
		if (browser) {
			const projectKey = page.url.searchParams.get('project');
			if (projectKey && projects[projectKey]) {
				selectedProject = projects[projectKey];
				open = true;
			} else {
				open = false;
				selectedProject = undefined;
			}
		}
	});

	$effect(() => {
		if (browser && !open && page.url.searchParams.has('project')) {
			const url = new URL(page.url);
			url.searchParams.delete('project');
			goto(url, { noScroll: true });
		}
	});

	function openProject(key: string) {
		if (browser) {
			const url = new URL(page.url);
			url.searchParams.set('project', key);
			goto(url, { noScroll: true });
		}
	}
</script>

<div class="col-[1/1] row-[1/1] flex w-full max-w-screen-xl flex-col gap-8 md:gap-16">
	{#if inview}
		<h1
			in:fly={{ delay: 250, duration: 300, y: 50 }}
			class="font-serif text-4xl break-words sm:text-5xl md:text-6xl"
		>
			here are some of my <span class="text-primary"> projects </span>
		</h1>
	{/if}
	<div class="bg-foreground grid grid-cols-2 gap-px p-px">
		{#each Object.entries(projects) as [key, project], i}
			{@const length = Object.keys(projects).length}
			<button
				class="group bg-background flex h-24 items-center rounded-[calc(var(--radius)-1px)] px-6 max-sm:flex-col-reverse sm:justify-between sm:gap-4 md:h-32 md:px-10 {i ===
					length - 1 && 'col-span-full'}"
				onclick={() => {
					if (i === length - 1) {
						window.open(project.link, '_blank');
						return;
					}
					openProject(key);
				}}
			>
				{#if inview}
					<h2
						in:blur={{
							delay: 500 + 100 * i,
							duration: 300
						}}
						class="group-hover:border-primary grid gap-1 border-transparent text-left font-serif text-2xl transition-all group-hover:pb-1 max-sm:py-1 sm:border-b-4 md:text-4xl"
					>
						{project.title}
						<p
							class="line-clamp-2 max-h-0 text-xs transition-all group-hover:max-h-10 max-sm:hidden md:text-sm"
						>
							{project.content}
						</p>
					</h2>
					<img
						in:blur={{
							delay: 750 + 100 * i,
							duration: 300
						}}
						class="aspect-square h-10 w-10 max-sm:rounded"
						src="/assets/{key}_logo.webp"
						alt={project.title}
					/>
				{/if}
			</button>
		{/each}
	</div>
</div>

<Dialog.Root bind:open>
	<Dialog.Content class="h-[100dvh] w-screen max-w-full items-end rounded-none p-0">
		{#if selectedProject}
			<ProjectView {selectedProject} />
		{/if}
	</Dialog.Content>
</Dialog.Root>
