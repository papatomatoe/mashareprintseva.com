<script lang="ts">
	import Picture from '$lib/components/Picture.svelte';
	type Props = {
		src: string;
		alt: string;
	};

	let { src, alt }: Props = $props();

	const image = $derived.by(() => {
		const path = src.split('.');
		return path && path[0];
	});
</script>

<Picture src={image} {alt} width="326" height="320" />
