<script lang="ts">
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import Profile from './Profile.svelte';
	import Projects from './Projects.svelte';
	import Skillsets from './Skillsets.svelte';
	import Contacts from './Contacts.svelte';
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import SectionIndicator from './SectionIndicator.svelte';

	const sections = [
		{
			name: 'profile',
			el: Profile
		},
		{
			name: 'projects',
			el: Projects
		},
		{
			name: 'skillsets',
			el: Skillsets
		},
		{
			name: 'contacts',
			el: Contacts
		}
	];

	let showScrollHint = $state(true);

	let ref = $state<HTMLDivElement>(null!);
	let entries = $state<{ el: HTMLDivElement; viewed: boolean }[]>(
		Array(sections.length).fill({ el: null, viewed: false })
	);
	let observer = $state<IntersectionObserver | null>(null);

	onMount(() => {
		const hashindex = sections.findIndex((section) => section.name === page.url.hash.substring(1));
		if (hashindex !== -1) {
			ref.scrollTo({
				top: entries[hashindex].el.offsetTop,
				behavior: 'smooth'
			});
		}

		observer = new IntersectionObserver(
			(e) =>
				e.forEach((entry) => {
					if (entry.isIntersecting) {
						const index = parseInt(entry.target.id);
						entries[index].viewed = true;
						goto(`#${sections[index].name}`, { replaceState: true });
					}
				}),
			{
				root: ref,
				threshold: 0.5
			}
		);

		entries.forEach((entry) => observer!.observe(entry.el));

		ref.addEventListener('scroll', () => (showScrollHint = false));
		return () => ref.removeEventListener('scroll', () => (showScrollHint = false));
	});
</script>

<div in:fade={{ delay: 150, duration: 200 }} class="grid">
	<div class="hide-scroll h-svh snap-y snap-mandatory overflow-y-auto" bind:this={ref}>
		{#each sections as { el: Section, name }, i (name)}
			<div id={i.toString()} bind:this={entries[i].el} class="h-svh snap-start">
				<Section inview={entries[i].viewed} />
			</div>
		{/each}
	</div>
</div>

<SectionIndicator {ref} {sections} {entries} />

{#if showScrollHint}
	<div
		transition:fade
		class="fixed animate-bounce max-md:right-4 max-md:top-1/2 max-md:-translate-y-1/2 md:bottom-8 md:left-1/2 md:-translate-x-1/2"
	>
		<div class="relative aspect-square h-6 w-6 bg-primary">
			<span class="absolute -bottom-3 -left-3 aspect-square h-6 w-6 rounded-full bg-background"
			></span>
			<span class="absolute -bottom-3 -right-3 aspect-square h-6 w-6 rounded-full bg-background"
			></span>
			<span class="absolute -top-3 left-[-0.85rem] aspect-square h-6 w-6 bg-background"></span>
			<span class="absolute -top-3 right-[-0.85rem] aspect-square h-6 w-6 bg-background"></span>
		</div>
	</div>
{/if}

<style>
	:global(html) {
		scroll-behavior: smooth;
	}
</style>
