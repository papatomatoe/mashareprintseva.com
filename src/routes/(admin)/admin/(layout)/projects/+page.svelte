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
	import Modal from '$lib/components/Modal.svelte';
	import ConfirmPanel from '$lib/components/ConfirmPanel.svelte';
	import type { SvelteComponent } from 'svelte';
	export let data: PageData;

	let loading = false;
	let notification: { message: string; type: NotificationType } | null = null;

	let deleteModal: SvelteComponent;
	let selectedItemIds: string[] = [];

	$: projects = data.projects;
	$: pagination = data.pagination;

	$: tableData = {
		type: 'projects',
		data: projects,
		pagination: pagination
	} as unknown as ITableData; // NOTE: wtf???

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
	export const fetchProjectsData = async (
		params = {
			page: 0,
			perPage: 50
		}
	) => {
		loading = true;
		try {
			const response = await fetch('/api/v2/projects/list', {
				method: 'POST',
				body: JSON.stringify(params)
			});
			const data = await response.json();

			projects = data.projects;
			pagination = data.pagination;
		} catch (e) {
			console.error(e);
			notification = { message: 'Something went wrong...', type: 'error' };
		} finally {
			loading = false;
		}
	};

	const handleSelectPerPage = async (e: CustomEvent) => {
		const { perPage } = e.detail;

		await fetchProjectsData({ page: 0, perPage });
	};

	const handleSelectPage = async (e: CustomEvent) => {
		const { page, perPage } = e.detail;
		await fetchProjectsData({ page, perPage });
	};
	const handleSearch = async (e: CustomEvent) => {
		const search = e.detail;

		loading = true;

		try {
			const response = await fetch('/api/v2/projects/search', {
				method: 'POST',
				body: JSON.stringify(search)
			});
			const searchedResult = await response.json();
			projects = searchedResult;
		} catch (e) {
			console.error(e);
			notification = { message: 'Something went wrong...', type: 'error' };
		} finally {
			loading = false;
		}
	};
	const handleClearSelectedItemIds = () => {
		selectedItemIds = [];
	};
	const handleDeleteItems = async (e: CustomEvent) => {
		loading = true;

		try {
			const response = await fetch('/api/v2/projects/delete', {
				method: 'DELETE',
				body: JSON.stringify(selectedItemIds)
			});

			const deletedIds = await response.json();

			projects = projects?.filter((project) => !deletedIds.includes(project.id)) ?? [];
			handleClearSelectedItemIds();

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
	const handleOpenDeleteItemsDialog = (e: CustomEvent) => {
		const ids = e.detail;
		selectedItemIds = ids;
		deleteModal.open();
	};

	const handleCloseDeleteModal = () => {
		deleteModal.close();
	};
</script>

<Notification
	message={notification?.message}
	type={notification?.type}
	show={Boolean(notification)}
/>

<Modal
	bind:this={deleteModal}
	on:close-modal={handleClearSelectedItemIds}
	width="350px"
	height="fit-content"
	padding="30px"
>
	<h2 class="delete-modal__title">Delete projects</h2>
	<p>Do you want to delete selected projects?</p>
	<div class="delete-modal__panel">
		<ConfirmPanel
			confirmText="Delete"
			on:confirm={handleDeleteItems}
			on:cancel={handleCloseDeleteModal}
		/>
	</div>
</Modal>

<AdminTable
	title="Projects"
	{tableData}
	{config}
	on:delete={handleOpenDeleteItemsDialog}
	on:edit={handleEditItem}
	on:search={handleSearch}
	on:select-per-page={handleSelectPerPage}
	on:select-page={handleSelectPage}
/>

<style>
	.delete-modal__title {
		color: var(--color--gray-30);
		margin-bottom: 30px;
	}
	.delete-modal__panel {
		padding-top: 40px;
	}
</style>
