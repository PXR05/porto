<script lang="ts">
	import { Button } from '@/lib/components/ui/button';
	import { contacts, profile, projects, skills } from '@/lib/data';
	import { Download } from 'lucide-svelte';
	import { fade } from 'svelte/transition';

	function downloadPDF(
		e: MouseEvent & {
			currentTarget: EventTarget & (HTMLButtonElement | HTMLAnchorElement);
		}
	) {
		const button = e.currentTarget as HTMLButtonElement;
		const bottom_left = document.querySelector('#bottom-left');
		button.classList.add('hidden');
		bottom_left?.classList.add('hidden');
		window.print();
		button.classList.remove('hidden');
		bottom_left?.classList.remove('hidden');
	}
</script>

<div
	in:fade={{
		delay: 150,
		duration: 200
	}}
	class="mx-auto max-w-3xl select-text bg-background p-6 text-foreground"
>
	<!-- Header -->
	<header class="mb-6 border-b pb-4">
		<div class="flex items-start justify-between">
			<div class="flex-1">
				<h1 class="mb-1 text-2xl font-bold uppercase tracking-wide">{profile.name}</h1>
				<h2 class="mb-1 text-base font-semibold">{profile.title}</h2>
				<p class="mb-2 text-sm">{profile.location}</p>
				<p class="text-sm leading-relaxed">{profile.intro}</p>
			</div>
			<Button onclick={downloadPDF} variant="outline" size="icon">
				<Download />
			</Button>
		</div>
	</header>

	<!-- Contact Information -->
	<section class="mb-5">
		<h2 class="mb-2 border-b pb-1 text-base font-bold uppercase tracking-wide">
			Contact Information
		</h2>
		<div class="grid grid-cols-2 gap-x-4 gap-y-1 text-sm">
			{#each Object.entries(contacts) as [key, value]}
				<div class="flex">
					<span class="w-20 font-semibold">{key}:</span>
					<span class="">{value}</span>
				</div>
			{/each}
		</div>
	</section>

	<!-- Skills -->
	<section class="mb-5">
		<h2 class="mb-2 border-b pb-1 text-base font-bold uppercase tracking-wide">Technical Skills</h2>
		<div class="text-sm">
			{skills.join(' • ')}
		</div>
	</section>

	<!-- Projects -->
	<section class="mb-5">
		<h2 class="mb-2 border-b pb-1 text-base font-bold uppercase tracking-wide">
			Projects & Experience
		</h2>
		<div class="space-y-4">
			{#each Object.values(projects) as project}
				<div>
					<h3 class="mb-1 text-sm font-bold">{project.title}</h3>
					<p class="mb-1 text-sm leading-tight">{project.content}</p>
					<div class="mb-1 text-xs">
						<span class="font-semibold">Technologies:</span>
						{project.tags.join(', ')}
					</div>
					<div class="text-xs">
						<span class="font-semibold">Link:</span>
						{project.link}
					</div>
				</div>
			{/each}
		</div>
	</section>
</div>
