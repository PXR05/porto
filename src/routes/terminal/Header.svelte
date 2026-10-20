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
	class="border-primary font-term_mono text-primary flex w-full items-center justify-between border-b-2 text-xl font-medium"
>
	<div class="flex items-center">
		<div class="bg-primary mr-3">
			<img
				src="/assets/logo.webp"
				alt="logo"
				class="bg-primary h-10 w-10 [clip-path:inset(5px_5px_5px_6px)]"
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
			class="bg-primary text-primary-foreground grid aspect-square h-full place-items-center text-center text-3xl font-normal no-underline transition-all hover:opacity-75"
		>
			&times;
		</button>
	{/if}
</h1>
