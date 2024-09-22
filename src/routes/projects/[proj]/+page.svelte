<script lang="ts">
	import { page } from '$app/stores';
	import { className, duration } from '@/lib/stores';
	import Header from '@/routes/Header.svelte';
	import { onMount } from 'svelte';

	const projects: Record<
		string,
		{
			title: string;
			content: string;
			tags: string[];
			link: string;
		}
	> = {
		yorishiro: {
			title: 'Yorishiro',
			content:
				'A manga reading website that aggregates from multiple sources to get the latest chapters. Uses Supabase for the database and authentication. Made for personal use.',
			tags: ['Web', 'Svelte', 'TypeScript', 'Supabase', 'Tailwind'],
			link: 'https://yorishiro.pages.dev/account/pin'
		},
		monograph: {
			title: 'Monograph',
			content:
				'A note-taking app that uses Markdown for formatting and extended with various QoL features. Similar to Notion and Obsidian. Built using Svelte and ProseMirror for the text editor.',
			tags: ['Web', 'Svelte', 'TypeScript', 'Tailwind'],
			link: 'https://monograph.pages.dev'
		},
		binary: {
			title: 'Binary',
			content:
				'A variation of tic-tac-toe built using Svelte with the ability to do co-op multiplayer using the PeerJS WebRTC library.',
			tags: ['Web', 'Svelte', 'TypeScript'],
			link: 'https://binarygame.pages.dev'
		},
		archive: {
			title: 'Archive',
			content:
				'Audio recorder app built in React Native with Expo. Able to record, mark, and transcribe recordings from audio to text',
			tags: ['Mobile', 'React Native', 'Expo', 'TypeScript'],
			link: 'https://gitfront.io/r/PXR05/KKfGo8RWpwL7/archive/'
		},
		neiro: {
			title: 'Neiro',
			content:
				'Mobile music player and downloader built using flutter. Able to download music from Spotify and YouTube. Uses YouTube’s public API and Spotify’s official API.',
			tags: ['Mobile', 'Flutter', 'Dart'],
			link: 'https://gitfront.io/r/PXR05/vzsoXNa8AR3m/neiro-flutter/'
		}
	};

	let proj = $derived($page.params.proj);
	let project = $derived(projects[proj]);

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
<a
	href="/?skip"
	class="no-underline absolute top-0 right-0 px-1 aspect-square w-12 bg-primary text-primary-foreground hover:opacity-75 transition-all grid place-items-center text-3xl text-center"
>
	&times;
</a>
<div
	class="h-[calc(100svh-4rem)] md:h-[calc(100svh-13rem)] grid md:grid-cols-2 max-md:overflow-scroll"
>
	<img
		alt={proj}
		src="/assets/{proj}_banner.png"
		style="--duration: {$duration}ms;"
		class="img h-full object-center object-cover md:border-r-2 max-md:border-b-2 border-primary"
	/>
	<div class="flex flex-col gap-4 p-4 w-full md:overflow-scroll">
		<a
			href={project.link}
			target="_blank"
			rel="noopener noreferrer"
			class="w-fit flex items-center gap-2"
		>
			<h2 class="text-primary font-semibold text-2xl">{project.title}</h2>
		</a>
		<div class="flex flex-wrap gap-2">
			{#each project.tags as tag}
				<span class="bg-primary font-medium text-primary-foreground px-1.5">
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
		animation: vertical-wipe-in calc(var(--duration) / 2) ease-out calc(var(--duration) * 1.5)
			forwards;
	}
</style>
