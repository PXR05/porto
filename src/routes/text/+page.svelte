<script lang="ts">
	import { page } from '$app/state';
	import { Button } from '#lib/components/ui/button/index.js';
	import {
		contacts,
		education,
		profile,
		professionalExperiences,
		projects,
		skills,
		whatsappContact
	} from '#lib/data.ts';
	import { Download, ExternalLink, List } from '@lucide/svelte';
	import Github from '#lib/components/icons/Github.svelte';
	import { fade } from 'svelte/transition';

	let detailed = $state(page.url.searchParams.get('detailed') !== 'false');

	const highlightedProjects = Object.values(projects).filter((project) => project.highlight);
	const detailedProjects = Object.values(projects).filter(
		(project) => project.highlight || project.substantial
	);
	let visibleProjects = $derived(detailed ? detailedProjects : highlightedProjects);
	const githubProfile = 'https://github.com/PXR05';
	type ProfessionalExperience = (typeof professionalExperiences)[number];
	const experienceGroups = professionalExperiences.reduce<
		Array<{
			company: string;
			link: string;
			roles: ProfessionalExperience[];
		}>
	>((groups, experience) => {
		const company = groups.find((group) => group.company === experience.company);
		if (company) {
			company.roles.push(experience);
		} else {
			groups.push({
				company: experience.company,
				link: experience.link,
				roles: [experience]
			});
		}
		return groups;
	}, []);
	type Education = (typeof education)[number];
	const educationGroups = education.reduce<
		Array<{
			institution: string;
			programs: Education[];
		}>
	>((groups, item) => {
		const institution = groups.find((group) => group.institution === item.institution);
		if (institution) {
			institution.programs.push(item);
		} else {
			groups.push({ institution: item.institution, programs: [item] });
		}
		return groups;
	}, []);

	const contactEntries = [...Object.values(contacts), whatsappContact]
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
	class="bg-background text-foreground mx-auto grid max-w-3xl gap-6 font-normal select-text not-print:p-6"
>
	<!-- Header -->
	<header>
		<div class="flex items-start justify-between gap-4">
			<div class="flex-1">
				<h1 class="mb-2 text-2xl font-bold tracking-wide">
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
			<div class="flex shrink-0 items-center gap-2 print:hidden">
				<Button
					onclick={() => (detailed = !detailed)}
					variant={detailed ? 'default' : 'outline'}
					size="icon"
					aria-pressed={detailed}
				>
					<List class="size-3.5" aria-hidden="true" />
				</Button>
				<Button
					onclick={() => window.print()}
					variant="outline"
					size="icon"
					aria-label="Print or download CV"
				>
					<Download aria-hidden="true" />
				</Button>
			</div>
		</div>
	</header>

	<!-- Experience -->
	<section>
		<h2 class="mb-2 border-b pb-1 text-base font-bold tracking-wide uppercase">Experience</h2>
		<div class="space-y-4">
			{#each experienceGroups as company}
				<div>
					<div class="mb-1.5 flex items-center gap-2">
						<h3 class="text-[15px] font-bold">
							{company.company}
						</h3>
						<a
							href={company.link}
							target="_blank"
							rel="noopener noreferrer"
							aria-label={`Open ${company.company} link`}
							class="text-muted-foreground hover:text-foreground inline-flex items-center"
						>
							<ExternalLink class="size-3.5" />
						</a>
					</div>
					<div>
						{#each company.roles as experience}
							<div class="pb-2.5 last:pb-0 print:break-inside-avoid">
								<div class="mb-1 flex items-baseline justify-between gap-3">
									<p class="text-sm font-semibold">
										{experience.title}
									</p>
									<p class="text-xs font-semibold whitespace-nowrap">
										{experience.period}
									</p>
								</div>
								{#if detailed && experience.details?.length}
									<ul class="mb-1 list-disc space-y-1 pl-4 text-sm leading-snug">
										{#each experience.details as detail}
											<li>{detail}</li>
										{/each}
									</ul>
								{:else}
									<p class="mb-1 text-sm leading-tight">{@html experience.content}</p>
								{/if}
								{#if experience.relatedProject}
									<p class="text-xs">
										<span class="font-semibold">Related Project:</span>
										{experience.relatedProject}
									</p>
								{/if}
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Education -->
	<section>
		<h2 class="mb-2 border-b pb-1 text-base font-bold tracking-wide uppercase">Education</h2>
		<div class="space-y-4">
			{#each educationGroups as institution}
				<div>
					<h3 class="mb-1 text-sm font-bold">{institution.institution}</h3>
					<div class="space-y-2">
						{#each institution.programs as item}
							<div>
								<div class="flex items-center justify-between gap-3 text-sm font-semibold">
									<p>{item.degree}, {item.major}</p>
									<p class="text-xs whitespace-nowrap">{item.period}</p>
								</div>
								<p class="text-xs">Focus: {item.focus}</p>
								<p class="text-xs">GPA: {item.grade}</p>
							</div>
						{/each}
					</div>
				</div>
			{/each}
		</div>
	</section>

	<!-- Projects -->
	<section>
		<h2 class="mb-2 border-b pb-1 text-base font-bold tracking-wide uppercase">Projects</h2>
		<div class="space-y-4">
			{#each visibleProjects as project}
				<div class="print:break-inside-avoid">
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
					{#if detailed && project.details?.length}
						<ul class="list-disc space-y-1 pl-4 text-sm leading-snug">
							{#each project.details as detail}
								<li>{detail}</li>
							{/each}
						</ul>
					{:else}
						<p class="text-sm leading-tight">{project.content}</p>
					{/if}
					{#if detailed && project.tags.length}
						<p class="mt-1 text-xs">
							<span class="font-semibold">Technologies:</span>
							{project.tags.join(', ')}
						</p>
					{/if}
				</div>
			{/each}
		</div>
	</section>

	<!-- Skills -->
	<section>
		<h2 class="mb-2 border-b pb-1 text-base font-bold tracking-wide uppercase">Technical Skills</h2>
		<div>
			{#each Object.entries(skills) as [category, categorySkills], i}
				<p class="text-sm leading-relaxed">
					<span class="font-semibold">{category}:</span>
					{categorySkills.join(', ')}
				</p>
			{/each}
		</div>
	</section>
</div>
