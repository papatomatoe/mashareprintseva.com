<script lang="ts">
	import PDF from '$lib/icons/PDF.svelte';
	import ErrorFile from '$lib/icons/ErrorFile.svelte';

	export let size = 1;
	export let height = 50;
	export let width = 50;

	$: icon = {
		height: size * height,
		width: size * width
	};

	let hasError = false;

	const handleError = (
		_: Event & {
			currentTarget: EventTarget & Element;
		}
	) => {
		hasError = true;
	};
</script>

<div class="image">
	{#if hasError}
		<ErrorFile width={icon.width} height={icon.height} />
	{:else if $$props.fileType === 'application/pdf'}
		<PDF width={icon.width} height={icon.height} />
	{:else}
		<img
			style:width="{width}px"
			style:height="{height}px"
			src={$$props.thumbnail}
			alt={$$props.name}
			on:error={handleError}
		/>
	{/if}
</div>

<style>
	.image {
		--color-icon: var(--color-icon-dark);
	}
	.image img {
		object-fit: contain;
	}
</style>
