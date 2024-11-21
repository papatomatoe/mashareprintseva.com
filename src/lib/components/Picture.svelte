<script lang="ts">
	type Props = {
		class?: string;
		src: string;
		alt: string;
		width: string;
		height: string;
	};

	let { class: className, src, alt, height, width }: Props = $props();
</script>

<picture class={className}>
	<source media="(min-width: 1200px)" srcset="{src}-desk.avif, {src}-desk@2x.avif 2x" />
	<source media="(min-width: 768px)" srcset="{src}-tab.avif, {src}-tab@2x.avif 2x" />
	<img src="{src}-mob.avif" srcset="{src}-mob@2x.avif 2x" {width} {height} loading="lazy" {alt} />
</picture>

<style>
	picture {
		display: block;
		width: 100%;
	}

	img {
		width: 100%;
		height: auto;
	}
</style>
