<script lang="ts">
	import Table, { type IDataItem } from '$lib/components/Table.svelte';
	import Status from '$lib/components/Status.svelte';
	import Pagination from '$lib/components/Pagination.svelte';
	import Input from '$lib/components/Input.svelte';

	import { debounce } from '$lib/utils/debounce';
	let title = 'Sections';

	let selectedRows: IDataItem[] = [];

	let tableData = [
		{
			id: '1',
			published: true,
			order: 1,
			title: 'Tailoring & Couture',
			slug: 'tailoring-and-couture',
			created: '22.10.2023 10:30'
		},
		{
			id: '2',
			published: false,
			order: 2,
			title: 'Contemporary',
			slug: 'contemporary',
			created: '22.10.2023 10:30'
		}
	];

	let config = [
		{
			key: 'select'
		},
		{
			key: 'id',
			title: 'id',
			sortable: true
		},
		{
			key: 'published',
			title: 'state',
			sortable: true,
			render: Status
		},
		{
			key: 'order',
			title: 'order',
			sortable: true
		},
		{
			key: 'title',
			title: 'title',
			sortable: true
		},
		{
			key: 'slug',
			title: 'slug',
			sortable: true
		},
		{
			key: 'created',
			title: 'created',
			sortable: true
		},
		{
			key: 'edit'
		}
	];

	let searchResultData = tableData;

	const handleSelectAll = () => {
		selectedRows = selectedRows.length ? [] : [...tableData];
	};

	const handleSelect = (e: CustomEvent) => {
		const item = e.detail;

		const selectedItem = selectedRows.find((row) => row.id === item.id);

		selectedRows = selectedItem
			? [...selectedRows.filter((e) => e.id !== item.id)]
			: [...selectedRows, item];
	};

	const handleEdit = (e: CustomEvent) => console.log('edit ' + e.detail.title);

	const handleDelete = () => {
		console.log('delete selected items');
	};

	const search = (v: string) => {
		const value = v.toLocaleLowerCase();

		searchResultData = value
			? tableData.filter(
					(el) =>
						String(el.id).toLowerCase().includes(value) ||
						String(el.title).toLowerCase().includes(value) ||
						String(el.slug).toLowerCase().includes(value) ||
						String(el.created).toLowerCase().includes(value)
			  )
			: tableData;

		selectedRows = [];
	};

	const handleSearch = debounce((e: CustomEvent) => {
		search(e.detail);
	}, 500);

	$: console.log(searchResultData);
</script>

<div class="container">
	<div class="container__top">
		<h1 class="container__title">{title}</h1>
		<div class="container__search">
			<Input placeholder="search" on:input={handleSearch}>
				<svg
					slot="icon"
					xmlns="http://www.w3.org/2000/svg"
					width="17px"
					height="17px"
					viewBox="0 0 32 32"
				>
					<path
						fill="var(--color-icon)"
						d="m29 27.586l-7.552-7.552a11.018 11.018 0 1 0-1.414 1.414L27.586 29ZM4 13a9 9 0 1 1 9 9a9.01 9.01 0 0 1-9-9Z"
					/>
				</svg>
			</Input>
		</div>

		<button
			class="button container__button"
			disabled={Boolean(!selectedRows.length || !searchResultData.length)}
			on:click={handleDelete}
		>
			<svg
				width="10"
				height="13"
				viewBox="0 0 10 13"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					fill-rule="evenodd"
					clip-rule="evenodd"
					d="M3.84615 0C2.99648 0 2.30769 0.684741 2.30769 1.52941V2.29412L0.769231 2.29412C0.344396 2.29412 0 2.63649 0 3.05882C0 3.48116 0.344396 3.82353 0.769231 3.82353L9.23077 3.82353C9.6556 3.82353 10 3.48116 10 3.05882C10 2.63649 9.6556 2.29412 9.23077 2.29412H7.69231V1.52941C7.69231 0.684741 7.00352 0 6.15385 0H3.84615ZM6.15385 2.29412V1.52941H3.84615V2.29412H6.15385Z"
					fill="var(--color-icon)"
				/>
				<path
					d="M0.769231 5.35294V11.4706C0.769231 12.3153 1.45802 13 2.30769 13H7.69231C8.54198 13 9.23077 12.3153 9.23077 11.4706V5.35294C9.23077 5.35294 9.23077 4.58824 8.46154 4.58824C7.69231 4.58824 7.69231 5.35294 7.69231 5.35294V11.4706H2.30769V5.35294C2.30769 5.35294 2.30769 4.58824 1.53846 4.58824C0.769231 4.58824 0.769231 5.35294 0.769231 5.35294Z"
					fill="var(--color-icon)"
				/>
				<path
					d="M3.84615 5.35294C4.27099 5.35294 4.61538 5.69531 4.61538 6.11765V9.94118C4.61538 10.3635 4.27099 10.7059 3.84615 10.7059C3.42132 10.7059 3.07692 10.3635 3.07692 9.94118V6.11765C3.07692 5.69531 3.42132 5.35294 3.84615 5.35294Z"
					fill="var(--color-icon)"
				/>
				<path
					d="M6.15385 5.35294C6.57868 5.35294 6.92308 5.69531 6.92308 6.11765V9.94118C6.92308 10.3635 6.57868 10.7059 6.15385 10.7059C5.72901 10.7059 5.38462 10.3635 5.38462 9.94118V6.11765C5.38462 5.69531 5.72901 5.35294 6.15385 5.35294Z"
					fill="var(--color-icon)"
				/>
			</svg>
			Delete selected
		</button>
		<button class="button container__button">
			<svg
				width="10"
				height="10"
				viewBox="0 0 10 10"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M4.33333 4.33333L-1.89416e-07 4.33333L-2.47698e-07 5.66667L4.33333 5.66667L4.33333 10L5.66667 10L5.66667 5.66667L10 5.66667L10 4.33333L5.66667 4.33333L5.66667 -1.89416e-07L4.33333 -2.47698e-07L4.33333 4.33333Z"
					fill="var(--color-icon)"
				/>
			</svg>
			New Item
		</button>
	</div>
	<div class="container__bottom">
		<Table
			data={searchResultData}
			{config}
			{selectedRows}
			on:select-all={handleSelectAll}
			on:select={handleSelect}
			on:edit={handleEdit}
		/>
		<Pagination />
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
