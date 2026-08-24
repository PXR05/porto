<script lang="ts">
	import { contacts, profile } from '@/lib/data';
	import { fade } from 'svelte/transition';
	import { onMount } from 'svelte';
	import { Github } from '@lucide/svelte';

	const nameChars = [...`${profile.name} ${profile.surname}`];
	let levels = $state<number[]>(nameChars.map(() => 1));
	let nameEl = $state<HTMLHeadingElement>(null!);

	onMount(() => {
		if (!matchMedia('(hover: hover) and (pointer: fine)').matches) return;

		let frame = 0;

		function updateLevels(x: number, y: number) {
			nameEl.querySelectorAll('span[data-char]').forEach((span, i) => {
				const rect = span.getBoundingClientRect();
				const dx = x - (rect.left + rect.width / 2);
				const dy = y - (rect.top + rect.height / 2);
				const distance = Math.hypot(dx, dy * 3.5);
				levels[i] = Math.min(5, Math.max(0, 6 - Math.ceil(distance / 20)));
			});
		}

		function onMouseMove(event: MouseEvent) {
			if (frame) return;
			frame = requestAnimationFrame(() => {
				frame = 0;
				updateLevels(event.clientX, event.clientY);
			});
		}

		window.addEventListener('mousemove', onMouseMove);
		return () => {
			window.removeEventListener('mousemove', onMouseMove);
			cancelAnimationFrame(frame);
		};
	});
</script>

<div
	in:fade={{ delay: 150, duration: 200 }}
	class="font-term_sans mx-auto flex min-h-dvh max-w-2xl flex-col justify-center gap-6 p-8 tracking-tighter select-text [word-spacing:-0.2em]"
>
	<h1 bind:this={nameEl} class="font-t_styled text-5xl">
		{#each nameChars as char, i}
			<span data-char style:white-space="pre" style:font-feature-settings={`'ss0${levels[i]}'`}
				>{char}</span
			>
		{/each}
	</h1>

	<p class="text-rust hover:font-term_mono w-fit text-lg font-medium hover:tracking-[-0.0865em]">
		{profile.title}
	</p>

	<p class="max-w-prose leading-relaxed">
		I'm a software developer building things for the web, from small tools to full products.
	</p>

	<p class="max-w-prose leading-relaxed">
		Most of my work uses
		<span class="text-mustard hover:font-term_mono font-medium hover:tracking-[-0.0865em]">
			Svelte
		</span>
		and
		<span class="text-teal hover:font-term_mono font-medium hover:tracking-[-0.0865em]">
			TypeScript
		</span>, branching into other technologies like Go, Python, or mobile when a project calls for
		it.
	</p>

	<div aria-hidden="true" class="mt-2 flex h-1.5 w-full">
		<div class="bg-rust flex-1"></div>
		<div class="bg-mustard flex-1"></div>
		<div class="bg-teal flex-1"></div>
	</div>

	<footer class="border-border mt-2 flex flex-wrap gap-x-6 gap-y-1">
		{#each [{ label: 'GitHub', value: 'https://github.com/PXR05', type: 'url' }, ...Object.values(contacts)] as contact}
			<a
				href={contact.type === 'email' ? `mailto:${contact.value}` : contact.value}
				target={contact.type === 'url' ? '_blank' : undefined}
				rel={contact.type === 'url' ? 'noopener noreferrer' : undefined}
				class="hover:text-primary hover:font-term_mono underline-offset-4 transition-colors hover:tracking-[-0.0865em] hover:underline"
			>
				{contact.label}
			</a>
		{/each}
	</footer>
</div>
