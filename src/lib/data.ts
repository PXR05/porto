import { Linkedin, Mail, Phone, Twitter } from '@lucide/svelte';

export const projects: Record<
	string,
	{
		title: string;
		content: string;
		tags: string[];
		link: string;
		carouselLength: number;
		highlight?: boolean;
	}
> = {
	panopticon: {
		title: 'Panopticon',
		content:
			'A Human Resource management system designed to streamline administration for employees and managers. Features a personal dashboard for tracking attendance, leave, and salary, alongside a management portal for overseeing requests, managing employee data, and exporting reports.',
		tags: ['Web', 'Svelte', 'TypeScript', 'PostgreSQL', 'Docker'],
		link: 'https://pxr0.pages.dev/?project=panopticon&splash=false#projects',
		carouselLength: 3,
		highlight: true
	},
	yorishiro: {
		title: 'Yorishiro',
		content:
			'A manga reading website that aggregates from multiple sources to get the latest chapters. Uses Supabase for remote database and authentication. Uses Dexie.js for a local cache to save on remote database bandwidth.',
		tags: ['Web', 'Svelte', 'TypeScript', 'Tailwind', 'Supabase', 'Dexie.js'],
		link: 'https://pxr0.pages.dev/?project=yorishiro&splash=false#projects',
		carouselLength: 5,
		highlight: true
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
		carouselLength: 3,
		highlight: true
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

export const contacts: Record<
	string,
	{
		label: string;
		value: string;
		username?: string;
		type: 'email' | 'phone' | 'url';
		icon: typeof Mail;
		showInTextHeader?: boolean;
	}
> = {
	Email: {
		label: 'Email',
		value: 'williamluhur.27@gmail.com',
		username: 'williamluhur.27@gmail.com',
		type: 'email',
		icon: Mail,
		showInTextHeader: true
	},
	LinkedIn: {
		label: 'LinkedIn',
		value: 'https://www.linkedin.com/in/william-luhur',
		username: 'william-luhur',
		type: 'url',
		icon: Linkedin,
		showInTextHeader: true
	},
	Phone: {
		label: 'Phone',
		value: '+628990377159',
		username: '+628990377159',
		type: 'phone',
		icon: Phone,
		showInTextHeader: true
	}
};

export const skills: Record<string, string[]> = {
	Languages: ['TypeScript', 'SQL', 'Python', 'Java', 'C', 'C#', 'Dart', 'Go'],
	Frameworks: ['Svelte', 'React', 'Next.js', 'React Native', 'Flutter', 'ElysiaJS'],
	Tools: ['Git', 'Unity']
};

export const flatSkills: string[] = Object.values(skills).flat();

export const profile = {
	name: 'William',
	surname: 'Luhur',
	title: 'Software Developer',
	location: 'Jakarta, Indonesia',
	intro:
		"Software developer focused on building reliable products, and a Master's student in Computer Science. Adapts quickly across stacks and prioritizes clean architecture, security, and practical user experience."
} as const;

export const professionalExperiences: Array<{
	title: string;
	company: string;
	content: string;
	period: string;
	relatedProject?: string;
}> = [
	{
		title: 'Software Developer',
		company: 'Orcid Mantis Indonesia',
		content:
			'Built Panopticon as a paid company project, delivering an HR web system focused on employee and manager workflows.',
		period: 'April 2025 - July 2025',
		relatedProject: 'Panopticon'
	},
	{
		title: 'IT Consultant',
		company: 'SiteSeeeker',
		content:
			'Worked as an IT consultant for a web project, ensuring the system was robust and secure while keeping the user experience pleasant and practical.',
		period: 'October 2025 - February 2026'
	}
];

export const education: Array<{
	institution: string;
	degree: string;
	major: string;
	period: string;
	grade: string;
}> = [
	{
		institution: 'BINUS University',
		degree: "Bachelor's",
		major: 'Computer Science',
		period: 'Sep 2022 - Feb 2026',
		grade: '3.90 / 4.00'
	},
	{
		institution: 'BINUS University',
		degree: "Master's",
		major: 'Computer Science',
		period: 'Sep 2025 - Feb 2027',
		grade: '4.00 / 4.00'
	}
];

export default {
	projects,
	contacts,
	skills,
	flatSkills,
	profile,
	professionalExperiences,
	education
};
