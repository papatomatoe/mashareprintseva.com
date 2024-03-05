<script lang="ts">
	import Filemanager, { type IFile } from '$lib/components/Filemanager.svelte';
	import Notification, { type NotificationType } from '$lib/components/Notification.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let files: IFile[] = [];
	let notification: { message: string; type: NotificationType } | null = null;
	let loading: boolean = false;

	$: files = data.filesData.files;
</script>

<Notification
	message={notification?.message}
	type={notification?.type}
	show={Boolean(notification)}
/>
<div class="files">
	<Filemanager {files} {loading} />
</div>

<style>
	.files {
		padding: 60px;
	}
</style>
