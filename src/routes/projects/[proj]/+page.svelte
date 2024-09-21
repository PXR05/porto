<script lang="ts">
	import { page } from '$app/stores';
	import { className } from '@/lib/stores';
	import { parseMarkdown } from '@/lib/markdown';
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
		className.set('max-w-[90vw]');
	});
</script>

<h1 class="border-b-2 border-primary text-primary w-full text-xl font-semibold p-2">
	PXR/projects/{proj}
</h1>
<a
	href="/?skip"
	class="no-underline absolute top-0 right-0 px-1 aspect-square w-11 bg-primary text-primary-foreground hover:opacity-75 transition-all grid place-items-center text-3xl text-center"
>
	&times;
</a>
<div class="h-[calc(100svh-4rem)] md:h-[calc(100svh-13rem)] flex flex-col">
	<img
		alt={proj}
		loading="eager"
		src="/assets/{proj}_banner.png"
		style="--duration: 500ms;"
		class="img w-full h-full object-center object-cover border-b-2 border-primary"
	/>
	<div class="h-fit flex flex-col gap-4 p-4 w-full">
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
				<span class="bg-primary text-primary-foreground px-1">
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
		animation: vertical-wipe-in calc(var(--duration) / 2) ease-in-out calc(var(--duration) * 1.5)
			forwards;
	}
</style>
