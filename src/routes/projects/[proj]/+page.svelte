<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { projects } from '@/lib/projects';
	import { className, duration, skip } from '@/lib/stores';
	import Header from '@/routes/Header.svelte';
	import { onMount } from 'svelte';

	let proj = $derived($page.params.proj);
	let project = $derived(projects[proj] ?? {});

	onMount(() => {
		className.set('md:max-w-[90vw]');
	});
</script>

<svelte:head>
	<title>PXR</title>
</svelte:head>

<Header>
	<span> PXR/Projects/ </span>
	<span class="font-semibold underline">
		{proj.charAt(0).toUpperCase() + proj.slice(1)}
	</span>
</Header>
<div class="grid overflow-scroll">
	<img
		alt={proj}
		src="/assets/{proj}_banner.webp"
		style="--duration: {$duration}ms;"
		class="img h-full w-full border-b-2 border-primary object-cover object-center"
	/>
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
