<script lang="ts">
	import AdminTable from '$lib/components/AdminTable.svelte';
	import Status from '$lib/components/Status.svelte';
	import type { ITableConfig } from '$lib/components/Table.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

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
	{config}
	on:crate={handleAddNewItem}
	on:delete={handleDeleteItems}
	on:edit={handleEditItem}
/>
