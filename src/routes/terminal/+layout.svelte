<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { className, duration } from '@/lib/stores';
	import { cn, reverseWipeIn, reverseWipeOut, wipeIn, wipeOut } from '@/lib/utils';
	import { onMount, type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	let { children }: { children: Snippet<[]> } = $props();

	let renderCount = $state(0);

	onNavigate(() => {
		renderCount += 1;
	});

	let show = $state(false);
	onMount(() => {
		setTimeout(() => {
			show = true;
		}, $duration * 0.5);
	});
</script>

<svelte:head>
	<title>PXR</title>
</svelte:head>

<div in:fade={{ duration: $duration }} class="contents font-term_sans">
	{#if show}
		<div class="relative mx-2 h-svh w-full">
			{#key renderCount}
				<div
					in:wipeIn={{
						duration: $duration / 2,
						delay: $duration * 0.5
					}}
					out:reverseWipeOut={{
						duration: $duration / 2,
						delay: $duration * 0.5
					}}
					style="--duration: {$duration}ms;"
					class={cn(
						'absolute inset-0 m-auto flex h-[calc(100svh-1rem)] w-full max-w-[80ch] flex-col overflow-hidden border-2 border-primary md:h-[calc(100svh-10rem)]',
						renderCount === 0 && 'cont',
						$className
					)}
				>
					<div
						in:wipeOut={{
							duration: $duration / 2,
							delay: $duration
						}}
						out:reverseWipeIn={{
							duration: $duration / 2
						}}
						class={cn(
							'absolute inset-0 z-50 h-full w-full bg-primary',
							renderCount === 0 ? 'screen' : '[clip-path:inset(0_100%_0_0)]'
						)}
					></div>
					{@render children()}
				</div>
			{/key}
		</div>
	{/if}
</div>

<style>
	.cont {
		clip-path: inset(0 0 100% 0);
		transition-delay: var(--duration);
		transition: all calc(var(--duration) * 0.5) cubic-bezier(0.85, 0, 0.15, 1);
		animation: vertical-wipe-in calc(var(--duration) / 2) cubic-bezier(0.85, 0, 0.15, 1)
			calc(var(--duration) / 2) forwards;
	}

	.screen {
		clip-path: inset(0 0 0 0);
		animation: vertical-wipe-out calc(var(--duration) / 2) cubic-bezier(0.85, 0, 0.15, 1)
			var(--duration) forwards;
	}
</style>
