<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { duration } from '#/routes/terminal/stores.ts';
	import { cn, reverseWipeIn, reverseWipeOut, wipeIn, wipeOut } from '#lib/utils.ts';
	import { type Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	let { children }: { children: Snippet<[]> } = $props();

	let renderCount = $state(0);

	onNavigate((e) => {
		if (e.shallow && e.type === 'goto') return;

		const { from, to } = e;
		if (from?.url.pathname === to?.url.pathname) {
			return;
		}
		renderCount += 1;
	});
</script>

<svelte:head>
	<title>PXR</title>
</svelte:head>

<div in:fade={{ duration: $duration }} class="font-term_sans contents">
	<div class="relative h-svh w-full">
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
					'border-primary absolute inset-0 m-auto flex h-[calc(100svh-1rem)] w-full max-w-[80ch] flex-col overflow-hidden border-2 md:h-[calc(100svh-10rem)] md:max-w-[90vw]'
				)}
				class:cont={renderCount === 0}
			>
				<div
					in:wipeOut={{
						duration: $duration / 2,
						delay: $duration / 2
					}}
					out:reverseWipeIn={{
						duration: $duration / 2
					}}
					class={cn('bg-primary absolute inset-0 z-50 h-full w-full')}
					class:screen={renderCount === 0}
					class:clipped={renderCount > 0}
				></div>
				{@render children()}
			</div>
		{/key}
	</div>
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

	.clipped {
		clip-path: inset(0 100% 0 0);
	}
</style>
