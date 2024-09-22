<script>
	import { onMount } from 'svelte';
	import Header from '../Header.svelte';
	import { projects } from '@/lib/projects';
	import { className } from '@/lib/stores';

	onMount(() => {
		className.set('md:max-w-[90vw]');
	});
</script>

<Header>
	<span> PXR/ </span>
	<span class="font-semibold underline"> Projects </span>
</Header>
<div class="m-auto flex h-fit w-fit flex-col justify-center gap-4">
	<h2 class="text-xl">
		You're not supposed to be here. <br /> You're probably looking for one of these:
	</h2>
	<div class="grid gap-2">
		{#each Object.keys(projects) as proj}
			<div>
				+
				<a href="/projects/{proj}" class="text-base font-semibold text-primary">
					{proj.charAt(0).toUpperCase() + proj.slice(1)}
				</a>
			</div>
		{/each}
	</div>
	<p>
		Or you can go back to the <a href="/">home page</a>.
	</p>
</div>
