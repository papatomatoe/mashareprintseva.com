<script lang="ts">
	import AdminTable from '$lib/components/AdminTable.svelte';
	import Status from '$lib/components/Status.svelte';
	import type { ITableData } from '$lib/components/Table.svelte';
	const tableData: ITableData = {
		data: Array(7)
			.fill('')
			.map((_, idx) => ({
				id: idx + 1,
				active: true,
				role: 'USER',
				username: 'test',
				email: 'test@test.test',
				created: '22.10.2023 10:30'
			})),
		type: 'users'
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
			key: 'active',
			title: 'state',
			sortable: true,
			render: Status
		},
		{
			key: 'role',
			title: 'role',
			sortable: true
		},
		{
			key: 'icon',
			title: 'icon'
		},
		{
			key: 'username',
			title: 'username',
			sortable: true
		},
		{
			key: 'email',
			title: 'email',
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
	title="Users"
	{tableData}
	{config}
	on:crate={handleAddNewItem}
	on:delete={handleDeleteItems}
	on:edit={handleEditItem}
/>
