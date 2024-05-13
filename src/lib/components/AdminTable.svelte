<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { page } from '$app/stores';
	import Table, { type ITableData, type ITableConfig } from '$lib/components/Table.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Input from '$lib/components/Input.svelte';
	import Add from '$lib/icons/Add.svelte';
	import Delete from '$lib/icons/Delete.svelte';

	const dispatch = createEventDispatcher();

	export let title: string;
	export let tableData: ITableData = { data: [], type: 'sections' };
	export let config: ITableConfig[];

	let selectedRowIds: string[] = [];
	let searchResultData = tableData.data;

	$: data = tableData.data;
	$: currentPath = $page.url.pathname;

	const handleSelectAll = () => {
		selectedRowIds = selectedRowIds.length ? [] : data.map((el) => el.id);
	};

	const handleSelect = (e: CustomEvent) => {
		const { id } = e.detail;

		selectedRowIds = selectedRowIds.some((el) => el === id)
			? selectedRowIds.filter((el) => el !== id)
			: [...selectedRowIds, id];
	};
	const handleDelete = () => {
		dispatch('delete', selectedRowIds);
	};
</script>

<div class="container">
	<div class="container__top">
		<h1 class="container__title">{title}</h1>
		<div class="container__search">
			<Input placeholder="search" type="search" on:search />
		</div>

		<button
			type="button"
			class="button container__button"
			disabled={Boolean(!selectedRowIds.length || !searchResultData.length)}
			on:click={handleDelete}
		>
			<Delete />
			Delete selected
		</button>
		<a class="button container__button" href={`${currentPath}/create`}>
			<Add />
			New Item
		</a>
	</div>
	<div class="container__bottom">
		<Table
			{data}
			{config}
			{selectedRowIds}
			isAllRowsSelected={selectedRowIds.length !== data.length}
			on:select-all={handleSelectAll}
			on:select={handleSelect}
			on:edit
		/>
		<Pagination
			currentPage={tableData?.pagination?.page}
			pages={tableData?.pagination?.pages}
			perPage={tableData?.pagination?.perPage}
			on:select-per-page
			on:select-page
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
		border-bottom: 1px solid var(--color--gray-85);
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
		background-color: var(--color--gray-95);
		color: var(--color--gray-85);
		cursor: auto;
		--color--icon: var(--color--gray-85);
	}
</style>
