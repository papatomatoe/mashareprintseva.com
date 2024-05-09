<script lang="ts">
	import PDF from '$lib/icons/PDF.svelte';
	import ErrorFile from '$lib/icons/ErrorFile.svelte';
	import { FILE } from '$lib/constants/files';

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
	{:else if $$props.fileType === FILE.pdf}
		<PDF width={icon.width} height={icon.height} />
	{:else if $$props.fileType === FILE.svg}
		<img class="image__svg" src={$$props.url} alt={$$props.name} height="30" width="30" />
	{:else}
		<img
			class="image__img"
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
		--color--icon: var(--color--gray-15);
		display: grid;
		place-items: center;
	}
	.image__img {
		display: block;
		object-fit: contain;
	}
</style>
