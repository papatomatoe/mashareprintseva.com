<script lang="ts">
	import '$lib/styles/app.css';
	import type { Snippet } from 'svelte';
	import { Toaster } from '$lib/components/ui/sonner/index.js';

	type Props = {
		children: Snippet;
	};

	let { children }: Props = $props();
</script>

<Toaster position="top-right" richColors theme="light" />

<div class="h-full">
	{@render children()}
</div>
