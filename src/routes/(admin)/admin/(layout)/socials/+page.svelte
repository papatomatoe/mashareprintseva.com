<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { enhance, applyAction } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Modal from '$lib/components/Modal.svelte';
	import File from '$lib/components/File.svelte';
	import Input from '$lib/components/Input.svelte';
	import ConfirmPanel from '$lib/components/ConfirmPanel.svelte';
	import SocialItem from '$lib/components/SocialItem.svelte';
	import type { PageData } from './$types';
	import type { ActionResult } from '@sveltejs/kit';
	import type { Social } from '@prisma/client';

	export let data: PageData;

	$: socials = data.socials;

	let createModal: SvelteComponent;
	let deleteModal: SvelteComponent;

	let mouseYCoordinate: number | null = null;
	let mouseXCoordinate: number | null = null;

	let distanceTopGrabbedVsPointer: number | null = null;
	let distanceLeftGrabbedVsPointer: number | null = null;

	let draggingItem: Social | null = null;
	let draggingItemId: string | null = null;
	let draggingItemIndex: number | null = null;

	let hoveredItemIndex: number | null = null;

	$: {
		if (
			mouseYCoordinate == null ||
			mouseYCoordinate == 0 ||
			mouseXCoordinate == null ||
			mouseXCoordinate == 0
		) {
			// showGhost = false;
		}
	}

	$: {
		if (
			draggingItemIndex != null &&
			hoveredItemIndex != null &&
			draggingItemIndex != hoveredItemIndex &&
			socials
		) {
			// swap items
			[socials[draggingItemIndex], socials[hoveredItemIndex]] = [
				socials[hoveredItemIndex],
				socials[draggingItemIndex]
			];

			// balance
			draggingItemIndex = hoveredItemIndex;
		}
	}

	const layoutOffsetX = 250;
	const layoutOffsetY = 90;

	$: socialItemGhostStyle = `left: ${
		(mouseXCoordinate ?? 0) + (distanceLeftGrabbedVsPointer ?? 0) - layoutOffsetX
	}px; top: ${(mouseYCoordinate ?? 0) + (distanceTopGrabbedVsPointer ?? 0) - layoutOffsetY}px;`;

	const handleDragStart = (
		e: DragEvent & {
			currentTarget: EventTarget & HTMLLIElement;
		},
		social: Social,
		index: number
	) => {
		const clientX = e.clientX;
		const clientY = e.clientY;
		const { x, y } = e.currentTarget.getBoundingClientRect();

		mouseXCoordinate = clientX;
		mouseYCoordinate = clientY;

		draggingItem = social;
		draggingItemIndex = index;
		draggingItemId = social.id;

		distanceLeftGrabbedVsPointer = x - clientX;

		distanceTopGrabbedVsPointer = y - clientY;
	};
	const handleDrag = (
		e: DragEvent & {
			currentTarget: EventTarget & HTMLLIElement;
		}
	) => {
		mouseXCoordinate = e.clientX;
		mouseYCoordinate = e.clientY;
	};
	const handleDragOver = (index: number) => {
		hoveredItemIndex = index;
	};
	const handleDragEnd = () => {
		draggingItemId = null;
		hoveredItemIndex = null;
	};

	const MODAL_TYPE = {
		create: {
			action: '?/create',
			title: (item?: string) => 'Create Social Item'
		},
		edit: {
			action: '?/edit',
			title: (item?: string) => `Edit ${item}`
		}
	};

	let modal: Record<string, any> | null = null;

	let id = '';

	let icon = '';
	let iconError = '';

	let title = '';
	let titleError = '';
	let oldTitle = '';

	let link = '';
	let linkError = '';

	$: hasErrors = linkError || titleError || iconError;

	const handleClearTitleError = () => {
		titleError = '';
	};

	const handleClearLinkError = () => {
		linkError = '';
	};

	const handleClearIconError = () => {
		iconError = '';
	};

	const handleSubmit = () => {
		if (!title) titleError = 'required';
		if (!link) linkError = 'required';
		if (!icon) iconError = 'required';
	};

	const handleClearFields = () => {
		icon = '';
		iconError = '';
		title = '';
		titleError = '';
		link = '';
		linkError = '';
		id = '';
		oldTitle = '';
	};

	const handleCloseCreateModal = () => {
		handleClearFields();
		createModal.close();
		modal = null;
	};

	const handleCloseDeleteModal = () => {
		handleClearFields();
		deleteModal.close();
	};

	const handleOpenCreateModal = () => {
		modal = MODAL_TYPE.create;
		createModal.open();
	};

	const handleOpenDeleteModal = (e: CustomEvent) => {
		const social = e.detail;

		title = social.title;
		id = social.id;
		deleteModal.open();
	};

	const handleOpenEditModal = (e: CustomEvent) => {
		const social = e.detail;
		title = social.title;
		oldTitle = social.title;
		id = social.id;
		icon = social.icon;
		link = social.link;
		modal = MODAL_TYPE.edit;
		createModal.open();
	};

	const handleEnhance = ({ cancel }: { formElement: HTMLFormElement; cancel: () => void }) => {
		if (hasErrors) cancel();
		return async ({ result }: { result: ActionResult }) => {
			if (result.type === 'failure') {
				const error = result.data;

				if (error?.target === 'title') titleError = error.message;
				return;
			}
			if (result.type === 'success') {
				createModal && handleCloseCreateModal();
				deleteModal && handleCloseDeleteModal();
			}
			invalidateAll();
			await applyAction(result);
		};
	};
