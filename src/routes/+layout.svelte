<script lang="ts">
	import { onNavigate } from '$app/navigation';
	import { className, duration } from '@/lib/stores';
	import { cn, reverseWipeIn, reverseWipeOut, wipeIn, wipeOut } from '@/lib/utils';
	import { onMount, type Snippet } from 'svelte';
	import '../app.css';
	import ThemeSwitch from '@/lib/components/ThemeSwitch.svelte';

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

{#if show}
	<div class="relative h-svh mx-2">
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
					'absolute inset-0 m-auto overflow-hidden border-2 border-primary h-[calc(100svh-1rem)] md:h-[calc(100svh-10rem)] w-full max-w-3xl flex flex-col',
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
						'z-50 w-full h-full bg-primary absolute inset-0',
						renderCount === 0 ? 'screen' : '[clip-path:inset(0_100%_0_0)]'
					)}
				></div>
				{@render children()}
			</div>
		{/key}
	</div>
{/if}
<div class="absolute right-2 bottom-2">
	<ThemeSwitch />
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
