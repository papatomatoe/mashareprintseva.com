<script lang="ts">
	import AdminTable from '$lib/components/AdminTable.svelte';
	import DateTime from '$lib/components/DateTime.svelte';
	import type { ITableConfig, ITableData } from '$lib/components/Table.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: users = data.users;

	$: tableData = {
		data:
			users?.map(({ id, username, createdAt, role }) => ({
				id,
				username,
				createdAt,
				role: role?.name ?? ''
			})) ?? [],
		type: 'users'
	} as ITableData;

	let config: ITableConfig[] = [
		{
			key: 'select'
		},
		// {
		// 	key: 'id',
		// 	title: 'id',
		// 	sortable: true
		// },
		// {
		// 	key: 'active',
		// 	title: 'state',
		// 	sortable: true,
		// 	render: Status
		{
			key: 'username',
			title: 'Username',
			sortable: true
		},
		// },
		{
			key: 'role',
			title: 'role',
			sortable: true
		},
		// {
		// 	key: 'icon',
		// 	title: 'icon'
		// },

		// {
		// 	key: 'email',
		// 	title: 'email',
		// 	sortable: true
		// },
		{
			key: 'createdAt',
			title: 'created',
			render: DateTime,
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
