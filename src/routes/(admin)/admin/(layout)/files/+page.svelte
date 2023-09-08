<script lang="ts">
	import type { ComponentEvents } from 'svelte';
	import Filemanager from '$lib/components/Filemanager.svelte';
	import type { PageData } from './$types';
	import { nanoid } from 'nanoid';
	import toBase64 from '$lib/utils/toBase64';
	import Notification, { type NotificationType } from '$lib/components/Notification.svelte';
	import { debounce } from '$lib/utils/debounce';
	export let data: PageData;

	let files: any[] = [];
	let notification: { message: string; type: NotificationType } | null = null;
	let loading: boolean = false;

	$: files = data.files;

	const handleDeleteFiles = async (e: ComponentEvents<Filemanager>['delete']) => {
		const ids = e.detail.ids;
		loading = true;
		try {
			const response = await fetch('/api/files/delete', {
				method: 'DELETE',
				body: JSON.stringify(ids)
			});

			const { successfullyDeletedFileIds } = await response.json();

			files = files.filter((file) => !successfullyDeletedFileIds.includes(file.fileId));

			notification = { message: 'Successfully deleted', type: 'success' };
		} catch (e) {
			console.log(e);
			notification = { message: 'Something went wrong...', type: 'error' };
		} finally {
			loading = false;
		}
	};

	const handleAddFiles = async (e: ComponentEvents<Filemanager>['add']) => {
		const { uploadedFiles } = e.detail;

		[...uploadedFiles].forEach(async (file) => {
			const dataURI = await toBase64(file);

			const fileId = nanoid();

			files = [...files, { fileId, loading: true }];

			const formData = new FormData();
			formData.append('file', dataURI as string);
			formData.append('fileName', file.name);

			loading = true;

			try {
				const response = await fetch('/api/file/upload', { method: 'POST', body: formData });

				const fileData = await response.json();

				const idx = files.findIndex((file) => file.fileId === fileId);

				files = [...files.slice(0, idx), fileData, ...files.slice(idx + 1)];

				notification = { message: 'Successfully uploaded', type: 'success' };
			} catch (e) {
				console.error(e);
				notification = { message: 'Something went wrong...', type: 'error' };
			} finally {
				loading = false;
			}
		});
	};

	const handleSearchFiles = debounce(async (e: ComponentEvents<Filemanager>['search']) => {
		const { search } = e.detail;

		loading = true;
		try {
			const response = await fetch('/api/files/search', {
				method: 'POST',
				body: JSON.stringify(search)
			});

			const searchedResult = await response.json();

			files = searchedResult;
		} catch (e) {
			console.error(e);
			notification = { message: 'Something went wrong...', type: 'error' };
		} finally {
			loading = false;
		}
	}, 500);

	const handleChangeLimit = async (e: ComponentEvents<Filemanager>['per-page']) => {
		const { limit } = e.detail;
		loading = true;
		try {
			const response = await fetch('/api/files/list', {
				method: 'POST',
				body: JSON.stringify(limit)
			});

			const data = await response.json();

			files = data;
		} catch (e) {
			console.error(e);
			notification = { message: 'Something went wrong...', type: 'error' };
		} finally {
			loading = false;
		}
	};
</script>

<Notification
	message={notification?.message}
	type={notification?.type}
	show={Boolean(notification)}
/>
<div class="files">
	<Filemanager
		{files}
		{loading}
		on:delete={handleDeleteFiles}
		on:add={handleAddFiles}
		on:search={handleSearchFiles}
		on:change-limit={handleChangeLimit}
	/>
</div>

<style>
	.files {
		padding: 60px;
	}
</style>
