<script lang="ts">
	$: sectionsId = $$props?.sectionId ?? '';
	$: sectionTile = $$props?.section?.title ?? '';
</script>

<a class="section-link" href={`/admin/sections/edit/${sectionsId}`}>{sectionTile}</a>

<style>
	.section-link {
		color: var(--color--primary);
	}
</style>
