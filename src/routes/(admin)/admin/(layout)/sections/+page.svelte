<script lang="ts">
	import AdminTable from '$lib/components/AdminTable.svelte';
	import DateTime from '$lib/components/DateTime.svelte';
	import Image from '$lib/components/Image.svelte';
	import Status from '$lib/components/Status.svelte';
	import type { ISection, ITableConfig, ITableData } from '$lib/components/Table.svelte';
	import type { ComponentEvents } from 'svelte';
	import type { PageData } from './$types';
	import Input from '$lib/components/Input.svelte';
	import Notification, { type NotificationType } from '$lib/components/Notification.svelte';
	import { goto } from '$app/navigation';

	export let data: PageData;

	let loading = false;
	let notification: { message: string; type: NotificationType } | null = null;

	$: sections = data.sections;

	$: tableData = {
		type: 'sections',
		data: sections
	} as ITableData;

	let config: ITableConfig[] = [
		{
			key: 'select'
		},
		{
			key: 'image',
			title: 'Image',
			render: Image
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
			key: 'createdAt',
			title: 'created',
			render: DateTime,
			sortable: true
		},
		{
			key: 'edit'
		}
	];
	const handleSearch = async (e: ComponentEvents<Input>['search']) => {
		const search = e.detail;

		loading = true;

		try {
			const response = await fetch('/api/v2/sections/search', {
				method: 'POST',
				body: JSON.stringify(search)
			});
			const searchedResult = await response.json();
			sections = searchedResult;
		} catch (e) {
			console.error(e);
			notification = { message: 'Something went wrong...', type: 'error' };
		} finally {
			loading = false;
		}
	};
	const handleDeleteItems = async (e: CustomEvent) => {
		const ids = e.detail.map((el: ISection) => el.id);

		loading = true;

		try {
			const response = await fetch('/api/v2/sections/delete', {
				method: 'DELETE',
				body: JSON.stringify(ids)
			});

			const deletedIds = await response.json();

			sections = sections.filter((section) => !deletedIds.includes(section.id));

			notification = { message: 'Successfully deleted', type: 'success' };
		} catch (e) {
			console.error(e);
			notification = { message: 'Something went wrong...', type: 'error' };
		} finally {
			loading = false;
		}
	};
	const handleEditItem = async (e: CustomEvent) => {
		await goto(`/admin/sections/edit/${e.detail.id}`);
	};
</script>

<Notification
	message={notification?.message}
	type={notification?.type}
	show={Boolean(notification)}
/>

<AdminTable
	title="Sections"
	{config}
	{tableData}
	on:delete={handleDeleteItems}
	on:edit={handleEditItem}
	on:search={handleSearch}
/>
