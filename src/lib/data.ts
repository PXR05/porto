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
			'A manga reading website that aggregates from multiple sources to get the latest chapters. Uses Supabase for remote database and authentication. Uses Dexie.js for a local cache database to save on remote database bandwidth.',
		tags: ['Web', 'Svelte', 'TypeScript', 'Tailwind', 'Supabase', 'Dexie.js'],
		link: 'https://yorishiro.pages.dev/auth/pin',
		carouselLength: 5
	},
	monograph: {
		title: 'Monograph',
		content:
			'A note-taking app that uses Markdown for formatting and extended with various QoL features. Built using Svelte and TipTap for the text editor. Data stored locally in IndexedDB with optional backup using Google Drive.',
		tags: ['Web', 'Svelte', 'TypeScript', 'Tailwind', 'Dexie.js', 'Markdown', 'TipTap'],
		link: 'https://monograph.pages.dev',
		carouselLength: 7
	},
	preprocess: {
		title: 'Preprocess',
		content:
			'A web app with a collection of tools to preprocesses multiple types of data. Uses ffmpeg.wasm for audio processing and Tesseract.js for OCR. Built using Svelte and Tailwind.',
		tags: ['Web', 'Svelte', 'TypeScript', 'Tailwind', 'ffmpeg', 'Tesseract'],
		link: 'https://preprocess.pages.dev',
		carouselLength: 9
	},
	panopticon: {
		title: 'Panopticon',
		content:
			'A Human Resource (HR) management system designed to streamline administration for both employees and managers. Features a personal dashboard for tracking attendance, leave, and salary, alongside a management portal for overseeing requests, managing employee data, and exporting reports.',
		tags: ['Web', 'Svelte', 'TypeScript', 'PostgreSQL', 'Docker'],
		link: 'https://pxr0.pages.dev/?project=panopticon&splash=false#projects',
		carouselLength: 3
	},
	// binary: {
	// 	title: 'Binary',
	// 	content:
	// 		'A variation of tic-tac-toe built using Svelte with the ability to do co-op multiplayer using the PeerJS WebRTC library.',
	// 	tags: ['Web', 'Svelte', 'TypeScript', 'WebRTC'],
	// 	link: 'https://binarygame.pages.dev',
	// 	carouselLength: 3
	// },
	kotak: {
		title: 'Kotak',
		content:
			'A self-hosted file management system built with SvelteKit that provides secure file storage, organization, and sharing capabilities. This web app allows you to upload, organize, preview, and share files through an intuitive interface, basically a simple personal cloud storage that you control completely.',
		tags: ['Web', 'Svelte', 'TypeScript', 'PostgreSQL', 'Docker'],
		link: 'https://github.com/PXR05/kotak',
		carouselLength: 3
	},
	kanade: {
		title: 'Kanade',
		content:
			'A terminal music player written in Go. Manage, play, and download music from YouTube, all from a minimal TUI. It supports local libraries, album art, and metadata display.',
		tags: ['Terminal', 'Go', 'Bubble Tea', 'ffmpeg'],
		link: 'https://github.com/PXR05/kanade',
		carouselLength: 3
	},
	archive: {
		title: 'Archive',
		content:
			'Audio recorder app built in React Native with Expo. Able to record, mark, and transcribe recordings from audio to text',
		tags: ['Mobile', 'React Native', 'Expo', 'TypeScript', 'Whisper'],
		link: 'https://github.com/PXR05/archive',
		carouselLength: 2
	},
	// neiro: {
	// 	title: 'Neiro',
	// 	content:
	// 		'Mobile music player and downloader built using flutter. Able to download music from Spotify and YouTube. Uses YouTube’s public API and Spotify’s official API.',
	// 	tags: ['Mobile', 'Flutter', 'Dart'],
	// 	link: 'https://gitfront.io/r/PXR05/vzsoXNa8AR3m/neiro-flutter/',
	// 	carouselLength: 2
	// },
	others: {
		title: 'Others',
		content:
			'For more projects, you can check my GitHub. I have projects ranging from web, mobile, desktop, and others.',
		tags: ['Web', 'Mobile', 'Desktop', 'API', 'CLI'],
		link: 'https://github.com/PXR05',
		carouselLength: 1
	}
};

export const contacts: Record<string, string> = {
	Email: 'williamluhur.27@gmail.com',
	WhatsApp: 'https://wa.me/+628990377159',
	'X (Twitter)': 'https://x.com/pxr_____',
	GitHub: 'https://github.com/PXR05',
	LinkedIn: 'https://www.linkedin.com/in/william-luhur'
};

export const skills: string[] = [
	'TypeScript',
	'Svelte',
	'React',
	'SQL',
	'Python',
	'Flutter',
	'Next.js',
	'React Native',
	'Node.js',
	'Java',
	'C',
	'C#',
	'Dart',
	'Go',
	'Git',
	'Unity',
	'Godot'
];

export const profile: {
	name: string;
	title: string;
	location: string;
	intro: string;
} = {
	name: 'William',
	title: 'Software Developer',
	location: 'Jakarta, Indonesia',
	intro:
		'Undergraduate student majoring in Computer Science. Able to adapt and work on various technologies quickly. Creating software for users.'
};

export default { projects, contacts, skills, profile };
