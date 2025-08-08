<script lang="ts">
	import * as Popover from '$lib/components/ui/popover/index.js';
	import type { Snippet } from 'svelte';

	type Props = {
		trigger: Snippet;
		children?: Snippet;
		class?: string;
		align?: 'start' | 'center' | 'end';
		side?: 'top' | 'right' | 'bottom' | 'left';
	};

	let { trigger, children, class: className, side, align }: Props = $props();
</script>

<Popover.Root>
	<Popover.Trigger>{@render trigger()}</Popover.Trigger>
	<Popover.Content class={className} {side} {align}>{@render children()}</Popover.Content>
</Popover.Root>
