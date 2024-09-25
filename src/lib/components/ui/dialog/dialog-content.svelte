<script lang="ts">
	import { Dialog as DialogPrimitive } from 'bits-ui';
	import * as Dialog from './index.js';
	import { cn, flyAndScale } from '$lib/utils.js';

	type $$Props = DialogPrimitive.ContentProps;

	let className: $$Props['class'] = undefined;
	export let transition: $$Props['transition'] = flyAndScale;
	export let transitionConfig: $$Props['transitionConfig'] = {
		duration: 200
	};
	export { className as class };
</script>

<Dialog.Portal>
	<Dialog.Overlay />
	<DialogPrimitive.Content
		{transition}
		{transitionConfig}
		class={cn(
			'fixed left-[50%] top-[50%] z-50 grid w-full max-w-lg translate-x-[-50%] translate-y-[-50%] gap-4 border-2 border-primary bg-background p-6 shadow-lg',
			className
		)}
		{...$$restProps}
	>
		<slot />
		<DialogPrimitive.Close
			class="absolute right-0 h-10 w-10 border-2 border-t-0 border-primary bg-primary text-3xl text-primary-foreground ring-offset-background transition-all hover:brightness-75 hover:filter focus:outline-none disabled:pointer-events-none data-[state=open]:bg-accent data-[state=open]:text-muted-foreground"
		>
			&times;
			<span class="sr-only">Close</span>
		</DialogPrimitive.Close>
	</DialogPrimitive.Content>
</Dialog.Portal>
