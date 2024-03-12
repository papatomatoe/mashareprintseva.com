<script lang="ts">
	import ErrorFile from '$lib/icons/ErrorFile.svelte';

	export let src: string | null;
	export let alt: string | null;

	let hasError = false;

	const handleError = (
		_: Event & {
			currentTarget: EventTarget & Element;
		}
	) => {
		hasError = true;
	};
</script>

{#if hasError}
	<div class="img_error">
		<ErrorFile />
	</div>
{:else}
	<img {src} {alt} on:error={handleError} />
{/if}

<style>
	.img_error {
		width: 100px;
		height: 100px;
	}
</style>
