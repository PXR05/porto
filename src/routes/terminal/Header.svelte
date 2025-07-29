<script lang="ts">
	import { goto } from '$app/navigation';
	import { page } from '$app/state';
	import { skip } from './stores';
	import type { Snippet } from 'svelte';

	let {
		children
	}: {
		children?: Snippet<[]>;
	} = $props();
</script>

<h1
	class="flex w-full items-center justify-between border-b-2 border-primary font-term_mono text-xl font-medium text-primary"
>
	<div class="flex items-center">
		<div class="mr-3 bg-primary">
			<img
				src="/assets/logo.webp"
				alt="logo"
				class="h-10 w-10 bg-primary [clip-path:inset(5px_5px_5px_6px)]"
			/>
		</div>
		{#if children}
			{@render children()}
		{/if}
	</div>
	{#if page.url.pathname !== '/terminal'}
		<button
			onclick={() => {
				skip.set(true);
				goto('/terminal');
			}}
			class="grid aspect-square h-full place-items-center bg-primary text-center text-3xl font-normal text-primary-foreground no-underline transition-all hover:opacity-75"
		>
			&times;
		</button>
	{/if}
</h1>
