<script lang="ts">
	import { className, cmdHistory, duration, skip } from '@/lib/stores';
	import * as HoverCard from '@/lib/components/ui/hover-card';
	import { highlight } from '@/lib/highlight';
	import 'highlight.js/styles/atom-one-dark.min.css';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';
	import Header from './Header.svelte';
	import { contacts, projects as pr, profile, skills } from '@/lib/data';

	const projects = Object.entries(pr).map(([key, value]) => ({
		link: `/projects/${key}`,
		content: value.title,
		hover:
			"<div class='flex flex-col gap-4'>" +
			"<a class='w-full flex items-center gap-4' href='/projects/" +
			key +
			"'>" +
			"<img src='/assets/" +
			key +
			"_logo.webp' alt='banner' class='border-2 border-primary object-cover w-10 h-10' />" +
			"<h3 class='text-xl font-medium font-mono text-primary'>" +
			value.title +
			'</h3>' +
			'</a>' +
			'<p>' +
			value.content +
			'</p>' +
			'</div>'
	}));

	let sections = $state([
		{
			cmd: 'cat name.txt',
			type: 'text',
			content: profile.name
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
			cmd: "grep -E 'email|wa|linkedin|github|x' socials.txt",
			type: 'links',
			content: Object.entries(contacts).map(([key, value]) => ({
				link: key === 'Email' ? `mailto:${value}` : value,
				content: key
			}))
		},
		{
			cmd: 'sort -k 2 skillset.txt',
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
			container.scrollTo({
				top: container.scrollHeight
			});
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
				<span class="cmd flex flex-wrap items-center">
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
							{@const l = link as { link: string; content: string; hover?: string }}
							<HoverCard.Root openDelay={150} closeDelay={50}>
								<p>
									"<a href={l.link} class="text-lg">
										<HoverCard.Trigger class="">
											{l.content}
										</HoverCard.Trigger>
									</a>"{#if i !== section.content.length - 1},
									{/if}&nbsp;
								</p>
								{#if l.hover}
									<HoverCard.Content
										class="mt-0 rounded-none border-2 border-primary bg-background p-4"
									>
										{@html l.hover}
									</HoverCard.Content>
								{/if}
							</HoverCard.Root>
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
