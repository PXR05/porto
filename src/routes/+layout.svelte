<script lang="ts">
	import { page } from '$app/state';
	import { Circle, Sparkle, TerminalSquare, Waves } from 'lucide-svelte';
	import '../app.css';
	import Splash from './Splash.svelte';
	import { browser } from '$app/environment';

	let { children } = $props();

	let showSplash = $state(true);

	const themes = [
		{
			name: 'serif',
			icon: Circle
		},
		{
			name: 'ocean',
			icon: Waves
		}
	];

	function setTheme(newTheme: string) {
		document.documentElement.classList.remove(...themes.map((t) => t.name));
		document.documentElement.classList.add(newTheme);
		localStorage.setItem('theme', newTheme);
	}

	$effect(() => {
		if (!browser) return;
		if (page.url.pathname === '/') {
			setTheme('serif-default');
		} else if (page.url.pathname.startsWith('/terminal')) {
			setTheme('ocean');
		}
	});
</script>

<svelte:head>
	<title>PXR {page.url.hash && '|'} {page.url.hash.substring(1)}</title>
</svelte:head>

<div class="relative min-h-svh place-items-center">
	{#if showSplash}
		<Splash
			onanimationend={(e) => {
				if (e === 'hide') {
					showSplash = false;
				}
			}}
		/>
	{:else}
		{@render children()}
	{/if}

	{#if page.url.pathname.startsWith('/terminal')}
		<a href="/" class="fixed bottom-4 left-4 z-10 p-2">
			<Sparkle strokeWidth={1.5} />
		</a>
	{:else}
		<a href="/terminal" class="fixed bottom-4 left-4 z-10 p-2">
			<TerminalSquare strokeWidth={1.5} />
		</a>
	{/if}
</div>
