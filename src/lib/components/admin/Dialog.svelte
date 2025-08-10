<script lang="ts">
	import * as Dialog from '$lib/components/ui/dialog/index.js';
	import type { Snippet } from 'svelte';

	type Props = {
		class?: string;
		trigger: Snippet<[{ props: any }]>;
		title?: string;
		description?: string;
		children: Snippet;
		footer?: Snippet;
		open?: boolean;
	};

	let {
		class: className,
		title,
		description,
		trigger,
		children,
		footer,
		open = $bindable()
	}: Props = $props();
</script>

<Dialog.Root bind:open>
	<Dialog.Trigger>
		{#snippet child({ props })}
			{@render trigger({ props })}
		{/snippet}
	</Dialog.Trigger>
	<Dialog.Content class={className}>
		{#if title || description}
			<Dialog.Header>
				{#if title}
					<Dialog.Title>{title}</Dialog.Title>
				{/if}
				{#if description}
					<Dialog.Description>
						{description}
					</Dialog.Description>
				{/if}
			</Dialog.Header>
		{/if}
		{@render children()}
		{#if footer}
			<Dialog.Footer>
				{@render footer()}
			</Dialog.Footer>
		{/if}
	</Dialog.Content>
</Dialog.Root>
