<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { enhance, applyAction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import Modal from '$lib/components/Modal.svelte';
	import File from '$lib/components/File.svelte';
	import Input from '$lib/components/Input.svelte';
	import ConfirmPanel from '$lib/components/ConfirmPanel.svelte';
	import type { PageData } from './$types';
	import Edit from '$lib/icons/Edit.svelte';
	import Delete from '$lib/icons/Delete.svelte';
	import type { ActionResult } from '@sveltejs/kit';
	import type { Social } from '@prisma/client';

	export let data: PageData;

	$: socials = data.socials;

	let createModal: SvelteComponent;
	let deleteModal: SvelteComponent;

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

	const handleOpenDeleteModal = (social: Social) => {
		title = social.title;
		id = social.id;
		deleteModal.open();
	};

	const handleOpenEditModal = (socials: Social) => {
		title = socials.title;
		oldTitle = socials.title;
		id = socials.id;
		icon = socials.icon;
		link = socials.link;
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
				{#each socials as social (social.id)}
					<li class="social__item">
						<div class="social__item-buttons">
							<button
								class="button social__item-button"
								type="button"
								aria-label="delete {social.title} item"
								on:click={() => handleOpenDeleteModal(social)}><Delete /></button
							>
							<button
								class="button social__item-button"
								type="button"
								aria-label="edit {social.title} item"
								on:click={() => handleOpenEditModal(social)}><Edit /></button
							>
						</div>
						<a
							class="social__link"
							href={social.link}
							target="_blank"
							rel="noopener noreferrer nofollow"
						>
							<h3 class="social__title">{social.title}</h3>
						</a>
						<img
							class="social__icon"
							src={social.icon}
							alt="{social.title} icon"
							width="40"
							height="40"
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
	}

	.social__item:hover .social__item-buttons {
		opacity: 1;
	}

	.social__item-buttons {
		opacity: 0;
		top: 0;
		right: 0;
		padding: 5px;
		position: absolute;
		display: grid;
		/* gap: 5px; */
	}

	.social__item-button {
		width: 30px;
		height: 30px;
		padding: 0;
		display: grid;
		place-items: center;
		background-color: var(--color--white);
		--color--icon: var(--color--gray-15);
	}

	.social__item-button:hover,
	.social__item-button:focus-visible {
		background-color: var(--color--gray-85);
	}
	.social__item-button:active {
		background-color: var(--color--gray-50);
		--color--icon: var(--color--white);
	}

	.social__item-buttons:has(.social__item-button:focus) {
		opacity: 1;
	}

	:global(.social__item-button svg) {
		width: 17px;
		height: 17px;
	}

	.social__icon {
		flex-grow: 1;
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
</style>
