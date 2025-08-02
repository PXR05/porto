<script lang="ts">
	import { onMount } from 'svelte';

	let {
		onanimationend
	}: {
		onanimationend: (event: 'show' | 'hide') => void;
	} = $props();

	const logoGrid = [
		[1, 1, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 0, 0],
		[1, 1, 1, 0, 1, 1, 1, 1, 1, 1, 1, 0, 0, 0],
		[0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
		[0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
		[0, 1, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 0],
		[1, 1, 0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 1, 1, 1, 0, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 1, 1, 1, 0, 0, 0, 1, 1],
		[1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0, 1, 1],
		[0, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 1, 0],
		[0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0, 0],
		[0, 0, 1, 1, 1, 0, 0, 0, 0, 0, 1, 1, 1, 0],
		[0, 0, 0, 1, 1, 1, 1, 1, 1, 1, 0, 1, 1, 1],
		[0, 0, 0, 0, 0, 1, 1, 1, 1, 0, 0, 0, 1, 1]
	];
	const logoSize = logoGrid.length;

	let grid = $state(Array(logoSize).fill(Array(logoSize).fill(false)));

	async function animateLogo(type: 'show' | 'hide' = 'show') {
		interactive = false;

		const cellsToAnimate = [];
		for (let i = 0; i < logoSize; i++) {
			for (let j = 0; j < logoSize; j++) {
				if (logoGrid[i][j] === 1) {
					cellsToAnimate.push([i, j]);
				}
			}
		}

		cellsToAnimate.sort(() => Math.random() - 0.5);

		for (const [i, j] of cellsToAnimate) {
			grid[i][j] = type === 'show';
			await new Promise((resolve) => requestAnimationFrame(resolve));
		}

		interactive = true;
		onanimationend(type);
	}

	let interactive = $state(false);

	onMount(() => {
		animateLogo('show').then(() => {
			setTimeout(() => {
				animateLogo('hide');
			}, 300);
		});
	});

	function handleScroll(
		e: WheelEvent & {
			currentTarget: EventTarget & Window;
		}
	) {
		e.stopPropagation();
		if (e.deltaY > 0) {
			animateLogo('hide');
		}
	}
</script>

<svelte:window onwheel={(e) => handleScroll(e)} />

<button
	class="bg-background absolute inset-0 grid h-full w-full place-items-center {!interactive &&
		'pointer-events-none'}"
	onclick={() => animateLogo('hide')}
	onkeydown={(e) => {
		if (e.key === 'Enter') {
			animateLogo('hide');
		}
	}}
>
	<div class="flex flex-col">
		{#each grid as row}
			<div class="flex">
				{#each row as cell}
					<span class="aspect-square size-6 {cell && 'bg-foreground'}"> </span>
				{/each}
			</div>
		{/each}
	</div>
</button>
