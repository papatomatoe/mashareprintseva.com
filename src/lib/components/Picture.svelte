<script lang="ts">
	type Props = {
		class?: string;
		src: string;
		alt: string;
		width: string;
		height: string;
		loading?: 'lazy' | 'eager' | null;
	};

	let { class: className, src, alt, height, width, loading = 'lazy' }: Props = $props();

	let isLoading = $state(true);

	const handleOnLoad = () => {
		isLoading = false;
	};
</script>

<picture
	class={className}
	class:placeholder={isLoading}
	style="--width: {width}px; --height: {height}px"
>
	<source media="(min-width: 1200px)" srcset="{src}-desk.avif, {src}-desk@2x.avif 2x" />
	<source media="(min-width: 768px)" srcset="{src}-tab.avif, {src}-tab@2x.avif 2x" />
	<img
		class:blurry={isLoading}
		src="{src}-mob.avif"
		srcset="{src}-mob@2x.avif 2x"
		{width}
		{height}
		{loading}
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
		transition: all 0.3s;
		width: 100%;
		height: auto;
	}
</style>
