<script lang="ts">
	import type { Snippet } from 'svelte';
	import { fade } from 'svelte/transition';

	type Props = {
		children: Snippet;
		url: string;
	};

	let { children, url }: Props = $props();
</script>

{#key url}
	<div class="transition" in:fade={{ duration: 800 }}>
		{@render children?.()}
	</div>
{/key}

<style>
	.transition {
		height: 100%;
	}
</style>
