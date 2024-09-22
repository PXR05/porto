export const projects: Record<
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

