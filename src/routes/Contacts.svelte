<script lang="ts">
	import { contacts } from '@/lib/data';
	import { fly } from 'svelte/transition';

	let {
		inview
	}: {
		inview: boolean;
	} = $props();
</script>

<div class="col-[1/1] row-[1/1] flex w-full max-w-screen-xl flex-col gap-12 md:gap-16">
	{#if inview}
		<h1
			in:fly={{ delay: 250, duration: 300, y: 50 }}
			class="break-words font-serif text-4xl sm:text-5xl md:text-6xl"
		>
			<span class="text-primary"> contact </span> me through these platforms
		</h1>
	{/if}
	<div class="grid gap-8 md:gap-12">
		{#each Object.entries(contacts).map( ([key, value]) => ({ label: key, link: key === 'Email' ? `mailto:${value}` : value, content: value
						.split('/')
						.pop() }) ) as { label, link, content }, i}
			<a
				href={link}
				target="_blank"
				rel="noopener noreferrer"
				class="group flex items-center gap-4"
			>
				{#if inview}
					<div
						in:fly={{
							delay: 500 + 100 * i,
							duration: 300,
							x: -50
						}}
						class="relative aspect-square size-4 bg-primary"
					>
						<span class="absolute -right-2 -top-2 aspect-square size-4 rounded-full bg-background"
						></span>
						<span
							class="absolute -bottom-2 -right-2 aspect-square size-4 rounded-full bg-background"
						></span>
						<span class="absolute -left-2 top-[-0.575rem] aspect-square size-4 bg-background"
						></span>
						<span class="absolute -left-2 bottom-[-0.575rem] aspect-square size-4 bg-background"
						></span>
					</div>
					<h2
						in:fly={{
							delay: 600 + 100 * i,
							duration: 300,
							x: -50
						}}
						class="flex w-full justify-between border-b-2 border-transparent font-serif text-2xl sm:text-3xl transition-colors group-hover:border-primary max-md:flex-col md:items-center md:text-4xl"
					>
						<span>
							{label}
						</span>
						<span class="text-lg md:text-xl">
							{content}
						</span>
					</h2>
				{/if}
			</a>
		{/each}
	</div>
</div>
