<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/stores';
	import { className, cmdHistory, duration } from '@/lib/stores';
	import { highlight } from '@/lib/highlight';
	import 'highlight.js/styles/atom-one-dark.min.css';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	const projects = [
		{
			link: '/projects/yorishiro',
			content: 'Yorishiro'
		},
		{
			link: '/projects/monograph',
			content: 'Monograph'
		},
		{
			link: '/projects/binary',
			content: 'Binary'
		},
		{
			link: '/projects/neiro',
			content: 'Neiro'
		},
		{
			link: '/projects/archive',
			content: 'Archive'
		}
	];

	let sections = $state([
		{
			cmd: 'cat profile.txt',
			type: 'text',
			content: 'William Luhur'
		},
		{
			cmd: 'cat intro.txt',
			type: 'text',
			content:
				'Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla nec purus feugiat, vestibulum mi id, ultricies turpis. Nulla facilisi. Nullam nec nunc nec nunc.'
		},
		{
			cmd: "grep -E 'email|wa|github' contacts.txt",
			type: 'links',
			content: [
				{
					link: 'mailto:pxr2709@gmail.com',
					content: 'Email'
				},
				{
					link: 'https://wa.me/qr/RN4FDCJ6YPQVD1',
					content: 'WhatsApp'
				},
				{
					link: 'https://github.com/PXR05',
					content: 'Github'
				}
			]
		},
		{
			cmd: 'sort -k 2 skills.txt',
			type: 'list',
			content: [
				'C',
				'C#',
				'CSS',
				'Dart',
				'Go',
				'HTML',
				'Java',
				'JavaScript',
				'Python',
				'TypeScript',
				'Expo',
				'Flutter',
				'Next.js',
				'Node.js',
				'React',
				'React Native',
				'Svelte',
				'Unity',
				'Godot',
				'Git',
				'Linux',
				'SQL'
			]
		},
		// {
		// 	cmd: 'ls certificates | sort',
		// 	type: 'links',
		// 	content: [
		// 		{
		// 			link: '/certificates/a',
		// 			content: 'A'
		// 		},
		// 		{
		// 			link: '/certificates/b',
		// 			content: 'B'
		// 		},
		// 		{
		// 			link: '/certificates/c',
		// 			content: 'C'
		// 		},
		// 		{
		// 			link: '/certificates/d',
		// 			content: 'D'
		// 		},
		// 		{
		// 			link: '/certificates/e',
		// 			content: 'E'
		// 		}
		// 	]
		// },
		{
			cmd: 'ls projects',
			type: 'links',
			content: projects
		}
	]);

	let skip = $state(false);
	let show = $state(false);
	let done = $state(false);
	let container = $state<HTMLDivElement>();

	function scrollBottom(instant = false) {
		if (container) {
			container.scrollTo({
				top: container.scrollHeight,
				behavior: instant ? 'instant' : 'smooth'
			});
		}
	}

	function handleSkip() {
		show = true;
		done = true;
		skip = true;
		if (container) {
			container.style.pointerEvents = 'auto';
		}
	}

	function handleAnimationStart() {
		if (skip) return;
		scrollBottom();
	}

	function handleAnimationEnd(i: number) {
		if (i === sections.length - 1 && !skip && !done) {
			done = true;
			if (container) {
				container.style.pointerEvents = 'auto';
			}
		}
	}

	let value = $state('');
	function handleSubmit(
		e: SubmitEvent & {
			currentTarget: EventTarget & HTMLFormElement;
		}
	) {
		e.preventDefault();
		if (!value || value.trim() === '') return;
		cmdHistory.update((h) => [...h, value]);
		// @ts-ignore
		if (projects.some((c) => c.content.toLowerCase() === value.toLowerCase())) {
			goto(`/projects/${value.toLowerCase()}`);
		} else {
			sections.push({
				cmd: 'view ' + value,
				type: 'text',
				content: `view: ${value}: No such project found.`
			});
			value = '';
			setTimeout(() => {
				scrollBottom();
			}, 0);
		}
	}

	onMount(() => {
		setTimeout(() => {
			show = true;
		}, $duration * 2);
		className.set('');
		const history = $cmdHistory.map((h) => ({
			cmd: 'view ' + h,
			type: 'text',
			// @ts-ignore
			content: projects.some((c) => c.content.toLowerCase() === h.toLowerCase())
				? `Opening project ${h}...`
				: `view: ${h}: No such project found.`
		}));
		if (history.length > 0) {
			sections = sections.concat(history);
			setTimeout(() => {
				scrollBottom(true);
			}, 0);
		}
	});

	$effect(() => {
		if ($page.url.searchParams.has('skip')) {
			handleSkip();
		}
	});
