<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children
	}: {
		children?: Snippet<[]>;
	} = $props();
</script>

<h1 class="border-b-2 border-primary text-primary font-medium w-full text-xl flex items-center">
	<img src="/assets/logo.svg" alt="logo" class="w-12 h-12 bg-primary mr-2" />
	{#if children}
		{@render children()}
	{/if}
</h1>
