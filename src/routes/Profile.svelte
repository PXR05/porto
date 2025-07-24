<script lang="ts">
	import { profile } from '@/lib/data';
	import { fly } from 'svelte/transition';

	let {
		inview
	}: {
		inview: boolean;
	} = $props();
</script>

<div class="flex flex-col gap-2">
	{#if inview}
		<h1
			in:fly={{
				delay: 250,
				duration: 300,
				y: -50
			}}
			class="font-serif text-6xl"
		>
			hi, i'm {profile.name}
		</h1>
		<h2
			in:fly={{
				delay: 1000,
				duration: 300,
				y: 50
			}}
			class="font-serif text-4xl text-primary"
		>
			a {profile.title}
		</h2>
	{/if}
</div>
