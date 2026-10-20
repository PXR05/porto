<script lang="ts">
	import { contacts, whatsappContact } from '$lib/data';
	import { Mail } from '@lucide/svelte';
	import { onMount } from 'svelte';
	import Caption from './Caption.svelte';

	const profileLinks = [
		{ label: 'GitHub', value: 'https://github.com/PXR05' },
		{ label: 'LinkedIn', value: contacts.LinkedIn.value },
		{ label: 'X', value: contacts.X.value },
		{ label: 'WhatsApp', value: whatsappContact.value }
	];

	let now = $state<Date | null>(null);

	onMount(() => {
		now = new Date();
		const interval = setInterval(() => (now = new Date()), 1000);
		return () => clearInterval(interval);
	});

	const time = $derived(
		now ? now.toLocaleTimeString('en-GB', { hour: '2-digit', minute: '2-digit' }) : '--:--'
	);
	const date = $derived(
		now
			? now.toLocaleDateString('en-GB', {
					weekday: 'short',
					day: 'numeric',
					month: 'short',
					year: 'numeric'
				})
			: '--- -- --- ----'
	);
</script>

<div class="flex shrink-0 justify-end">
	<div class="border-foreground/40 w-full max-w-[36rem] border-t min-[660px]:border-l">
		<div
			class="timedate border-foreground/40 divide-foreground/40 flex flex-col divide-y border-b sm:flex-row sm:divide-x sm:divide-y-0"
		>
			<div class="flex w-full shrink-0 flex-col justify-between gap-5 p-3 sm:w-36">
				<Caption text="Time" />
				<p class="text-2xl tabular-nums md:text-3xl">{time}</p>
			</div>
			<div class="flex min-w-0 flex-1 flex-col justify-between gap-1 p-3">
				<Caption text="Date" />
				<p class="text-foreground/90 text-[0.78rem]">{date}</p>
			</div>
		</div>
		<div class="divide-foreground/40 flex flex-col divide-y sm:flex-row sm:divide-x sm:divide-y-0">
			<div class="flex min-w-0 flex-[1.2] flex-col gap-1 p-3">
				<Caption text="Mail" />
				<p class="text-foreground/85 flex items-center gap-1.5 text-[0.7rem]">
					<Mail class="size-3 shrink-0" />
					<a
						href={`mailto:${contacts.Email.value}`}
						class="hover:text-primary truncate underline-offset-4 hover:underline"
					>
						{contacts.Email.value}
					</a>
				</p>
			</div>
			<div class="flex min-w-0 flex-[1.4] flex-col gap-1 p-3">
				<Caption text="Profiles" />
				<p class="text-foreground/85 flex flex-wrap items-center gap-x-2 gap-y-0.5 text-[0.7rem]">
					{#each profileLinks as link, i}
						<a
							href={link.value}
							target="_blank"
							rel="noopener noreferrer"
							class="hover:text-primary whitespace-nowrap underline-offset-4 hover:underline"
						>
							{link.label}
						</a>
						{#if i < profileLinks.length - 1}
							<span class="text-foreground/40">·</span>
						{/if}
					{/each}
				</p>
			</div>
		</div>
	</div>
</div>

<style>
	/* Drop the clock row when there isn't enough vertical room for it */
	@media (max-width: 767px) and (max-height: 899px) {
		.timedate {
			display: none;
		}
	}

	@media (min-width: 768px) and (max-height: 819px) {
		.timedate {
			display: none;
		}
	}
</style>
