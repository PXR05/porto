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
			class="font-serif text-4xl break-words sm:text-5xl md:text-6xl"
		>
			and here are my <span class="text-primary"> skillsets </span>
		</h1>
	{/if}
	<div class="flex grid-cols-2 flex-wrap items-center gap-4 max-md:grid md:gap-8">
		{#each skills as skill, i}
			{#if inview}
				<div class="flex items-center gap-4">
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
						class="hover:text-primary font-serif text-xl transition-colors sm:text-2xl"
					>
						{skill}
					</h2>
				</div>
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
	<div class="bg-primary relative aspect-square size-4">
		<span class="bg-background absolute -top-2 -right-2 aspect-square size-4 rounded-full"></span>
		<span class="bg-background absolute -right-2 -bottom-2 aspect-square size-4 rounded-full"
		></span>
		<span class="bg-background absolute -top-2 -left-2 aspect-square size-4 rounded-full"></span>
		<span class="bg-background absolute -bottom-2 -left-2 aspect-square size-4 rounded-full"></span>
	</div>
{/snippet}
