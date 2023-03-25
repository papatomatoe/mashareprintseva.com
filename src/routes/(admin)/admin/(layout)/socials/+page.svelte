<script lang="ts">
	import AdminTable from '$lib/components/AdminTable.svelte';
	import Status from '$lib/components/Status.svelte';
	import type { ITableData } from '$lib/components/Table.svelte';
	const tableData: ITableData = {
		data: Array(56)
			.fill('')
			.map((_, idx) => ({
				id: idx + 1,
				published: true,
				icon: '',
				title: 'etsy',
				link: 'https://www.etsy.com/shop/myrtusworkshop',
				created: '22.10.2023 10:30'
			})),
		type: 'socials'
	};

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
			key: 'icon',
			title: 'icon'
		},
		{
			key: 'title',
			title: 'title',
			sortable: true
		},
		{
			key: 'link',
			title: 'link',
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
	title="Socials"
	{tableData}
	{config}
	on:crate={handleAddNewItem}
	on:delete={handleDeleteItems}
	on:edit={handleEditItem}
/>
