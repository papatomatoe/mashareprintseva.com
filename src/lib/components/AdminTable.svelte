<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Table, {
		type TableData,
		type ITableData,
		type ITableConfig,
		type ISocial,
		type IProject,
		type ISection,
		type IUser
	} from '$lib/components/Table.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Input from '$lib/components/Input.svelte';
	import { Add, Search, Delete } from '$lib/components/icons';
	import { debounce } from '$lib/utils/debounce';
	import { searchByData } from '$lib/utils/table';

	const dispatch = createEventDispatcher();

	export let title: string;
	export let tableData: ITableData = { data: [], type: 'sections' };
	export let config: ITableConfig[];

	let selectedRows: TableData[] = [];
	let searchResultData = tableData.data;
	let perPage = 10;
	let currentPage = 1;

	$: pages = Math.ceil(searchResultData.length / perPage);

	$: tableDataPerPage = searchResultData.slice(
		currentPage * perPage - perPage,
		currentPage * perPage
	);

	const handleSelectAll = () => {
		selectedRows = selectedRows.length ? [] : [...tableData.data];
	};

	const handleSelect = (e: CustomEvent) => {
		const item = e.detail;

		const selectedItem = selectedRows.find((row) => row.id === item.id);

		selectedRows = selectedItem
			? [...selectedRows.filter((e) => e.id !== item.id)]
			: [...selectedRows, item];
	};
	const handleDelete = () => dispatch('delete', selectedRows);
	const handleAddNewItem = () => dispatch('crate');

	const search = (val: string) => {
		const value = val.toLocaleLowerCase();
		if (!tableData.data) return;

		searchResultData = searchByData(value, tableData);

		selectedRows = [];
	};

	const handleSearch = debounce((e: CustomEvent) => {
		search(e.detail);
	}, 500);

	const handleSelectPerPage = (e: CustomEvent) => {
		perPage = e.detail;
	};

	const handleSelectCurrentPage = (e: CustomEvent) => {
		currentPage = e.detail;
	};
</script>

<div class="container">
	<div class="container__top">
		<h1 class="container__title">{title}</h1>
		<div class="container__search">
			<Input placeholder="search" on:input={handleSearch}>
				<svelte:fragment slot="icon">
					<Search />
				</svelte:fragment>
			</Input>
		</div>

		<button
			class="button container__button"
			disabled={Boolean(!selectedRows.length || !searchResultData.length)}
			on:click={handleDelete}
		>
			<Delete />
			Delete selected
		</button>
		<button class="button container__button" on:click={handleAddNewItem}>
			<Add />
			New Item
		</button>
	</div>
	<div class="container__bottom">
		<Table
			data={tableDataPerPage}
			{config}
			{selectedRows}
			on:select-all={handleSelectAll}
			on:select={handleSelect}
			on:edit
		/>
		<Pagination
			{pages}
			{perPage}
			{currentPage}
			on:select-per-page={handleSelectPerPage}
			on:select-page={handleSelectCurrentPage}
		/>
	</div>
</div>

<style>
	.container {
		padding: 60px;
	}
	.container__top {
		display: flex;
		align-items: center;
		padding: 0 0 21px;
		margin-bottom: 43px;
		gap: 10px;
		border-bottom: 1px solid #d9d9d9;
	}
	.container__title {
		font-weight: 700;
		font-size: 24px;
		line-height: 36px;
	}

	.container__search {
		width: 250px;
		margin-left: 20px;
		margin-right: auto;
	}
	.container__button {
		display: flex;
		padding: 7px 10px 7px 15px;
		align-items: center;
		justify-content: space-between;
		gap: 11px;
	}
	.container__button:disabled,
	.container__button:hover:disabled {
		background-color: #efefef;
		color: #d8d8d8;
		cursor: auto;
		--color-icon: #d8d8d8;
	}
</style>