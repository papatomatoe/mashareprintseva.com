<script lang="ts">
	import AdminTable from '$lib/components/AdminTable.svelte';
	import DateTime from '$lib/components/DateTime.svelte';
	import Image from '$lib/components/Image.svelte';
	import Status from '$lib/components/Status.svelte';
	import type { ITableConfig, ITableData } from '$lib/components/Table.svelte';
	import type { ComponentEvents, SvelteComponent } from 'svelte';
	import type { PageData } from './$types';
	import Input from '$lib/components/Input.svelte';
	import Notification, { type NotificationType } from '$lib/components/Notification.svelte';
	import { goto } from '$app/navigation';
	import Modal from '$lib/components/Modal.svelte';
	import ConfirmPanel from '$lib/components/ConfirmPanel.svelte';

	export let data: PageData;

	let deleteModal: SvelteComponent;

	let loading = false;
	let notification: { message: string; type: NotificationType } | null = null;
	let selectedItemIds: string[] = [];

	$: sections = data.sections;
	$: pagination = data.pagination;

	$: tableData = {
		type: 'sections',
		data: sections,
		pagination: pagination
	} as ITableData;

	let config: ITableConfig[] = [
		{
			key: 'select'
		},
		{
			key: 'image',
			title: 'image',
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
	const handleClearSelectedItemIds = () => {
		selectedItemIds = [];
	};
	const handleDeleteItems = async (e: CustomEvent) => {
		loading = true;

		try {
			const response = await fetch('/api/v2/sections/delete', {
				method: 'DELETE',
				body: JSON.stringify(selectedItemIds)
			});

			const deletedIds = await response.json();

			sections = sections?.filter((section) => !deletedIds.includes(section.id)) ?? [];
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
		await goto(`/admin/sections/edit/${e.detail.id}`);
	};

	export const fetchSectionsData = async (
		params = {
			page: 0,
			perPage: 50
		}
	) => {
		loading = true;
		try {
			const response = await fetch('/api/v2/sections/list', {
				method: 'POST',
				body: JSON.stringify(params)
			});
			const data = await response.json();

			sections = data.sections;
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

		await fetchSectionsData({ page: 0, perPage });
	};

	const handleSelectPage = async (e: CustomEvent) => {
		const { page, perPage } = e.detail;
		await fetchSectionsData({ page, perPage });
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
	<h2 class="delete-modal__title">Delete sections</h2>
	<p>Do you want to delete selected sections?</p>
	<div class="delete-modal__panel">
		<ConfirmPanel
			confirmText="Delete"
			on:confirm={handleDeleteItems}
			on:cancel={handleCloseDeleteModal}
		/>
	</div>
</Modal>

<AdminTable
	title="Sections"
	{config}
	{tableData}
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
