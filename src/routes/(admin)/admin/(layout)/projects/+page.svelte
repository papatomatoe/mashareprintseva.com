<script lang="ts">
	import AdminTable from '$lib/components/AdminTable.svelte';
	import Status from '$lib/components/Status.svelte';
	import type { ITableConfig, ITableData } from '$lib/components/Table.svelte';

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
			key: 'section',
			title: 'section',
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

	const tableData: ITableData = {
		data: Array(76)
			.fill('')
			.map((_, idx) => ({
				id: String(idx + 1),
				published: true,
				section: 'Contemporary',
				title: 'Decay in Bloom',
				slug: 'decay-in-bloom',
				created: '22.10.2023 10:30'
			})),
		type: 'projects'
	};

	const handleAddNewItem = () => console.log('add new item');
	const handleDeleteItems = (e: CustomEvent) => console.log('delete selected items');
	const handleEditItem = (e: CustomEvent) => console.log('edit item ' + e.detail.id);
</script>

<AdminTable
	title="Projects"
	{tableData}
	{config}
	on:crate={handleAddNewItem}
	on:delete={handleDeleteItems}
	on:edit={handleEditItem}
/>
