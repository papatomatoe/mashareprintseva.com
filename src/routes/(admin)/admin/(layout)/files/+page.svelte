<script lang="ts">
	import Filemanager, { type IFile, type IPagination } from '$lib/components/Filemanager.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let files: IFile[];
	let pagination: IPagination;
	let loading: boolean = false;

	$: files = data.filesData.files;
	$: pagination = data.filesData.pagination;
</script>

<div class="files">
	<Filemanager {files} {pagination} {loading} />
</div>

<style>
	.files {
		padding: 60px;
	}
</style>
