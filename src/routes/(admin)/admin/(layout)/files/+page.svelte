<script lang="ts">
	import Filemanager, { type IFile } from '$lib/components/Filemanager.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let files: IFile[] = [];
	let loading: boolean = false;

	$: files = data.filesData.files;
</script>

<div class="files">
	<Filemanager {files} {loading} />
</div>

<style>
	.files {
		padding: 60px;
	}
</style>
