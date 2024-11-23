export const projects: Record<
	string,
	{
		title: string;
		content: string;
		tags: string[];
		link: string;
		carouselLength: number;
	}
> = {
	yorishiro: {
		title: 'Yorishiro',
		content:
			'A manga reading website that aggregates from multiple sources to get the latest chapters. Uses Supabase for the database and authentication. Made for personal use.',
		tags: ['Web', 'Svelte', 'TypeScript', 'Supabase', 'Tailwind'],
		link: 'https://yorishiro.pages.dev/account/pin',
		carouselLength: 5
	},
	monograph: {
		title: 'Monograph',
		content:
			'A note-taking app that uses Markdown for formatting and extended with various QoL features. Similar to Notion and Obsidian. Built using Svelte and ProseMirror for the text editor.',
		tags: ['Web', 'Svelte', 'TypeScript', 'Tailwind'],
		link: 'https://monograph.pages.dev',
		carouselLength: 7
	},
	binary: {
		title: 'Binary',
		content:
			'A variation of tic-tac-toe built using Svelte with the ability to do co-op multiplayer using the PeerJS WebRTC library.',
		tags: ['Web', 'Svelte', 'TypeScript'],
		link: 'https://binarygame.pages.dev',
		carouselLength: 3
	},
	archive: {
		title: 'Archive',
		content:
			'Audio recorder app built in React Native with Expo. Able to record, mark, and transcribe recordings from audio to text',
		tags: ['Mobile', 'React Native', 'Expo', 'TypeScript'],
		link: 'https://github.com/PXR05/archive',
		carouselLength: 2
	},
	neiro: {
		title: 'Neiro',
		content:
			'Mobile music player and downloader built using flutter. Able to download music from Spotify and YouTube. Uses YouTube’s public API and Spotify’s official API.',
		tags: ['Mobile', 'Flutter', 'Dart'],
		link: 'https://gitfront.io/r/PXR05/vzsoXNa8AR3m/neiro-flutter/',
		carouselLength: 2
	},
	others: {
		title: 'Others',
		content:
			'For more projects, you can check my GitHub. I have projects ranging from web, mobile, desktop, and others.',
		tags: ['Web', 'Mobile', 'Desktop', 'API', 'CLI'],
		link: 'https://github.com/PXR05',
		carouselLength: 1
	}
};

export const contacts = {
	Email: 'williamluhur.27@gmail.com',
	WhatsApp: 'https://wa.me/+628990377159',
	'X (Twitter)': 'https://x.com/pxr_____',
	GitHub: 'https://github.com/PXR05',
	LinkedIn: 'https://www.linkedin.com/in/william-luhur/'
};

export const skills = [
	'TypeScript',
	'Svelte',
	'React',
	'React Native',
	'Next.js',
	'SQL',
	'Python',
	'Node.js',
	'Flutter',
	'Java',
	'C',
	'C#',
	'Dart',
	'Go',
	'Git',
	'Unity',
	'Godot'
];

export const profile = {
	name: 'William',
	location: 'Indonesia',
	intro:
		'Undergraduate student majoring in Computer Science. Able to adapt and work on various technologies quickly. Creating software for users.'
};
