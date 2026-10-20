<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>PXR/Error</title>
</svelte:head>

<h1 class="border-primary text-primary w-full border-b-2 p-2 text-xl font-semibold">PXR</h1>
<a
	href="/"
	class="bg-primary text-primary-foreground absolute top-0 right-0 grid aspect-square w-11 place-items-center px-1 text-center text-3xl no-underline transition-all hover:opacity-75"
>
	&times;
</a>
<div class="m-auto flex flex-col items-center justify-center">
	<h1 class="text-primary text-5xl font-semibold">
		{page.status}
	</h1>
	<span class="text-muted-foreground text-lg">
		{typeof page.error === 'object' && page.error !== null
			? page.error.message
			: page.error !== null
				? page.error
				: 'an error occurred'}
	</span>
</div>
