<script lang="ts">
	import type { Snippet } from 'svelte';

	let {
		children
	}: {
		children?: Snippet<[]>;
	} = $props();
</script>

<h1 class="border-b-2 border-primary text-primary font-medium w-full text-xl flex items-center">
	<div class="bg-primary mr-2">
		<img
			src="/assets/logo.webp"
			alt="logo"
			class="w-12 h-12 bg-primary [clip-path:inset(5px_5px_5px_6px)]"
		/>
	</div>
	{#if children}
		{@render children()}
	{/if}
</h1>
