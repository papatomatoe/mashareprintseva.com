<script context="module" lang="ts">
	export interface IFile {
		id: string;
		name: string | null;
		uniqueName: string | null;
		url: string | null;
		thumbnail: string | null;
		fileType: string | null;
		createdAt: Date;
		loading?: boolean;
	}
</script>

<script lang="ts">
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Input from '$lib/components/Input.svelte';
	import type { NotificationType } from '$lib/components/Notification.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Add from '$lib/components/icons/Add.svelte';
	import Delete from '$lib/components/icons/Delete.svelte';
	import PDF from '$lib/components/icons/PDF.svelte';
	import Search from '$lib/components/icons/Search.svelte';
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import Image from '$lib/components/icons/Image.svelte';
	import List from '$lib/components/icons/List.svelte';
	import Grid from '$lib/components/icons/Grid.svelte';
	import { FILE_TYPES, IMAGE_TYPES } from '$lib/constants/files';
	import { filesStore } from '$lib/stores/files';
	import { debounce } from '$lib/utils/debounce';
	import { nanoid } from 'nanoid';
	import type { ComponentEvents } from 'svelte';

	export let files: IFile[] = [];
	export let loading = false;

	let hasError = false;
	let selectedFileIds: string[] = [];
	let uploadedFilePlaceholders: IFile[] = [];
	let notification: { message: string; type: NotificationType } | null = null;
	let limit = 50;
	let currentPage = 1;

	$: renderedFiles = [...files, ...uploadedFilePlaceholders];

	const handleCheck = (id: string) => {
		selectedFileIds = selectedFileIds.some((el) => el === id)
			? selectedFileIds.filter((el) => el !== id)
			: [...selectedFileIds, id];
	};

	const handleUploadFiles = async (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		const uploadedFiles = e?.currentTarget?.files && e.currentTarget.files;

		if (!uploadedFiles || !uploadedFiles.length) return;

		const uploadedFileList = [...uploadedFiles];

		if (uploadedFileList.some((el) => ![...FILE_TYPES, ...IMAGE_TYPES].includes(el.type))) {
			notification = { message: 'Some files unsupported', type: 'error' };
			return;
		}

		const formData = new FormData();

		uploadedFileList.forEach((file: File) => {
			formData.append('files', file, file.name);
			uploadedFilePlaceholders = [
				...uploadedFilePlaceholders,
				{
					id: nanoid(),
					name: null,
					uniqueName: null,
					url: null,
					thumbnail: null,
					fileType: null,
					createdAt: new Date(),
					loading: true
				}
			];
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
			uploadedFilePlaceholders = [];
		}
	};

	const handleDelete = async () => {
		const ids = selectedFileIds;

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

			selectedFileIds = [];
		} catch (e) {
			console.log(e);
			notification = { message: 'Something went wrong...', type: 'error' };
		} finally {
			loading = false;
		}
	};

	const handleSearch = debounce(async (e: ComponentEvents<Input>['input']) => {
		const search = e.detail;

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

	const handleChangeLimit = async (e: ComponentEvents<Pagination>['select-per-page']) => {
		limit = e.detail.limit;
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

	const handleSelectAll = () => {
		selectedFileIds = selectedFileIds.length === files.length ? [] : [...files.map((el) => el.id)];
	};

	// TODO: Pagination not work!!!
	const handleNext = async () => {
		console.log({ page: files.length <= limit ? currentPage : currentPage + 1, limit });
	};

	const handlePrevious = async () => {
		console.log({ page: currentPage > 1 ? currentPage - 1 : 1, limit });
	};

	const handleChangeView = () => {
		$filesStore.view = $filesStore.view === 'list' ? 'grid' : 'list';
	};
</script>

<Notification
	message={notification?.message}
	type={notification?.type}
	show={Boolean(notification)}
/>

<div class="files__top">
	<h1 class="files__title">Files</h1>

	<div class="files__search">
		<Input placeholder="search" on:input={handleSearch}>
			<svelte:fragment slot="icon">
				<Search />
			</svelte:fragment>
		</Input>
	</div>

	<button class="button files__view" on:click={handleChangeView}>
		{#if $filesStore.view === 'grid'}
			<Grid />
		{:else}
			<List />
		{/if}
	</button>
	<button class="button" on:click={handleSelectAll} disabled={!Boolean(files.length)}
		>{selectedFileIds.length === files.length ? 'Unselect' : 'Select'} All</button
	>
	<button
		class="button files__button"
		disabled={!Boolean(selectedFileIds.length) || loading}
		on:click={handleDelete}
	>
		<Delete />
		Delete selected
	</button>
	<label>
		<div class="button files__button" class:files__button--disabled={loading}>
			<Add />
			Add files
		</div>
		<input
			class="files__input"
			type="file"
			on:change={handleUploadFiles}
			multiple
			disabled={loading}
		/>
	</label>
</div>
{#if renderedFiles && renderedFiles.length}
	<ul class="files__list">
		{#each renderedFiles as file (file.id)}
			<li class="files__item">
				{#if !file.loading}
					<div class="files__checkbox">
						<Checkbox
							width={30}
							height={30}
							checked={selectedFileIds.includes(file.id)}
							on:change={() => handleCheck(file.id)}
						/>
					</div>
				{/if}
				<div class="files__image">
					{#if file.fileType === 'application/pdf'}
						<div class="files__pdf"><PDF /></div>
					{:else if file.loading}
						<Spinner />
					{:else}
						<Image src={file.thumbnail} alt={file.name} />
					{/if}
				</div>
				<div class="files__info">
					{#if file.name}
						<h2 class="files__item-title">{file.name}</h2>
					{:else}
						<h2 class="files__item-title">loading...</h2>
					{/if}
				</div>
			</li>
		{/each}
	</ul>
{:else if hasError}
	<p>error...</p>
{:else}
	<p>no data</p>
{/if}

<Pagination
	withoutPages
	perPage={limit}
	disableNext={currentPage === 1}
	disablePrevious={files.length < limit}
	perPageOptions={[
		{ title: '50', value: 50 },
		{ title: '100', value: 100 },
		{ title: '200', value: 200 }
	]}
	on:select-per-page={handleChangeLimit}
	on:next={handleNext}
	on:previous={handlePrevious}
/>

<style>
	.files__top {
		display: flex;
		align-items: center;
		padding: 0 0 21px;
		margin-bottom: 43px;
		gap: 10px;
		border-bottom: 1px solid #d9d9d9;
	}
	.files__title {
		font-weight: 700;
		font-size: 24px;
		line-height: 36px;
	}

	.files__search {
		width: 250px;
		margin-left: 20px;
		margin-right: auto;
	}
	.files__button {
		display: flex;
		padding: 7px 10px 7px 15px;
		align-items: center;
		justify-content: space-between;
		gap: 11px;
	}
	.files__button--disabled,
	.files__button:disabled,
	.files__button:hover:disabled {
		background-color: #efefef;
		color: #d8d8d8;
		cursor: auto;
		--color-icon: #d8d8d8;
	}
	/* .spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	} */

	.files__list {
		display: grid;
		grid-template-columns: repeat(auto-fit, 250px);
		gap: 20px;
	}

	.files__item {
		position: relative;
		width: 250px;
		height: 250px;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
	}

	.files__checkbox {
		position: absolute;
		top: 5px;
		left: 5px;
	}
	.files__image {
		width: 100%;
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.files__pdf {
		--color-icon: #252525;
	}

	.files__info {
		padding: 10px;
	}
	.files__item-title {
		font-size: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}

	.files__input {
		display: none;
	}

	.files__view {
		margin-left: 20px;
	}
</style>
