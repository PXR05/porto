<script lang="ts">
	import { Root, Trigger, Content, Item } from '@/lib/components/ui/dropdown-menu';
	import { Button } from '$lib/components/ui/button';
	import { Cat, Waves, Package } from 'lucide-svelte';
	import { onMount } from 'svelte';
	import { slide } from 'svelte/transition';

	const themes = [
		{
			name: 'default',
			icon: Waves
		},
		{
			name: 'catppuccin',
			icon: Cat
		},
		{
			name: 'gruvbox',
			icon: Package
		}
	];

	let theme = $state('');

	function setTheme(newTheme: string) {
		document.documentElement.classList.remove(...themes.map((t) => t.name));
		document.documentElement.classList.add(newTheme);
		localStorage.setItem('theme', newTheme);
		theme = newTheme;
	}

	onMount(() => {
		const storedTheme = localStorage.getItem('theme') || 'default';
		theme = themes.find((t) => t.name === storedTheme)?.name ?? 'default';
	});
</script>

<Root disableFocusFirstItem={true} closeOnItemClick={false}>
	<Trigger asChild let:builder>
		<Button
			builders={[builder]}
			variant="ghost"
			class="w-[3.1rem] h-[3.1rem] rounded-none border-2 border-primary"
		>
			<span class="grid">
				{#each themes as t (t.name)}
					<t.icon
						strokeWidth={1.5}
						size={20}
						style={theme === t.name ? 'scale: 1' : 'scale: 0'}
						class="col-start-1 row-start-1 transition-all"
					/>
				{/each}
			</span>
			<span class="sr-only">Toggle theme</span>
		</Button>
	</Trigger>
	<Content
		transition={slide}
		transitionConfig={{
			duration: 150,
			axis: 'x'
		}}
		sideOffset={8}
		class="min-w-0 flex w-fit gap-0 rounded-none h-[calc(3.1rem+1px)] p-0 mt-[calc(3.5rem+1px)] -ml-px border-2 border-primary"
	>
		{#each themes as t (t.name)}
			<Item
				onclick={() => setTheme(t.name)}
				class="aspect-square w-full h-full grid place-items-center rounded-none {t.name === theme &&
					'bg-primary text-primary-foreground'}"
			>
				<t.icon strokeWidth={1.5} size={20} />
			</Item>
		{/each}
	</Content>
</Root>