</script>

<Modal
	bind:this={createModal}
	on:close-modal={handleClearFields}
	width="650px"
	height="fit-content"
	padding="30px"
>
	<form method="POST" action={modal?.action} on:submit={handleSubmit} use:enhance={handleEnhance}>
		<input type="hidden" name="id" bind:value={id} />
		<h2 class="social-modal__title">{modal?.title(oldTitle)}</h2>
		<div class="social-modal__container">
			<div class="social-modal__file">
				<File
					label="icon"
					name="icon"
					required
					bind:fileUrl={icon}
					bind:thumbnail={icon}
					bind:error={iconError}
					on:clearError={handleClearIconError}
				/>
			</div>
			<div class="social-modal__input social-modal__input--title">
				<Input
					label="title"
					name="title"
					bind:value={title}
					error={titleError}
					on:clearError={handleClearTitleError}
					required
				/>
			</div>
			<div class="social-modal__input social-modal__input--link">
				<Input
					label="link"
					name="link"
					bind:value={link}
					error={linkError}
					on:clearError={handleClearLinkError}
					required
				/>
			</div>
		</div>
		<div class="social-modal__panel">
			<ConfirmPanel confirmText="Save" confirmType="submit" on:cancel={handleCloseCreateModal} />
		</div>
	</form>
</Modal>
<Modal
	bind:this={deleteModal}
	on:close-modal={handleClearFields}
	width="350px"
	height="fit-content"
	padding="30px"
>
	<form method="POST" action="?/delete" use:enhance={handleEnhance}>
		<h2 class="social-modal__title">Delete item</h2>
		<p>Do you want to delete <b>{title}</b> item?</p>
		<input type="hidden" name="id" bind:value={id} />
		<div class="social-modal__panel">
			<ConfirmPanel confirmText="Delete" confirmType="submit" on:cancel={handleCloseDeleteModal} />
		</div>
	</form>
</Modal>

<div class="social-wrapper">
	<h1>Social Menu</h1>
	<section class="social">
		<h2 class="v-h">List</h2>
		<ul class="social__list">
			{#if socials?.length}
				{#if mouseXCoordinate && mouseYCoordinate && draggingItem}
					<li class="social__item social__item--ghost" style={socialItemGhostStyle}>
						<SocialItem item={draggingItem} />
					</li>
				{/if}
				{#each socials as social, index (social.id)}
					<li
						class="social__item"
						class:social__item--invisible={draggingItemId === social.id}
						draggable="true"
						on:dragstart={(e) => handleDragStart(e, social, index)}
						on:drag={handleDrag}
						on:dragover={() => handleDragOver(index)}
						on:dragend={handleDragEnd}
					>
						<SocialItem
							item={social}
							on:delete={handleOpenDeleteModal}
							on:edit={handleOpenEditModal}
						/>
					</li>
				{/each}
			{/if}
			<li class="social__item social__item--add">
				<button
					class="button social__button"
					type="button"
					aria-label="add new social menu item"
					on:click={handleOpenCreateModal}
				></button>
			</li>
		</ul>
	</section>
</div>

<style>
	.social-wrapper {
		padding: 60px;
	}

	.social__list {
		margin: 30px 0;
		display: grid;
		grid-template-columns: repeat(auto-fit, 150px);
		gap: 25px;
	}

	.social__item {
		position: relative;
		display: flex;
		flex-direction: column-reverse;
		gap: 10px;
		align-items: center;
		justify-content: center;
		width: 150px;
		height: 150px;
		padding: 10px;
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;
		background-color: var(--color--white);
		cursor: grab;
	}

	:global(.social__item:hover .social__item-buttons) {
		opacity: 1;
	}

	.social__item--add {
		border-style: dashed;
		padding: 0;
	}

	.social__item--add:hover {
		background-color: transparent;
	}

	.social__button {
		position: relative;
		width: 100%;
		height: 100%;
		background-color: transparent;
	}

	.social__button:hover,
	.social__button:focus-visible {
		background-color: var(--color--gray-95);
	}

	.social__button:active {
		opacity: 0.5;
	}
	.social__button::before,
	.social__button::after {
		position: absolute;
		content: '';
		background-color: var(--color--gray-85);
		width: 30px;
		height: 2px;
		top: 50%;
		left: 50%;
		translate: -50% -50%;
	}
	.social__button::after {
		rotate: 90deg;
	}

	.social-modal__title {
		color: var(--color--gray-30);
		margin-bottom: 30px;
	}

	.social-modal__container {
		display: grid;
		grid-template-columns: 200px 1fr;
		grid-template-rows: min-content 1fr;
		gap: 0 20px;
	}

	.social-modal__file {
		grid-row: 1/ 3;
		grid-column: 1 /2;
	}
	.social-modal__input {
		grid-column: 2/-1;
	}

	.social-modal__input--title {
		grid-row: 1 /2;
	}
	.social-modal__input--link {
		grid-row: 2/3;
		align-self: end;
	}

	.social-modal__panel {
		padding-top: 40px;
	}

	.social__item--ghost {
		margin-bottom: 10px;
		pointer-events: none;
		z-index: 99;
		position: absolute;
		top: 0;
		left: 10;
		cursor: grab;
	}
	.social__item--invisible {
		opacity: 0;
	}
</style>
