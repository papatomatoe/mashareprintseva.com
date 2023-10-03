<script context="module" lang="ts">
	export interface IFile {
		id: number;
		name: string | null;
		uniqueName: string | null;
		url: string | null;
		thumbnail: string | null;
		fileType: string | null;
		createdAt: Date;
	}
</script>

<script lang="ts">
	import { createEventDispatcher, type ComponentEvents } from 'svelte';
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import Input from '$lib/components/Input.svelte';
	import Search from '$lib/components/icons/Search.svelte';
	import Delete from '$lib/components/icons/Delete.svelte';
	import Add from '$lib/components/icons/Add.svelte';
	import PDF from '$lib/components/icons/PDF.svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	const dispatch = createEventDispatcher();

	export let files: IFile[] = [];
	export let loading = false;
	let hasError = false;
	let selectedFileIds: number[] = [];
	let limit = 50;
	let currentPage = 1;

	const handleSearch = (e: ComponentEvents<Input>['input']) => {
		const search = e.detail;
		dispatch('search', {
			search
		});
	};

	const handleDelete = () => {
		dispatch('delete', { ids: selectedFileIds });
		selectedFileIds = [];
	};

	const handleAddFiles = (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		const uploadedFiles = e?.currentTarget?.files && e.currentTarget.files;

		files && dispatch('add', { uploadedFiles });
	};

	const handleCheck = (id: number) => {
		selectedFileIds = selectedFileIds.some((el) => el === id)
			? selectedFileIds.filter((el) => el !== id)
			: [...selectedFileIds, id];
	};

	const handleSelectPerPage = (e: ComponentEvents<Pagination>['select-per-page']) => {
		limit = e.detail.limit;
		dispatch('change-limit', { limit, page: 1 });
	};

	const handleNext = async () => {
		dispatch('next', { page: files.length <= limit ? currentPage : currentPage + 1, limit });
	};
	const handlePrevious = async () => {
		dispatch('previous', { page: currentPage > 1 ? currentPage - 1 : 1, limit });
	};
</script>

<div class="files__top">
	<h1 class="files__title">Files</h1>
	<div class="files__search">
		<Input placeholder="search" on:input={handleSearch}>
			<svelte:fragment slot="icon">
				<Search />
			</svelte:fragment>
		</Input>
	</div>

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
			on:change={handleAddFiles}
			multiple
			disabled={loading}
		/>
	</label>
</div>
{#if files && files.length}
	<ul class="files__list">
		{#each files as file (file.id)}
			<li class="files__item">
				<div class="files__checkbox">
					<Checkbox width={30} height={30} on:change={() => handleCheck(file.id)} />
				</div>
				<div class="files__image">
					{#if file.fileType === 'application/pdf'}
						<div class="files__pdf"><PDF /></div>
						<!-- {:else if file.loading}
						<Spinner /> -->
					{:else}
						<img src={file.thumbnail} alt={file.name} />
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
		on:select-per-page={handleSelectPerPage}
		on:next={handleNext}
		on:previous={handlePrevious}
	/>
{:else if hasError}
	<p>error...</p>
{:else}
	<p>no data</p>
{/if}

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

	.files__image img {
		width: 175px;
		height: 155px;
		object-fit: contain;
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
</style>
