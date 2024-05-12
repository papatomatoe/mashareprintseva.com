<script lang="ts">
	import { goto } from '$app/navigation';
	import AdminTable from '$lib/components/AdminTable.svelte';
	import DateTime from '$lib/components/DateTime.svelte';
	import Image from '$lib/components/Image.svelte';
	import Notification, { type NotificationType } from '$lib/components/Notification.svelte';
	import SectionLink from '$lib/components/SectionLink.svelte';
	import Status from '$lib/components/Status.svelte';
	import type { ITableConfig, ITableData, IProject } from '$lib/components/Table.svelte';
	import type { PageData } from './$types';
	export let data: PageData;

	let loading = false;
	let notification: { message: string; type: NotificationType } | null = null;

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

	const handleDeleteItems = async (e: CustomEvent) => {
		const ids = e.detail;

		loading = true;

		try {
			const response = await fetch('/api/v2/projects/delete', {
				method: 'DELETE',
				body: JSON.stringify(ids)
			});

			const deletedIds = await response.json();

			projects = projects?.filter((project) => !deletedIds.includes(project.id)) ?? [];

			notification = { message: 'Successfully deleted', type: 'success' };
		} catch (e) {
			console.error(e);
			notification = { message: 'Something went wrong...', type: 'error' };
		} finally {
			loading = false;
		}
	};
	const handleEditItem = async (e: CustomEvent) => {
		await goto(`/admin/projects/edit/${e.detail.id}`);
	};
</script>

<Notification
	message={notification?.message}
	type={notification?.type}
	show={Boolean(notification)}
/>

<AdminTable
	title="Projects"
	{tableData}
	{config}
	on:delete={handleDeleteItems}
	on:edit={handleEditItem}
/>
