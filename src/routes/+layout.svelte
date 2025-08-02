<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { Button } from '$lib/components/ui/button';
	import * as DropdownMenu from '$lib/components/ui/dropdown-menu';
	import { FileText, Sparkle, TerminalSquare } from '@lucide/svelte';
	import '../app.css';
	import Splash from './Splash.svelte';
	import { capitalizeFirstLetter } from '@/lib/utils';

	let { children } = $props();

	let showSplash = $state(true);

	const routes = [
		{
			name: 'Default',
			path: '/',
			theme: 'serif-default',
			icon: Sparkle
		},
		{
			name: 'Terminal',
			path: '/terminal',
			theme: 'ocean',
			icon: TerminalSquare
		},
		{
			name: 'Text',
			path: '/text',
			theme: 'text',
			icon: FileText
		}
	];

	function setTheme(newTheme: string) {
		document.documentElement.classList.remove(...routes.map((t) => t.theme));
		document.documentElement.classList.add(newTheme);
		localStorage.setItem('theme', newTheme);
	}

	let currentRoute = $derived(
		routes.find((r) => r.path === '/' + page.url.pathname.split('/')[1]) || routes[0]
	);

	$effect(() => setTheme(currentRoute.theme));
</script>

<svelte:head>
	<title>PXR {page.url.hash && '|'} {capitalizeFirstLetter(page.url.hash.substring(1))}</title>
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

	<div id="bottom-left" class="fixed bottom-4 left-4 z-10">
		<DropdownMenu.Root>
			<DropdownMenu.Trigger>
				<Button variant="outline" size="icon">
					<currentRoute.icon strokeWidth={1.5} />
				</Button>
			</DropdownMenu.Trigger>
			<DropdownMenu.Content align="center" side="top" class="w-fit min-w-0 py-0">
				{#each routes as route}
					<DropdownMenu.Item onclick={() => goto(route.path)} class="my-1 size-8 w-fit">
						<route.icon strokeWidth={1.5} />
					</DropdownMenu.Item>
				{/each}
			</DropdownMenu.Content>
		</DropdownMenu.Root>
	</div>
</div>
