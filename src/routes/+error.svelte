<script lang="ts">
	import { page } from '$app/stores';
	import { className } from '@/lib/stores';
	import { onMount } from 'svelte';

	onMount(() => {
		className.set('max-w-[90vw]');
	});
</script>

<h1 class="border-b-2 border-primary text-primary w-full text-xl font-semibold p-2">PXR</h1>
<a
	href="/"
	class="no-underline absolute top-0 right-0 px-1 aspect-square w-11 bg-primary text-primary-foreground hover:opacity-75 transition-all grid place-items-center text-3xl text-center"
>
	&times;
</a>
<div class="m-auto flex flex-col items-center justify-center">
	<h1 class="text-5xl font-semibold text-primary">
		{$page.status}
	</h1>
	<span class="text-lg text-muted-foreground">
		{typeof $page.error === 'object' && $page.error !== null
			? $page.error.message
			: $page.error !== null
				? $page.error
				: 'an error occurred'}
	</span>
</div>
