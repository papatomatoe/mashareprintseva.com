<script lang="ts">
	type Props = {
		src: string;
		alt: string;
	};

	let { src, alt }: Props = $props();

	const image = $derived.by(() => {
		const [path, extension] = src.split('.') ?? [];
		return { path: path ?? '', extension: extension ?? '' };
	});
</script>

<picture>
	<source
		media="(min-width: 1200px)"
		srcset="{image.path}-desk.{image.extension}, {image.path}-desk@2x.{image.extension} 2x"
	/>
	<source
		media="(min-width: 768px)"
		srcset="{image.path}-tab.{image.extension}, {image.path}-tab@2x.{image.extension} 2x"
	/>
	<img
		src="{image.path}-mob.{image.extension}"
		srcset="{image.path}-mob@2x.{image.extension} 2x"
		width="326"
		height="326"
		loading="lazy"
		{alt}
	/>
</picture>
