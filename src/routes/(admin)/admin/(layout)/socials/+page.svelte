<script lang="ts">
	import type { SvelteComponent } from 'svelte';
	import { enhance, applyAction } from '$app/forms';
	import { goto, invalidateAll } from '$app/navigation';
	import Modal from '$lib/components/Modal.svelte';
	import File from '$lib/components/File.svelte';
	import Input from '$lib/components/Input.svelte';
	import ConfirmPanel from '$lib/components/ConfirmPanel.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: socials = data.socials;

	let modal: SvelteComponent;

	let icon;

	let title = '';
	let titleError = '';

	let link = '';
	let linkError = '';

	$: hasErrors = linkError || titleError;

	const handleClearTitleError = () => {
		titleError = '';
	};

	const handleClearLinkError = () => {
		linkError = '';
	};

	const handleSubmit = () => {
		if (!title) titleError = 'required';
		if (!link) linkError = 'required';
	};

	const handleClearFields = () => {
		title = '';
		titleError = '';
		link = '';
		linkError = '';
	};

	const handleCloseModal = () => {
		handleClearFields();
		modal.close();
	};

	const handleAddNewItem = () => console.log('add new item');
	const handleDeleteItems = (e: CustomEvent) => console.log('delete selected items');
	const handleEditItem = (e: CustomEvent) => console.log('edit item ' + e.detail.id);
</script>

<Modal
	bind:this={modal}
	on:close-modal={handleClearFields}
	width="650px"
	height="fit-content"
	padding="30px"
>
	<form
		method="POST"
		action="?/create"
		on:submit={handleSubmit}
		use:enhance={({ cancel }) => {
			if (hasErrors) cancel();
			return async ({ result }) => {
				if (result.type === 'redirect') {
					goto(result.location);
				} else {
					invalidateAll();
					await applyAction(result);
				}
			};
		}}
	>
		<h2 class="social-modal__title">Add Social Item</h2>
		<div class="social-modal__container">
			<div class="social-modal__file">
				<File label="icon" name="icon" required />
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
			<ConfirmPanel confirmText="Save" confirmType="submit" on:cancel={handleCloseModal} />
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
					aria-label="add social menu item"
					on:click={() => {
						modal.open();
					}}
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
