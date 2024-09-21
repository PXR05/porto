<script lang="ts">
	import { page } from '$app/stores';
	import Container from '@/lib/components/Container.svelte';
	import { parseMarkdown } from '@/lib/markdown';

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
				'A note-taking app that uses Markdown for formatting and extended with various QoL features. Similar to Notion and Obsidian. Built using Svelte and ProseMirror for the text editor.\n**Features:**\n- Manage Notes\nThis feature will anable user to make notes or delete notes from the folder that has been created.	User can edit the notes that have been created and user can also make a table, bullet poin, etc inside	the notes by typing. - Manage folders    This feature will anable user to make folders or delete folders by using the upload or create button.	User can also make a folder inside the main folder that has been created.- search	Search is a feature that allows users to search for notes or folders that have been created.- theme	Feature theme gives user the option to pick their desired theme.',
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
</script>

<Container duration={500} className="max-w-[90vw]">
	<h1 class="border-b-2 border-primary text-primary w-full text-xl font-semibold p-2">
		PXR/projects/{proj}
	</h1>
	<a
		href="/?skip"
		class="no-underline absolute top-0 right-0 px-1 aspect-square w-11 bg-primary text-primary-foreground hover:opacity-75 transition-all grid place-items-center text-3xl text-center"
	>
		&times;
	</a>
	<div class="flex flex-col gap-4 p-4">
		<a
			href={project.link}
			target="_blank"
			rel="noopener noreferrer"
			class="w-fit flex items-center gap-2"
		>
			<h2 class="text-primary font-semibold text-2xl">{project.title}</h2>
		</a>
		<div class="flex gap-2">
			{#each project.tags as tag}
				<span class="bg-primary text-primary-foreground px-1">
					{tag}
				</span>
			{/each}
		</div>
		<div class="prose dark:prose-invert">
			{@html parseMarkdown(project.content.toString())}
		</div>
	</div>
</Container>
