<script>
	import { innerHeight, innerWidth } from 'svelte/reactivity/window';
	import { fade } from 'svelte/transition';
	import { profile, skills } from '$lib/data';

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

	const isPortrait = $derived((innerWidth?.current ?? 0) / (innerHeight?.current ?? 1) < 1);
</script>

<div
	in:fade={{
		delay: 150,
		duration: 200
	}}
	class="bg-background text-foreground relative flex min-h-dvh w-full items-center justify-center p-6 font-mono
    {isPortrait ? 'flex-col' : 'flex-row'}"
>
	<div
		class="bg-muted border-ring grid aspect-square size-100 place-items-center rounded-3xl border shadow-sm
        {isPortrait ? '-mb-[0.5px]' : '-mr-[0.5px]'}"
	>
		<div class="flex flex-col">
			{#each logoGrid as row}
				<div class="flex">
					{#each row as cell}
						<span class="aspect-square size-3 {cell === 1 && 'bg-foreground'}"> </span>
					{/each}
				</div>
			{/each}
		</div>
	</div>
	<div
		class="bg-muted border-ring relative z-50 flex aspect-square size-100 flex-col items-center rounded-3xl border shadow-sm {isPortrait
			? '-mt-[0.5px]'
			: '-ml-[0.5px]'}"
	>
		<div class="flex w-full items-center justify-between gap-2 px-8 py-6">
			<div class="flex w-full flex-col gap-2">
				<h1 class="text-5xl font-semibold">{profile.name.toUpperCase()}</h1>
				<div class="flex items-end gap-1">
					<span class="text-[0.5rem] font-semibold">
						{profile.location.split(',')[1].toUpperCase()}
					</span>
					<span class="leading-4.5 font-semibold"> {profile.title.toUpperCase()} </span>
				</div>
			</div>
			<a href="/#contacts" class="size-18">
				<img src="/assets/data_matrix.svg" alt="contacts" class="h-full w-full" />
			</a>
		</div>

		<div class="flex w-full justify-between px-5">
			<span class="leading-2"> + </span>
			<span class="leading-2"> + </span>
		</div>

		<div class="grid w-full grid-cols-2 gap-x-8 gap-y-4 px-8 py-6">
			{#each skills.slice(0, 6) as skill, i}
				<p class="flex items-end gap-1 text-xl font-semibold">
					<span class="mb-1 text-xs">
						{i + 1}
					</span>
					{skill.toUpperCase()}
				</p>
			{/each}
		</div>

		<div class="flex w-full justify-between px-5">
			<span class="leading-2"> + </span>
			<span class="leading-2"> + </span>
		</div>

		<div class="flex w-full items-end justify-between px-8 py-6">
			<a href="/text" class="w-full">
				<img src="/assets/pdf417.svg" alt="cv" class="h-12 w-full" />
			</a>
			<p class="text-right font-semibold">PXR</p>
		</div>
	</div>
</div>
