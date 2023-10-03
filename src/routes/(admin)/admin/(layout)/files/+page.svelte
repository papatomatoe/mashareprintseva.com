<script lang="ts">
	import type { ComponentEvents } from 'svelte';
	import Filemanager, { type IFile } from '$lib/components/Filemanager.svelte';
	import type { PageData } from './$types';
	import { nanoid } from 'nanoid';
	import toBase64 from '$lib/utils/toBase64';
	import Notification, { type NotificationType } from '$lib/components/Notification.svelte';
	import { debounce } from '$lib/utils/debounce';
	export let data: PageData;

	let files: IFile[] = [];
	let notification: { message: string; type: NotificationType } | null = null;
	let loading: boolean = false;

	$: files = data.filesData.files;

	const handleDeleteFiles = async (e: ComponentEvents<Filemanager>['delete']) => {
		const ids = e.detail.ids;

		const deletedFiles = files.filter((file) => ids.includes(file.id));
		loading = true;
		try {
			const response = await fetch('/api/v2/files/delete', {
				method: 'DELETE',
				body: JSON.stringify(deletedFiles)
			});

			const successfullyDeletedFileIds = await response.json();

			files = files.filter((file) => !successfullyDeletedFileIds.includes(file.id));

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

		const formData = new FormData();

		[...uploadedFiles].forEach((file: File) => {
			formData.append('files', file, file.name);
		});

		loading = true;

		try {
			const response = await fetch('/api/v2/files/upload', { method: 'POST', body: formData });

			const newFiles = await response.json();

			// const idx = files.findIndex((file) => file.fileId === fileId);

			files = [...files, ...newFiles];

			notification = { message: 'Successfully uploaded', type: 'success' };
		} catch (e) {
			console.error(e);
			notification = { message: 'Something went wrong...', type: 'error' };
		} finally {
			loading = false;
		}
	};

	const handleSearchFiles = debounce(async (e: ComponentEvents<Filemanager>['search']) => {
		const { search } = e.detail;

		loading = true;
		try {
			const response = await fetch('/api/v2/files/search', {
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
			const response = await fetch('/api/v2/files/list', {
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

	const handleNext = async (e: ComponentEvents<Filemanager>['next']) => {
		console.log(e.detail);
	};
	const handlePrevious = async (e: ComponentEvents<Filemanager>['previous']) => {
		console.log(e.detail);
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
		on:next={handleNext}
		on:previous={handlePrevious}
	/>
</div>

<style>
	.files {
		padding: 60px;
	}
</style>
