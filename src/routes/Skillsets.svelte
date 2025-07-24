<script lang="ts">
	import { skills } from '@/lib/data';
	import { fade, fly } from 'svelte/transition';

	let {
		inview
	}: {
		inview: boolean;
	} = $props();
</script>

<div class="col-[1/1] row-[1/1] flex w-full max-w-screen-xl flex-col gap-8 md:gap-16">
	{#if inview}
		<h1
			in:fly={{ delay: 250, duration: 300, y: 50 }}
			class="break-words font-serif text-4xl sm:text-5xl md:text-6xl"
		>
			and here are my <span class="text-primary"> skillsets </span>
		</h1>
	{/if}
	<div class="flex grid-cols-[auto,1fr,auto,1fr] flex-wrap items-center gap-4 max-md:grid md:gap-8">
		{#each skills as skill, i}
			{#if inview}
				<div
					in:fade={{
						delay: 500 + 50 * (Math.random() * skills.length),
						duration: 300
					}}
				>
					{@render star()}
				</div>
				<h2
					in:fade={{
						delay: 500 + 50 * (Math.random() * skills.length),
						duration: 300
					}}
					class="font-serif text-xl transition-colors hover:text-primary sm:text-2xl"
				>
					{skill}
				</h2>
				{#if i === skills.length - 1}
					<div
						class="max-md:hidden"
						in:fade={{
							delay: 500 + 50 * (Math.random() * skills.length),
							duration: 300
						}}
					>
						{@render star()}
					</div>
				{/if}
			{/if}
		{/each}
	</div>
</div>

{#snippet star()}
	<div class="relative aspect-square h-4 w-4 bg-primary">
		<span class="absolute -right-2 -top-2 aspect-square h-4 w-4 rounded-full bg-background"></span>
		<span class="absolute -bottom-2 -right-2 aspect-square h-4 w-4 rounded-full bg-background"
		></span>
		<span class="absolute -left-2 -top-2 aspect-square h-4 w-4 rounded-full bg-background"></span>
		<span class="absolute -bottom-2 -left-2 aspect-square h-4 w-4 rounded-full bg-background"
		></span>
	</div>
{/snippet}
