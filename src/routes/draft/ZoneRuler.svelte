<script lang="ts">
	import { cn } from '$lib/utils';

	let {
		items,
		vertical = false,
		class: className
	}: { items: (string | number)[]; vertical?: boolean; class?: string } = $props();
</script>

<div
	class={cn(
		'border-foreground/40 divide-foreground/40 flex',
		vertical ? 'flex-col divide-y' : 'divide-x',
		className
	)}
>
	{#each items as item}
		<div class="text-foreground/50 grid flex-1 place-items-center text-[0.55rem] select-none">
			{item}
		</div>
	{/each}
</div>
