<script lang="ts">
	import type { Action } from 'svelte/action';

	type Props = {
		class?: string;
		src: string;
		alt: string;
		width: string;
		height: string;
	};

	let { class: className, src, alt, height, width }: Props = $props();

	let loading = $state(true);

	const handleOnLoad = () => {
		loading = false;
	};
</script>

<picture
	class={className}
	class:placeholder={loading}
	style="--width: {width}px; --height: {height}px"
>
	<source media="(min-width: 1200px)" srcset="{src}-desk.avif, {src}-desk@2x.avif 2x" />
	<source media="(min-width: 768px)" srcset="{src}-tab.avif, {src}-tab@2x.avif 2x" />
	<img
		class:blurry={loading}
		src="{src}-mob.avif"
		srcset="{src}-mob@2x.avif 2x"
		{width}
		{height}
		loading="lazy"
		{alt}
		onload={handleOnLoad}
	/>
</picture>

<style>
	.placeholder {
		background-color: #f6f6f6;
	}

	.blurry {
		filter: contrast(0.1) brightness(2) grayscale(2) blur(30px);
	}
	picture {
		display: block;
		width: 100%;
	}

	img {
		width: 100%;
		height: auto;
		transition: all 0.3s;
	}
</style>
