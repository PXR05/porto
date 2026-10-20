<script lang="ts">
	import { projects } from '$lib/data';
	import { ArrowUpRight } from '@lucide/svelte';

	const highlightedProjects = Object.values(projects).filter((project) => project.highlight);
</script>

<div class="border-foreground/30 flex flex-col border-t">
	{#each highlightedProjects as project, i}
		<a
			href={project.link}
			target="_blank"
			rel="noopener noreferrer"
			class="border-foreground/20 group hover:bg-foreground/5 flex items-center gap-3 border-b py-2 transition-colors md:gap-6"
		>
			<span class="text-foreground/45 w-9 shrink-0 text-[0.6rem]">
				A-{String(i + 1).padStart(2, '0')}
			</span>
			<span
				class="group-hover:text-primary text-[0.78rem] tracking-[0.08em] underline-offset-4 transition-colors group-hover:underline"
			>
				{project.title}
			</span>
			<span
				class="text-foreground/45 hidden flex-1 truncate text-[0.58rem] tracking-[0.12em] uppercase sm:block"
			>
				{project.tags.slice(0, 3).join(' · ')}
			</span>
			<ArrowUpRight
				class="text-foreground/45 group-hover:text-primary ml-auto size-3.5 shrink-0 transition-colors"
			/>
		</a>
	{/each}
</div>
