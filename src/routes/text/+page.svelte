<script lang="ts">
	import { contacts, profile, projects, skills } from '@/lib/data';
	import { innerWidth } from 'svelte/reactivity/window';
	import { fade } from 'svelte/transition';

	const titles = $derived([
		createTitle('PROFILE'),
		createTitle('PROJECTS'),
		createTitle('SKILLSET'),
		createTitle('CONTACTS')
	]);

	const hr = $derived(
		'-'.repeat(innerWidth.current ? Math.min(25, (innerWidth.current - 100) / 11) : 60)
	);

	function createTitle(title: string) {
		const length = innerWidth.current ? Math.min(72, (innerWidth.current - 100) / 11) : 70;
		const sideLength = (length - title.length - 2) / 2;
		return `${'='.repeat(sideLength)} ${title} ${'='.repeat(sideLength)}`;
	}
</script>

<div
	in:fade={{
		delay: 150,
		duration: 200
	}}
>
	<pre
		class="mx-auto min-h-screen max-w-[80ch] select-text whitespace-pre-wrap p-8 font-txt_mono font-normal">
{titles[0]}

Name:     {profile.name}
Title:    {profile.title}
Location: {profile.location}
Intro:    {profile.intro}

{titles[1]}
{@html Object.values(projects)
			.map(
				(p) => `
<a href=${p.link}>${p.title}</a>
${hr}
${p.content}
Tags: ${p.tags.map((t) => `[${t}]`).join(' ')}
Link: <a href=${p.link}>${p.link}</a>`
			)
			.join('\n')}

{titles[2]}

{skills.map((s) => `- ${s}`).join('\n')}

{titles[3]}

{@html Object.entries(contacts)
			.map(
				([key, value]) =>
					`- ${key}: <a href="${key === 'Email' ? 'mailto:' : ''}${value}">${value}</a>`
			)
			.join('\n')}
</pre>
</div>
