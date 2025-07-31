<script lang="ts">
	import '$lib/styles/globals.css';
	import type { Snippet } from 'svelte';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<div class="admin-container">
	{@render children()}
</div>

<style>
	.admin-container {
		height: 100%;
	}
</style>
