<script lang="ts">
	import { onMount } from 'svelte';
	import { Spinner } from '$lib/components/icons';
	import Input from '$lib/components/Input.svelte';
	import { Search, Delete, Add, PDF } from '$lib/components/icons';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Pagination from '$lib/components/Pagination.svelte';

	let files: any[] = [];
	let nextCursor = null;
	let prevCursor = null;
	let loading = false;
	let hasError = false;
	let selectedFiles: string[] = [];
	let searchResultData = [];
	let total = 0;
	let perPage = 50;
	let currentPage = 1;

	$: pages = Math.ceil(total / perPage);
	$: getThumbnails(perPage);

	const getThumbnails = async (maxResults, next?) => {
		loading = true;
		hasError = false;
		try {
			const formData = new FormData();
			formData.append('max_results', String(maxResults));
			if (next) {
				formData.append('next_cursor', next);
			}
			const response = await fetch('/api/files', { method: 'POST', body: formData });
			const { data } = await response.json();
			console.log(data);
			files = data.resources;
			nextCursor = data.next_cursor;
			prevCursor = next;
			total = data.total_count;
		} catch (e) {
			hasError = true;
		} finally {
			loading = false;
		}
	};

	// onMount(async () => {
	// 	getThumbnails(perPage);
	// });

	const handleSearch = () => {};
	const handleDelete = () => {};
	const handleCheck = (id: string) => {
		selectedFiles = selectedFiles.some((el) => el === id)
			? selectedFiles.filter((el) => el !== id)
			: [...selectedFiles, id];
	};
	const handleSelectPerPage = (e) => {
		perPage = e.detail;
		getThumbnails(perPage);
	};
	const handleSelectPage = async (e) => {
		const newCurrentPage = e.detail;
		if (newCurrentPage > currentPage) {
			console.log('next');
			await getThumbnails(perPage, nextCursor);
		} else if (newCurrentPage < currentPage) {
			console.log('prev');
			await getThumbnails(perPage, prevCursor);
		} else {
			return;
		}
		currentPage = e.detail;
	};

	$: console.log(prevCursor, nextCursor);
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
		disabled={Boolean(!selectedFiles.length)}
		on:click={handleDelete}
	>
		<Delete />
		Delete selected
	</button>
	<button class="button files__button">
		<Add />
		Add Files
	</button>
</div>
{#if loading}
	<div class="spinner"><Spinner /></div>
{:else if files && files.length}
	<ul class="files__list">
		{#each files as file (file.asset_id)}
			<li class="files__item">
				<div class="files__checkbox">
					<Checkbox width={30} height={30} on:change={() => handleCheck(file.public_id)} />
				</div>
				<div class="files__image">
					{#if file.format === 'pdf'}
						<div class="files__pdf"><PDF /></div>
					{:else}
						<img src={file.url} alt={file.filename} />
					{/if}
				</div>
				<div class="files__info">
					<h2 class="files__item-title">{file.filename.split('thumbnail_').join('')}</h2>
				</div>
			</li>
		{/each}
	</ul>
	<Pagination
		{perPage}
		{pages}
		{currentPage}
		perPageOptions={[
			{ title: '50', value: 50 },
			{ title: '100', value: 100 },
			{ title: '200', value: 200 }
		]}
		on:select-per-page={handleSelectPerPage}
		on:select-page={handleSelectPage}
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
	.files__button:disabled,
	.files__button:hover:disabled {
		background-color: #efefef;
		color: #d8d8d8;
		cursor: auto;
		--color-icon: #d8d8d8;
	}
	.spinner {
		position: absolute;
		top: 50%;
		left: 50%;
		transform: translate(-50%, -50%);
	}

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
</style>
