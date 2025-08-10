<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import type { Snippet } from 'svelte';

	type Props = {
		trigger: Snippet<[{ props: any; setOpen: (newOpen: boolean) => void }]>;
		children?: Snippet;
		class?: string;
		align?: 'start' | 'center' | 'end';
		side?: 'top' | 'right' | 'bottom' | 'left';
		open?: boolean;
	};

	let {
		open = $bindable(false),
		trigger,
		children,
		class: className,
		side,
		align
	}: Props = $props();

	const getOpen = () => open;
	const setOpen = (newOpen: boolean) => {
		open = newOpen;
	};
</script>

<Popover.Root bind:open={getOpen, setOpen}>
	<Popover.Trigger>
		{#snippet child({ props })}
			{@render trigger({ props, setOpen })}
		{/snippet}
	</Popover.Trigger>
	<Popover.Content class={className} {side} {align}>{@render children()}</Popover.Content>
</Popover.Root>
