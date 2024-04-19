<script lang="ts">
	import AdminTable from '$lib/components/AdminTable.svelte';
	import Status from '$lib/components/Status.svelte';
	import type { ITableData, ITableConfig } from '$lib/components/Table.svelte';
	const tableData: ITableData = {
		data: Array(200)
			.fill('')
			.map((_, idx) => ({
				id: idx + 1,
				published: true,
				order: 8,
				title: 'Contemporary',
				slug: 'contemporary',
				created: '22.10.2023 10:30'
			})),
		type: 'sections'
	};

	let config: ITableConfig[] = [
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
	const handleAddNewItem = () => console.log('add new item');
	const handleDeleteItems = (e: CustomEvent) => console.log('delete selected items');
	const handleEditItem = (e: CustomEvent) => console.log('edit item ' + e.detail.id);
</script>

<AdminTable
	title="Sections"
	{tableData}
	{config}
	on:crate={handleAddNewItem}
	on:delete={handleDeleteItems}
	on:edit={handleEditItem}
/>
