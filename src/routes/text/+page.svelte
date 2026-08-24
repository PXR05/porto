<script lang="ts">
	import { Button } from '@/lib/components/ui/button';
	import {
		contacts,
		education,
		profile,
		professionalExperiences,
		projects,
		skills
	} from '@/lib/data';
	import { Download, ExternalLink, Github } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	const highlightedProjects = Object.values(projects).filter((project) => project.highlight);
	const githubProfile = 'https://github.com/PXR05';

	const contactEntries = Object.values(contacts)
		.filter((contact) => contact.showInTextHeader !== false)
		.map((contact) => ({
			value: contact.value,
			label: contact.username ?? contact.value,
			icon: contact.icon,
			href: contact.type === 'email' ? `mailto:${contact.value}` : contact.value,
			external: contact.type === 'url'
		}));
</script>

<div
	in:fade={{
		delay: 150,
		duration: 200
	}}
	class="bg-background text-foreground mx-auto max-w-3xl p-6 font-normal select-text"
>
	<!-- Header -->
	<header class="mb-6">
		<div class="flex items-start justify-between">
			<div class="flex-1">
				<h1 class="mb-2 text-2xl font-bold tracking-wide uppercase">
					{profile.name}
					{profile.surname}
				</h1>
				<p class="mb-2 flex flex-wrap items-center gap-2 text-xs">
					<a
						href={githubProfile}
						target="_blank"
						rel="noopener noreferrer"
						class="inline-flex items-center gap-1.5 underline-offset-2 hover:underline"
					>
						<Github class="size-3.5" />
						PXR05
					</a>
					<span>|</span>
					{#each contactEntries as contact, i}
						<a
							href={contact.href}
							target={contact.external ? '_blank' : undefined}
							rel={contact.external ? 'noopener noreferrer' : undefined}
							class="inline-flex items-center gap-1.5 underline-offset-2 hover:underline"
						>
							<contact.icon class="size-3.5" />
							{contact.label}</a
						>{#if i !== contactEntries.length - 1}
							<span>|</span>
						{/if}
					{/each}
				</p>
				<p class="text-sm leading-relaxed">{profile.intro}</p>
			</div>
			<Button onclick={() => window.print()} variant="outline" size="icon" class="print:hidden">
				<Download />
			</Button>
		</div>
	</header>

	<!-- Experience -->
	<section class="mb-5">
		<h2 class="mb-2 border-b pb-1 text-base font-bold tracking-wide uppercase">Experience</h2>
		<div class="space-y-4">
			{#each professionalExperiences as experience}
				<div>
					<h3 class="mb-1 text-sm font-bold">{experience.title}</h3>
					<div class="mb-1 flex items-center justify-between gap-3 text-xs">
						<p class="font-semibold whitespace-nowrap">
							{experience.company}
						</p>
						<p class="font-semibold whitespace-nowrap">{experience.period}</p>
					</div>
					<p class="mb-1 text-sm leading-tight">{experience.content}</p>
					{#if experience.relatedProject}
						<p class="text-xs">
							<span class="font-semibold">Related Project:</span>
							{experience.relatedProject}
						</p>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Education -->
	<section class="mb-5">
		<h2 class="mb-2 border-b pb-1 text-base font-bold tracking-wide uppercase">Education</h2>
		<div class="space-y-4">
			{#each education as item}
				<div>
					<div class="mb-1 flex items-center justify-between gap-3 text-sm font-semibold">
						<p>{item.institution}</p>
						<p class="text-xs whitespace-nowrap">{item.period}</p>
					</div>
					<div class="mb-1 flex items-center justify-between gap-3 text-sm">
						<p class="text-sm">{item.degree}, {item.major}</p>
						<p class="text-xs">
							{item.grade}
						</p>
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Projects -->
	<section class="mb-5">
		<h2 class="mb-2 border-b pb-1 text-base font-bold tracking-wide uppercase">Projects</h2>
		<div class="space-y-4">
			{#each highlightedProjects as project}
				<div>
					<div class="mb-1 flex items-center gap-2">
						<h3 class="text-sm font-bold">{project.title}</h3>
						<a
							href={project.link}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Open ${project.title} project link`}
							class="text-muted-foreground hover:text-foreground inline-flex items-center"
						>
							<ExternalLink class="size-3.5" />
						</a>
					</div>
					<p class="mb-1 text-sm leading-tight">{project.content}</p>
					<!-- <div class="mb-1 text-xs">
						<span class="font-semibold">Technologies:</span>
						{project.tags.join(', ')}
					</div> -->
				</div>
			{/each}
		</div>
	</section>

	<!-- Skills -->
	<section class="mb-5">
		<h2 class="mb-2 border-b pb-1 text-base font-bold tracking-wide uppercase">Technical Skills</h2>
		<div class="space-y-2 text-sm">
			{#each Object.entries(skills) as [category, categorySkills]}
				<p>
					<span class="font-semibold">{category}:</span>
					{categorySkills.join(', ')}
				</p>
			{/each}
		</div>
	</section>
</div>
