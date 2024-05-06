<script lang="ts">
	import { goto } from '$app/navigation';
	import AdminTable from '$lib/components/AdminTable.svelte';
	import DateTime from '$lib/components/DateTime.svelte';
	import SectionLink from '$lib/components/SectionLink.svelte';
	import Status from '$lib/components/Status.svelte';
	import type { ITableConfig, ITableData } from '$lib/components/Table.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: projects = data.projects;

	$: tableData = {
		type: 'projects',
		data: projects
	} as unknown as ITableData; // NOTE: wtf???

	let config: ITableConfig[] = [
		{
			key: 'select'
		},
		// {
		// 	key: 'id',
		// 	title: 'id',
		// 	sortable: true
		// },
		{
			key: 'published',
			title: 'state',
			sortable: true,
			render: Status
		},
		{
			key: 'section',
			title: 'section',
			sortable: true,
			render: SectionLink
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
	const handleEditItem = async (e: CustomEvent) => {
		await goto(`/admin/projects/edit/${e.detail.id}}`);
	};
</script>

<AdminTable
	title="Projects"
	{tableData}
	{config}
	on:crate={handleAddNewItem}
	on:delete={handleDeleteItems}
	on:edit={handleEditItem}
/>
