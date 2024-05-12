<script lang="ts">
	import Filemanager, { type IFile } from '$lib/components/Filemanager.svelte';
	import type { IPagination } from '$lib/components/Pagination.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let files: IFile[];
	let pagination: IPagination;
	let loading: boolean = false;

	$: files = data.filesData.files;
	$: pagination = data.filesData.pagination;
	$: info = data.filesData.info;
</script>

<div class="files">
	<Filemanager {info} {files} {pagination} {loading} />
</div>

<style>
	.files {
		padding: 60px;
	}
</style>
