<script lang="ts">
	import type { Snippet } from 'svelte';
	import '../app.css';

	let { children }: { children: Snippet<[]> } = $props();
</script>


<div class="grid place-items-center h-svh p-2">
{@render children()}
</div>
