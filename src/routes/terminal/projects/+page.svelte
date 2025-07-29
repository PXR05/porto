<script>
	import Header from '../Header.svelte';
	import { projects } from '@/lib/data';
</script>

<svelte:head>
	<title>PXR/Projects</title>
</svelte:head>

<Header>
	<span> PXR/ </span>
	<span class="font-semibold underline"> Projects </span>
</Header>
<div class="m-auto flex h-fit w-fit flex-col justify-center gap-4">
	<h2 class="text-xl">
		You're not supposed to be here. <br /> You're probably looking for one of these:
	</h2>
	<div class="grid gap-2">
		{#each Object.entries(projects) as [key, value]}
			<div>
				+
				<a
					href={key === 'others' ? value.link : `/projects/${key}`}
					class="text-lg font-semibold text-primary"
				>
					{key.charAt(0).toUpperCase() + key.slice(1)}
				</a>
			</div>
		{/each}
	</div>
	<p class="text-lg">
		Or you can go back to the <a class="underline hover:no-underline" href="/terminal">home page</a>.
	</p>
</div>
