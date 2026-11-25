import { Mail, MessageCircle } from '@lucide/svelte';
import Linkedin from '#lib/components/icons/Linkedin.svelte';
import Twitter from '#lib/components/icons/Twitter.svelte';

export const projects: Record<
	string,
	{
		title: string;
		content: string;
		details?: string[];
		tags: string[];
		link: string;
		carouselLength: number;
		highlight?: boolean;
		substantial?: boolean;
	}
> = {
	panopticon: {
		title: 'Panopticon',
		content:
			'A Human Resource management system designed to streamline administration for employees and managers. Features a personal dashboard for tracking attendance, leave, and salary, alongside a management portal for overseeing requests, managing employee data, and exporting reports.',
		details: [
			'White-label HR management system built with SvelteKit, Drizzle ORM, PostgreSQL, and Tailwind CSS, packaged as a Docker Compose stack with Traefik HTTPS and live admin configuration.',
			'Supports GPS-geofenced attendance with camera check-in/out capture, holiday-aware multi-approver leave workflows with automated anniversary quota cron jobs, and itemized reimbursement claims with mileage tracking.',
			'Implements Indonesian payroll calculations (PPh 21 TER gross/net modes, December annualization, BPJS Kesehatan & Ketenagakerjaan), Argon2 session auth with rate limiting, RBAC, audit logs, and PWA push notifications.'
		],
		tags: ['Web', 'Svelte', 'TypeScript', 'PostgreSQL', 'Docker'],
		link: 'https://pxr0.pages.dev/?project=panopticon&splash=false#projects',
		carouselLength: 3
	},
	yorishiro: {
		title: 'Yorishiro',
		content:
			'A manga reading website that aggregates from multiple sources to get the latest chapters. Uses Supabase for remote database and authentication. Uses Dexie.js for a local cache to save on remote database bandwidth.',
		details: [
			'Manga reading web app that aggregates chapters across multiple external sources via a companion Bun scraping pipeline, paired with a SvelteKit frontend and Supabase authentication/database.',
			'Uses Dexie.js (IndexedDB) for multi-table client caching alongside a Service Worker for offline chapter downloads and reduced bandwidth.',
			'Includes AniList integration, fuzzy search, synced reading history, and an admin panel with source health monitoring, report moderation, announcements, and database browsing.'
		],
		tags: ['Web', 'Svelte', 'TypeScript', 'Supabase', 'Dexie.js'],
		link: 'https://pxr0.pages.dev/?project=yorishiro&splash=false#projects',
		carouselLength: 5,
		highlight: true
	},
	cymatic: {
		title: 'Cymatic',
		content:
			'A minimal Android music player built with Kotlin, Jetpack Compose, and a custom JNI layer for direct USB DAC playback. Features a click wheel interface, local and remote music libraries, offline downloads, and support for FLAC, ALAC, and DSD audio.',
		details: [
			'Minimal Android music player built in Kotlin and Jetpack Compose with a monochrome pixel interface, custom click-wheel gesture navigation, standby wake-into-gesture handling, and per-device audio/EQ profiles.',
			'Native JNI audio modules (FLAC, ALAC, DSD, and USB isochronous transport) to bypass Android audio mixing for direct USB DAC playback with automatic fallback and PCM conversion or bit-perfect DoP.',
			'Integrates USB HID hardware parametric EQ programming for supported DACs, live playback/USB output diagnostics, local folder scanning, and remote library streaming with offline downloads.'
		],
		tags: ['Mobile', 'Android', 'Kotlin', 'Jetpack Compose', 'C++', 'JNI'],
		link: 'https://github.com/PXR05/cymatic',
		carouselLength: 2,
		highlight: true
	},
	cadence: {
		title: 'Cadence',
		content:
			'An offline capable web music player built with SvelteKit, designed to work with a self-hosted backend. Supports library browsing and search, playlist management, queue control, listening history, and offline playback through local caching.',
		details: [
			'Offline-capable web music player built with SvelteKit, Tailwind CSS, Dexie.js, and virtualized lists, deployable via Docker, Cloudflare, or static builds with runtime-switchable backend URLs.',
			'Connects to the self-hosted AudioStream backend through a capability-driven client boundary supporting library search, playlists, stream tickets, folder/remote uploads, similarity-based radio queues, and admin management.',
			'Provides IndexedDB-backed offline track downloads, metadata caching, queue control, listening history, EQ preset sync, and a mobile-optimized player interface.'
		],
		tags: ['Web', 'Svelte', 'TypeScript', 'Dexie.js'],
		link: 'https://github.com/PXR05/cadence',
		carouselLength: 5,
		highlight: true
	},
	monograph: {
		title: 'Monograph',
		content:
			'A note-taking app that uses Markdown for formatting and extended with various QoL features. Built using Svelte and TipTap for the text editor. Data stored locally in IndexedDB with optional backup using Google Drive.',
		details: [
			'Markdown note-taking app built with SvelteKit and TipTap featuring custom extensions for slash commands, block drag handles, search-and-replace, image uploads, tables, task lists, KaTeX math, syntax-highlighted code blocks, and a live table of contents.',
			'Stores hierarchical notebooks locally in IndexedDB via Dexie.js with content hashing and versioning, paired with full-text search and ZIP import/export.',
			'Supports optional Google Drive OAuth synchronization via Better Auth and server-side Drive API endpoints for cross-device backup.'
		],
		tags: ['Web', 'Svelte', 'TypeScript', 'Dexie.js', 'Markdown', 'TipTap'],
		link: 'https://monograph.pages.dev',
		carouselLength: 7
	},
	// preprocess: {
	// 	title: 'Preprocess',
	// 	content:
	// 		'A web app with a collection of tools to preprocesses multiple types of data. Uses ffmpeg.wasm for audio processing and Tesseract.js for OCR. Built using Svelte and Tailwind.',
	// 	tags: ['Web', 'Svelte', 'TypeScript', 'ffmpeg', 'Tesseract'],
	// 	link: 'https://preprocess.pages.dev',
	// 	carouselLength: 9
	// },
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
		details: [
			'Self-hosted personal cloud storage built with SvelteKit, Drizzle ORM, PostgreSQL, Valkey, and Docker Compose, separating Svelte remote functions for metadata/folder operations from REST endpoints for binary streaming and XHR uploads.',
			'Supports drag-and-drop uploads, virtualized folder browsing, inline file/image previews with LQIP placeholders, bulk ZIP operations, and recoverable trash management.',
			'Secures private and shared access using Argon2 + Oslo session cookies, rate limiting, and permissioned share links (read/write access, expiration dates, public or email-restricted sharing).'
		],
		tags: ['Web', 'Svelte', 'TypeScript', 'PostgreSQL', 'Docker'],
		link: 'https://github.com/PXR05/kotak',
		carouselLength: 3
	},
	// kanade: {
	// 	title: 'Kanade',
	// 	content:
	// 		'A terminal music player written in Go. Manage and play music from a minimal TUI, with support for local libraries, album art, and metadata display.',
	// 	tags: ['Terminal', 'Go', 'Bubble Tea', 'ffmpeg'],
	// 	link: 'https://github.com/PXR05/kanade',
	// 	carouselLength: 3
	// },
	archive: {
		title: 'Archive',
		content:
			'Audio recorder app built in React Native with Expo. Able to record, mark, and transcribe recordings from audio to text',
		details: [
			'Cross-platform mobile audio recorder built with React Native and Expo for capturing voice notes and long-form recordings on device.',
			'Supports timestamped marking during recording and playback to jump directly to key moments.',
			'Integrates Whisper speech-to-text transcription to convert recorded audio into searchable text.'
		],
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

type Contact = {
	label: string;
	value: string;
	username?: string;
	type: 'email' | 'url';
	icon: typeof Mail;
	showInTextHeader?: boolean;
};

export const contacts: Record<string, Contact> = {
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
	X: {
		label: 'X (Twitter)',
		value: 'https://x.com/messages/compose?recipient_id=821337166374547458',
		username: '@pxr_____',
		type: 'url',
		icon: Twitter,
		showInTextHeader: true
	}
};

export const whatsappContact: Contact = {
	label: 'WhatsApp',
	value: 'https://wa.me/628990377159',
	username: '+62 899-0377-159',
	type: 'url',
	icon: MessageCircle,
	showInTextHeader: true
};

export const skills: Record<string, string[]> = {
	Languages: ['TypeScript', 'Python', 'SQL', 'Kotlin', 'PHP', 'Go', 'Java', 'C#', 'C'],
	Frameworks: [
		'SvelteKit',
		'React',
		'React Native',
		'Next.js',
		'ElysiaJS',
		'FastAPI',
		'Laravel',
		'Jetpack Compose'
	],
	Tools: ['Docker', 'Linux', 'GitHub Actions', 'GitLab CI', 'Supabase']
};

export const flatSkills: string[] = Object.values(skills).flat();

export const profile = {
	name: 'William',
	surname: 'Luhur',
	title: 'Software Developer',
	location: 'Jakarta, Indonesia',
	intro:
		'Full-stack software engineer experienced building and operating web, mobile, and backend systems from architecture to deployment. Emphasizes practical architecture, fast iteration, and shipping reliable software under real-world constraints.'
} as const;

export const professionalExperiences: Array<{
	title: string;
	company: string;
	content: string;
	details?: string[];
	period: string;
	link: string;
	relatedProject?: string;
}> = [
	{
		title: 'Software Developer',
		company: 'Siteseeker.id',
		content:
			'Built and maintained the Siteseeker property platform, developing the SvelteKit frontend, contributing to the Laravel backend, and engineering a Python service with an async job queue for an LLM powered location analysis and automated PowerPoint report generation.',
		details: [
			'Built and maintained the Siteseeker SvelteKit web platform with property discovery, interactive Google Maps and nearby POI search, role-based portals for members, listers, and admins, draft autosave, and co-broke workflows.',
			'Contributed to the Laravel REST API covering Sanctum auth, multi-role RBAC middleware, data endpoints, rate limiting, analytics tracking, S3-compatible object storage, and soft-delete restoration.',
			'Architected a containerized FastAPI Python microservice featuring a database-backed async worker pool with renewable job leases, concurrency/rate throttling, and checkpointed retries.',
			'Built a multi-step LLM location analysis and district-cached site brief pipeline grounded with Google Maps and Google Search, combining deterministic rent-fairness statistics with automated PowerPoint deck generation.'
		],
		period: 'February 2026 - Present',
		link: 'https://www.siteseeker.id'
	},
	{
		title: 'IT Consultant',
		company: 'Siteseeker.id',
		content:
			'Diagnosed scalability bottlenecks in a vendor-built WordPress site and led the migration to a decoupled SvelteKit and Laravel stack aligned with team capability and long-term maintainability.',
		details: [
			'Audited the legacy vendor-built WordPress implementation to identify structural scalability, performance, and maintainability bottlenecks as product requirements outgrew CMS constraints.',
			'Designed the target decoupled architecture (SvelteKit frontend, Laravel REST API, and Dockerized services) aligned with the team’s capabilities and long-term operational ownership.',
			'Led the phased migration and technical handoff from WordPress to the new stack, establishing API contracts, deployment workflows, and CI/CD foundations.'
		],
		period: 'October 2025 - February 2026',
		link: 'https://www.siteseeker.id'
	},
	{
		title: 'Software Developer',
		company: 'Orcid Mantis Indonesia',
		content:
			'Designed and built Panopticon, an HR management system with employee and manager workflows for attendance, leave requests, salary records, employee administration, and report exports.',
		details: [
			'Designed and delivered Panopticon, a full-stack SvelteKit, Drizzle ORM, and PostgreSQL HRIS tailored to Indonesian compliance and company operations.',
			'Implemented GPS-geofenced attendance with camera check-in/check-out capture, per-employee schedules, late/overtime detection, multi-approver leave workflows with holiday-aware calculations and anniversary cron jobs, and itemized mileage/receipt reimbursements.',
			'Built an Indonesian payroll engine supporting CSV-driven monthly runs, PPh 21 TER gross/net tax modes with December annualization, BPJS deductions, RBAC, audit logging, and CSV/ZIP report exports.'
		],
		period: 'April 2025 - July 2025',
		link: 'https://www.orcidmantis.co.id'
	}
];

export const education: Array<{
	institution: string;
	degree: string;
	major: string;
	period: string;
	grade: string;
	focus: string;
}> = [
	{
		institution: 'BINUS University',
		degree: "Master's",
		major: 'Computer Science',
		period: 'Sep 2025 - Feb 2027',
		grade: '4.00 / 4.00',
		focus: 'Information Security Management'
	},
	{
		institution: 'BINUS University',
		degree: "Bachelor's",
		major: 'Computer Science',
		period: 'Sep 2022 - Feb 2026',
		grade: '3.90 / 4.00',
		focus: 'Software Engineering'
	}
];

export default {
	projects,
	contacts,
	whatsappContact,
	skills,
	flatSkills,
	profile,
	professionalExperiences,
	education
};