</script>

<h1 class="border-b-2 border-primary text-primary w-full text-xl font-semibold p-2">PXR</h1>
{#if !skip && !done}
	<button
		class="absolute bottom-0 right-0 px-2 h-11 bg-primary text-primary-foreground hover:opacity-75 transition-all grid place-items-center"
		onclick={handleSkip}
	>
		SKIP
	</button>
{/if}
<div
	bind:this={container}
	style="pointer-events: none;"
	class="h-full p-4 overflow-scroll flex flex-col gap-8"
>
	{#if show}
		{#each sections as section, i}
			<h2
				style={skip
					? ''
					: `height: 1rem; clip-path: inset(0 100% 0 0); animation: snap-in ${$duration / 2}ms ${
							i * $duration * 2.5
						}ms forwards;`}
				class="text-lg font-medium flex flex-wrap items-center text-white"
			>
				&gt;&nbsp;
				{@html highlight(section.cmd).join('')}
			</h2>
			<div
				style={skip
					? ''
					: `height: 1rem; clip-path: inset(0 100% 0 0); animation: snap-in ${$duration / 2}ms ${
							i * $duration * 2.5 + $duration / 2
						}ms forwards;`}
				class="mx-5 {i === sections.length - 1 && 'mb-16'}"
				onanimationstart={handleAnimationStart}
				onanimationend={() => handleAnimationEnd(i)}
			>
				{#if section.type === 'text'}
					<p class="text-lg text-muted-foreground">
						"<span class="text-foreground">{section.content}</span>"
					</p>
				{/if}
				{#if section.type === 'links'}
					<div class="flex flex-wrap items-center text-muted-foreground">
						[
						{#each section.content as link, i}
							{@const l = link as { link: string; content: string }}
							<p title={l.link}>
								"<a href={l.link} class="text-lg">{l.content}</a
								>"{#if i !== section.content.length - 1},
								{/if}&nbsp;
							</p>
						{/each}
						]
					</div>
				{/if}
				{#if section.type === 'list'}
					<div class="flex flex-wrap items-center text-muted-foreground">
						[
						{#each section.content as item, i}
							<p class="text-lg">
								"<span class="text-foreground">{item}</span>"{i !== section.content.length - 1
									? ','
									: ''}&nbsp;
							</p>
						{/each}
						]
					</div>
				{/if}
			</div>
		{/each}
	{/if}
</div>
{#if done}
	<form
		transition:slide={{
			axis: 'y',
			duration: 150
		}}
		onsubmit={handleSubmit}
		class="absolute bottom-0 box-border px-5 py-2 w-full border-t-2 border-primary text-lg font-medium flex items-center text-white bg-background"
	>
		&gt;&nbsp;
		<span class="hljs-built_in"> view </span>
		&nbsp;
		<!-- svelte-ignore a11y_autofocus -->
		<input
			bind:value
			autofocus
			id="project"
			name="project"
			placeholder="project_name"
			class="w-full text-foreground border-none text-lg outline-none bg-transparent {value.trim()
				.length > 0 && 'underline'}"
			type="text"
		/>
	</form>
{/if}
