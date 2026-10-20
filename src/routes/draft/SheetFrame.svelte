<script lang="ts">
	import type { Snippet } from 'svelte';
	import ZoneRuler from './ZoneRuler.svelte';

	let { children }: { children: Snippet } = $props();

	const zoneNumbers = [1, 2, 3, 4, 5, 6];
	const zoneLetters = ['A', 'B', 'C', 'D'];
</script>

<div class="draftpaper text-foreground h-dvh w-full overflow-hidden font-mono select-text">
	<div class="grid h-full grid-cols-[1.3rem_1fr_1.3rem] grid-rows-[1.3rem_minmax(0,1fr)_1.3rem]">
		<div></div>
		<ZoneRuler items={zoneNumbers} class="border-b" />
		<div></div>

		<ZoneRuler items={zoneLetters} vertical class="border-r" />
		<div class="flex min-h-0 min-w-0 flex-col">
			{@render children()}
		</div>
		<ZoneRuler items={zoneLetters} vertical class="border-l" />
		<div></div>

		<ZoneRuler items={zoneNumbers} class="border-t" />
		<div></div>
	</div>
</div>

<style>
	.draftpaper {
		background-color: var(--background);
		background-image:
			radial-gradient(
				130% 110% at 42% 28%,
				color-mix(in srgb, hsl(28 50% 90%) 65%, transparent),
				transparent 100%
			),
			radial-gradient(
				115% 115% at 85% 90%,
				color-mix(in srgb, hsl(28 35% 25%) 36%, transparent),
				transparent 100%
			);
		background-size:
			100% 100%,
			100% 100%;
	}
</style>
