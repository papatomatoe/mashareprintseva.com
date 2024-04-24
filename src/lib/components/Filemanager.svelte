<script context="module" lang="ts">
	export interface IPagination {
		total: number;
		page: number;
		perPage: number;
		pages: number;
	}
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

	export interface IInfo {
		size: string;
		bytes: number;
	}
</script>

<script lang="ts">
	import type { ComponentEvents } from 'svelte';
	import { nanoid } from 'nanoid';
	import Input from '$lib/components/Input.svelte';
	import type { NotificationType } from '$lib/components/Notification.svelte';
	import Notification from '$lib/components/Notification.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Icon from '$lib/components/Icon.svelte';
	import GridViewFiles from '$lib/components/GridViewFiles.svelte';
	import Table from '$lib/components/Table.svelte';
	import type { ITableConfig } from '$lib/components/Table.svelte';
	import Add from '$lib/icons/Add.svelte';
	import Delete from '$lib/icons/Delete.svelte';
	import Search from '$lib/icons/Search.svelte';
	import List from '$lib/icons/List.svelte';
	import Grid from '$lib/icons/Grid.svelte';
	import { FILE_TYPES, IMAGE_TYPES } from '$lib/constants/files';
	import { filesStore } from '$lib/stores/files/store';
	import { debounce } from '$lib/utils/debounce';
	import type { ViewType } from '$lib/stores/files/types';
	import Image from '$lib/components/Image.svelte';
	import DateTime from '$lib/components/DateTime.svelte';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let files: IFile[] = [];
	export let pagination: IPagination | null = null;
	export let info: IInfo | null = null;
	export let loading = false;

	let hasError = false;
	let selectedFileIds: string[] = [];
	let uploadedFilePlaceholders: IFile[] = [];
	let notification: { message: string; type: NotificationType } | null = null;

	$: renderedFiles = [...uploadedFilePlaceholders, ...files];

	export const getFiles = () => {
		return files.filter((el) => selectedFileIds.includes(el.id));
	};

	const handleFileCheck = (ids: string[]) => {
		dispatch('check', { ids });
	};

	$: handleFileCheck(selectedFileIds);

	const handleSelect = (e: ComponentEvents<GridViewFiles>['input']) => {
		const item = e.detail;

		const id = typeof item === 'string' ? item : item.id;

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
				{
					id: nanoid(),
					name: 'loading...',
					uniqueName: '',
					url: '',
					thumbnail: '',
					fileType: '-',
					createdAt: new Date(),
					loading: true
				},
				...uploadedFilePlaceholders
			];
		});

		loading = true;

		try {
			const response = await fetch('/api/v2/files/upload', { method: 'POST', body: formData });

			const newFiles = await response.json();

			// const idx = files.findIndex((file) => file.fileId === fileId);

			files = [...newFiles, ...files];

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
			console.error(e);
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

	export const fetchFilesData = async (
		params = {
			page: 0,
			perPage: 50
		}
	) => {
		loading = true;
		try {
			const response = await fetch('/api/v2/files/list', {
				method: 'POST',
				body: JSON.stringify(params)
			});
			const data = await response.json();

			files = data.files;
			pagination = data.pagination;
			info = data.info;
		} catch (e) {
			console.error(e);
			notification = { message: 'Something went wrong...', type: 'error' };
		} finally {
			loading = false;
		}
	};

	const handleChangePerPage = async (e: ComponentEvents<Pagination>['select-per-page']) => {
		await fetchFilesData({ page: 0, perPage: e.detail.perPage });
	};

	const handleChangePage = async (e: ComponentEvents<Pagination>['select-page']) => {
		const { page, perPage } = e.detail;

		await fetchFilesData({ page, perPage });
	};

	const handleSelectAll = () => {
		selectedFileIds = selectedFileIds.length === files.length ? [] : [...files.map((el) => el.id)];
	};

	const handleSelectAllInTableView = () => {
		selectedFileIds =
			selectedFileIds.length || selectedFileIds.length === files.length
				? []
				: [...files.map((el) => el.id)];
	};

	const handleChangeView = (view: ViewType) => {
		$filesStore.view = view;
	};

	const tableConfig: ITableConfig[] = [
		{
			key: 'select',
			width: 50
		},
		{
			key: 'thumbnail',
			title: 'Preview',
			width: 50,
			render: Image
		},
		{
			key: 'name',
			title: 'File name'
		},
		{
			key: 'fileType',
			title: 'File type',
			width: 200
		},
		{
			key: 'createdAt',
			title: 'Created',
			render: DateTime,
			width: 300
		}
	];
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

	<div class="files__view-control">
		<button
			class="button files__view"
			class:files__view--selected={$filesStore.view === 'grid'}
			on:click={() => handleChangeView('grid')}
		>
			<Grid />
		</button>
		<button
			class="button files__view"
			class:files__view--selected={$filesStore.view === 'list'}
			on:click={() => handleChangeView('list')}
		>
			<List />
		</button>
	</div>

	<button class="button" on:click={handleSelectAll} disabled={!Boolean(files.length)}
		>{selectedFileIds.length === files.length ? 'Unselect' : 'Select'} All</button
	>
	<button
		class="button files__button"
		disabled={!Boolean(selectedFileIds.length) || loading}
		on:click={handleDelete}
	>
		<Icon name="delete">
			<Delete />
		</Icon>
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
	<p class="files__info">
		Files directory size: <span class="files__info-value">{info?.size ?? '-'}</span>
	</p>
</div>
{#if renderedFiles && renderedFiles.length}
	{#if $filesStore.view === 'grid'}
		<GridViewFiles files={renderedFiles} {selectedFileIds} on:select={handleSelect} />
	{:else}
		<Table
			config={tableConfig}
			data={renderedFiles}
			selectedRowIds={selectedFileIds}
			isAllRowsSelected={selectedFileIds.length !== files.length}
			on:select={handleSelect}
			on:select-all={handleSelectAllInTableView}
		/>
	{/if}
{:else if hasError}
	<p>error...</p>
{:else}
	<p>no data</p>
{/if}

<Pagination
	currentPage={pagination?.page}
	pages={pagination?.pages}
	perPage={pagination?.perPage}
	perPageOptions={[
		{ title: '50', value: 50 },
		{ title: '100', value: 100 },
		{ title: '200', value: 200 }
	]}
	on:select-page={handleChangePage}
	on:select-per-page={handleChangePerPage}
/>

<style>
	.files__top {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		padding: 0 0 21px;
		margin-bottom: 43px;
		gap: 10px;
		border-bottom: 1px solid var(--color-border);
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
		background-color: var(--color-button-disabled);
		color: var(--color-button-disabled-text);
		cursor: auto;
		--color-icon: var(--color-button-disabled-icon);
	}

	.files__input {
		display: none;
	}

	.files__view-control {
		display: flex;
		gap: 5px;
		margin-right: 20px;
	}

	.files__view {
		height: 36px;
		width: 36px;
		display: grid;
		place-items: center;
		background-color: var(--color-unselected);
		--color-icon: var(--color-text);
	}

	.files__view:hover,
	.files__view:focus-visible {
		background-color: var(--color-button-hover);
		--color-icon: var(--color-button-icon);
	}
	.files__view:active {
		background-color: var(--color-button);
		--color-icon: var(--color-button-icon);
	}
	.files__view--selected,
	.files__view--selected:hover,
	.files__view--selected:focus-visible {
		cursor: auto;
		background-color: var(--color-text);
		--color-icon: var(--color-bg);
	}

	.files__info {
		width: 100%;
		padding: 10px 0 0;
	}
	.files__info-value {
		font-weight: 700;
	}
</style>
