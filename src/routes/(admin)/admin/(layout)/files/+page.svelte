<script lang="ts">
	export let data;

	$: images = data.files.resources.map((el) => ({
		id: el.asset_id,
		title: el.public_id,
		src: el.secure_url
	}));
</script>

<ul>
	{#each images as image (image.id)}
		<li>
			<img src={image.src} alt="" />
		</li>
	{/each}
</ul>

<style>
</style>
