<script lang="ts">
	import { page } from '$app/state';
</script>

<svelte:head>
	<title>PXR/Error</title>
</svelte:head>

<h1 class="w-full border-b-2 border-primary p-2 text-xl font-semibold text-primary">PXR</h1>
<a
	href="/"
	class="absolute right-0 top-0 grid aspect-square w-11 place-items-center bg-primary px-1 text-center text-3xl text-primary-foreground no-underline transition-all hover:opacity-75"
>
	&times;
</a>
<div class="m-auto flex flex-col items-center justify-center">
	<h1 class="text-5xl font-semibold text-primary">
		{page.status}
	</h1>
	<span class="text-lg text-muted-foreground">
		{typeof page.error === 'object' && page.error !== null
			? page.error.message
			: page.error !== null
				? page.error
				: 'an error occurred'}
	</span>
</div>
