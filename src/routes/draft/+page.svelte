<script lang="ts">
	import { profile } from '#lib/data.js';
	import { fade } from 'svelte/transition';
	import Caption from './Caption.svelte';
	import SheetFrame from './SheetFrame.svelte';
	import SkillsLine from './SkillsLine.svelte';
	import TitleBlock from './TitleBlock.svelte';
	import WorksList from './WorksList.svelte';
</script>

<div in:fade={{ delay: 150, duration: 200 }} class="h-dvh w-full">
	<SheetFrame>
		<div
			class="custom-scroll flex min-h-0 min-w-0 flex-1 flex-col overflow-y-auto p-6 md:px-10 md:py-8"
		>
			<header class="flex flex-col">
				<h1 class="text-3xl leading-none tracking-[0.08em] uppercase sm:text-4xl md:text-5xl">
					{profile.name}
					{profile.surname}
				</h1>
				<p class="text-foreground/60 mt-3 text-[0.62rem] tracking-[0.35em] uppercase">
					{profile.title} · {profile.location}
				</p>
				<p class="text-foreground/85 mt-5 max-w-prose text-sm leading-relaxed">
					{profile.intro}
				</p>
			</header>

			<section class="mt-8 flex max-w-2xl flex-col gap-2.5 md:mt-10">
				<Caption text="Skills" />
				<SkillsLine />
			</section>

			<section class="mt-8 flex max-w-2xl flex-col gap-2.5 md:mt-10">
				<Caption text="Selected Works" />
				<WorksList />
			</section>
		</div>

		<TitleBlock />
	</SheetFrame>
</div>
