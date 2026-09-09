<script lang="ts">
	import { Button } from '@/lib/components/ui/button';
	import {
		contacts,
		education,
		profile,
		professionalExperiences,
		projects,
		skills,
		whatsappContact
	} from '@/lib/data';
	import { Download, ExternalLink, Github } from '@lucide/svelte';
	import { fade } from 'svelte/transition';

	const highlightedProjects = Object.values(projects).filter((project) => project.highlight);
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
	<section>
		<h2 class="mb-2 border-b pb-1 text-base font-bold tracking-wide uppercase">Experience</h2>
		<div class="space-y-4">
			{#each experienceGroups as company}
				<div>
					<div class="mb-1 flex items-center gap-2">
						<h3 class="text-sm font-bold">
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
					<div class="space-y-2">
						{#each company.roles as experience}
							<div>
								<div class="mb-1 flex items-center justify-between gap-3 text-xs">
									<p class="font-semibold whitespace-nowrap">
										{experience.title}
									</p>
									<p class="font-semibold whitespace-nowrap">{experience.period}</p>
								</div>
								<p class="mb-1 text-sm leading-tight">{@html experience.content}</p>
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
								<div class="flex items-center justify-between gap-3 text-xs font-semibold">
									<p>{item.degree}, {item.major}</p>
									<p class="whitespace-nowrap">{item.period}</p>
								</div>
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
					<p class="text-sm leading-tight">{project.content}</p>
					<!-- <div class="mb-1 text-xs">
						<span class="font-semibold">Technologies:</span>
						{project.tags.join(', ')}
					</div> -->
				</div>
			{/each}
		</div>
	</section>

	<!-- Skills -->
	<section>
		<h2 class="mb-2 border-b pb-1 text-base font-bold tracking-wide uppercase">Technical Skills</h2>
		<div class="space-y-2">
			{#each Object.entries(skills) as [category, categorySkills], i}
				<p class="text-sm leading-relaxed">
					<span class="font-semibold">{category}:</span>
					{categorySkills.join(', ')}
				</p>
			{/each}
		</div>
	</section>
</div>
