<script lang="ts">
	import { flatSkills } from '$lib/data';
</script>

<p class="text-foreground/80 text-[0.72rem] leading-relaxed">
	{#each flatSkills as skill, i}
		<!-- prettier-ignore -->
		{skill}{#if i < flatSkills.length - 1}<span class="text-foreground/40">{' · '}</span>{/if}
	{/each}
</p>
