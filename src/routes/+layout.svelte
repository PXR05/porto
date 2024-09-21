<script lang="ts">
	import '../app.css';
	import { type Snippet } from 'svelte';
	import { cn, reverseWipeIn, reverseWipeOut, wipeIn, wipeOut } from '@/lib/utils';
	import { className, duration } from '@/lib/stores';
	import { onNavigate } from '$app/navigation';

	let { children }: { children: Snippet<[]> } = $props();

	let renderCount = $state(0);

	onNavigate(() => {
		renderCount += 1;
	});
</script>

<div class="relative h-svh p-2">
	{#key renderCount}
		<div
			in:wipeIn={{
				duration: $duration / 2,
				delay: $duration * 1.5
			}}
			out:reverseWipeOut={{
				duration: $duration / 2,
				delay: $duration
			}}
			style="--duration: {$duration}ms;"
			class={cn(
				'absolute inset-0 m-auto transition-all overflow-hidden border-2 border-primary h-[calc(100svh-1rem)] md:h-[calc(100svh-10rem)] w-full max-w-3xl flex flex-col',
				renderCount === 0 && 'cont',
				$className
			)}
		>
			<div
				in:wipeOut={{
					duration: $duration / 2,
					delay: $duration * 2
				}}
				out:reverseWipeIn={{
					duration: $duration / 2,
					delay: $duration * 0.5
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

<style>
	.cont {
		clip-path: inset(0 0 100% 0);
		animation: vertical-wipe-in calc(var(--duration) / 2) ease-in-out calc(var(--duration) / 2)
			forwards;
	}
	.screen {
		clip-path: inset(0 0 0 0);
		animation: vertical-wipe-out calc(var(--duration) / 2) ease-in-out var(--duration) forwards;
	}
</style>
