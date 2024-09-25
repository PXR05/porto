<script lang="ts">
	import { className, cmdHistory, duration, skip } from '@/lib/stores';
	import { highlight } from '@/lib/highlight';
	import 'highlight.js/styles/atom-one-dark.min.css';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import Header from './Header.svelte';
	import { contacts, projects as pr, profile, skills } from '@/lib/data';

	const projects = Object.entries(pr).map(([key, value]) => ({
		link: `/projects/${key}`,
		content: value.title
	}));

	const diff = Date.now() - new Date(import.meta.env.VITE_BIRTHDATE).getTime();

	let sections = $state([
		{
			cmd: 'cat name.txt',
			type: 'text',
			content: profile.name
		},
		{
			cmd: 'cat age.txt',
			type: 'text',
			content: new Date(diff).getFullYear() - 1970 + ''
		},
		{
			cmd: 'cat location.txt',
			type: 'text',
			content: profile.location
		},
		{
			cmd: 'cat intro.txt',
			type: 'text',
			content: profile.intro
		},
		{
			cmd: "grep -E 'email|wa|github' contacts.txt",
			type: 'links',
			content: Object.entries(contacts).map(([key, value]) => ({
				link: key === 'Email' ? `mailto:${value}` : value,
				content: key
			}))
		},
		{
			cmd: 'sort -k 2 skills.txt',
			type: 'list',
			content: skills
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
			cmd: 'ls <a>projects</a>',
			type: 'links',
			content: projects
		}
	]);

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
		if (container) {
			container.style.pointerEvents = 'auto';
		}
	}

	function handleAnimationStart() {
		if ($skip) return;
		scrollBottom(true);
	}

	function handleAnimationEnd(i: number) {
		if (i === sections.length - 1 && !$skip && !done) {
			done = true;
			skip.set(true);
			if (container) {
				container.style.pointerEvents = 'auto';
			}
		}
	}

	// let value = $state('');
	// function handleSubmit(
	// 	e: SubmitEvent & {
	// 		currentTarget: EventTarget & HTMLFormElement;
	// 	}
	// ) {
	// 	e.preventDefault();
	// 	if (!value || value.trim() === '') return;
	// 	cmdHistory.update((h) => [...h, value]);
	// 	// @ts-ignore
	// 	if (projects.some((c) => c.content.toLowerCase() === value.toLowerCase())) {
	// 		goto(`/projects/${value.toLowerCase()}`);
	// 	} else {
	// 		sections.push({
	// 			cmd: 'view ' + value,
	// 			type: 'text',
	// 			content: `view: ${value}: No such project found.`
	// 		});
	// 		value = '';
	// 		setTimeout(() => {
	// 			scrollBottom(true);
	// 		}, 0);
	// 	}
	// }

	$effect(() => {
		if ($skip) {
			handleSkip();
		}
	});

	onMount(() => {
		setTimeout(() => {
			show = true;
		}, $duration * 1.5);

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
			skip.set(true);
			done = true;
			sections = sections.concat(history);
			setTimeout(() => {
				scrollBottom(true);
			}, 0);
		}
	});
</script>

<svelte:head>
	<title>PXR</title>
</svelte:head>

<Header>PXR</Header>
<div
	bind:this={container}
	style="pointer-events: none;"
	class="custom-scroll flex h-full flex-col gap-8 overflow-scroll p-4"
>
	{#if show}
		{#each sections as section, i}
			<h2
				class="flex flex-wrap items-center justify-between text-lg font-medium text-white"
				style={$skip
					? ''
					: `height: 0; opacity: 0; animation: snap-in ${$duration / 2}ms ${
							i * $duration * 2.5
						}ms forwards;`}
			>
				<span class="cmd flex items-center flex-wrap">
					&gt;&nbsp;
					{@html highlight(section.cmd).join('')}
				</span>
			</h2>
			<div
				onanimationstart={handleAnimationStart}
				onanimationend={() => handleAnimationEnd(i)}
				class="mx-5 {i === sections.length - 1 && 'mb-8'}"
				style={$skip
					? ''
					: `height: 0; opacity: 0; animation: snap-in ${$duration / 2}ms ${
							i * $duration * 2.5 + $duration / 2
						}ms forwards;`}
			>
				{#if section.type === 'text'}
					<p class="text-lg text-muted-foreground">
						"<span class="text-foreground">{@html section.content}</span>"
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
{#if !$skip && !done}
	<button
		out:slide={{
			axis: 'y',
			duration: $duration / 4
		}}
		class="absolute bottom-0 grid w-full place-items-center bg-primary p-2 text-xl font-medium text-primary-foreground transition-all hover:opacity-75"
		onclick={() => skip.set(true)}
	>
		<span class="scale-x-150"> ▼ </span>
	</button>
{/if}

<!-- 
{#if done}
	<form
		transition:slide={{
			axis: 'y',
			duration: $duration / 4,
			delay: $duration / 4
		}}
		onsubmit={handleSubmit}
		class="absolute bottom-0 flex h-12 w-full items-center border-t-2 border-primary bg-background px-5 text-lg font-medium text-white"
	>
		&gt;&nbsp;
		<span class="hljs-built_in"> view </span>
		&nbsp;
		<input
			bind:value
			autofocus
			id="project"
			name="project"
			placeholder="project_name"
			class="w-full border-none bg-transparent text-lg text-foreground outline-none {value.trim()
				.length > 0 && 'underline'}"
			type="text"
		/>
	</form>
{/if} -->

<style>
	/* :global(.cmd > *) {
		display: none;
	} */
</style>
