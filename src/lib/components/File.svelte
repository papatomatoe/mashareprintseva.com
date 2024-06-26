<script lang="ts">
	import { SvelteComponent, createEventDispatcher, type ComponentEvents } from 'svelte';
	import Spinner from '$lib/icons/Spinner.svelte';
	import Clear from '$lib/icons/Clear.svelte';
	import Modal from '$lib/components/Modal.svelte';
	import Filemanager from '$lib/components/Filemanager.svelte';
	import ConfirmPanel from '$lib/components/ConfirmPanel.svelte';
	import { FILE } from '$lib/constants/files';

	export let label = '';
	export let error = '';
	export let placeholder = "Drag 'n' drop image here, or click to select image";
	export let required = false;
	export let fileUrl = '';
	export let fileType = '';
	export let thumbnail = '';
	export let name = 'image';
	export let thumbnailName = 'thumbnail';

	let loading = false;
	let isDisabledSelectButton = true;

	let modal: SvelteComponent;
	let filemanager: SvelteComponent;
	let alt = 'thumbnail';

	const dispatch = createEventDispatcher();

	const handleClearError = () => {
		dispatch('clearError');
	};

	const handleClear = () => {
		error = '';
		fileUrl = '';
	};

	const handleDrop = async (e: DragEvent) => {
		if (e.dataTransfer?.items) {
			[...e.dataTransfer.items].forEach((item, i) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					file && uploadFile(file);
				}
			});
		} else {
			[...(e.dataTransfer?.files || [])].forEach((file, i) => {
				uploadFile(file);
			});
		}
	};

	const uploadFile = async (file: File) => {
		loading = true;
		try {
			const formData = new FormData();
			formData.append('files', file, file.name);

			const response = await fetch('/api/v2/files/upload', {
				method: 'POST',
				body: formData
			});

			const [savedFile] = await response.json();
			thumbnail = savedFile.thumbnail;
			fileUrl = savedFile.url;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	};

	const handleOpenFilemanager = async () => {
		handleClearError();
		await filemanager.fetchFilesData();
		modal.open();
	};

	const handleAddFiles = () => {
		const [file] = filemanager.getFiles();

		fileUrl = file.url;
		thumbnail = file.thumbnail;
		fileType = file.fileType;
		alt = file.name;

		filemanager.resetSelection();
		modal.close();
	};

	const handleCheckFiles = (e: ComponentEvents<Filemanager>['check']) => {
		isDisabledSelectButton = e.detail.ids.length !== 1;
	};

	const handleCancel = () => {
		filemanager.resetSelection();
		modal.close();
	};
</script>

<Modal bind:this={modal}>
	<Filemanager bind:this={filemanager} on:check={handleCheckFiles} />
	<div slot="bottom">
		<ConfirmPanel
			disabled={isDisabledSelectButton}
			on:cancel={handleCancel}
			on:confirm={handleAddFiles}
		/>
	</div>
</Modal>

<div class="field">
	<div class="field__label-wrapper">
		{#if label}
			<p class="field__label">
				<span class="field__text">
					{label}
				</span>
				{#if required}
					<span class="field__required">*</span>
				{/if}
			</p>
		{/if}
		<button type="button" class="field__wrapper" on:click={handleOpenFilemanager}>
			<input class="field__url" type="hidden" {name} bind:value={fileUrl} />
			<input class="field__url" type="hidden" name={thumbnailName} bind:value={thumbnail} />
			<div
				tabindex="0"
				role="button"
				class="field__container"
				class:field__container--error={error}
				on:drop|preventDefault={handleDrop}
				on:dragover|preventDefault
			>
				{#if loading}
					<div class="field__spinner"><Spinner /></div>
				{:else if fileUrl}
					<div class="field__preview" class:field__preview--svg={fileType === FILE.svg}>
						<img class="field__image" src={thumbnail} {alt} />
					</div>
				{:else}
					<p class="field__placeholder">{placeholder}</p>
				{/if}
			</div>
		</button>
	</div>

	{#if fileUrl}
		<button class="field__button" type="button" on:click={handleClear}>
			<Clear />
		</button>
	{/if}

	{#if error}
		<p class="field__error">{error}</p>
	{/if}
</div>

<style>
	.field {
		position: relative;
	}

	.field__label-wrapper {
		position: relative;
		display: grid;
	}

	.field__text {
		font-size: 15px;
		line-height: 23px;
		color: var(--color--gray-15);
	}

	.field__required {
		color: var(--color--red);
	}

	.field__wrapper {
		position: relative;
		background-color: transparent;
		border: none;
		padding: 0;
	}

	.field__container {
		display: grid;
		place-items: center;
		width: 100%;
		height: 120px;
		padding: 5px 10px 5px 10px;
		background: var(--color-bg);
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;

		font-weight: 300;
		font-size: 14px;
		line-height: 23px;
		font: var(--font--primary);
		color: var(--color--gray-30);
		outline: none;
		transition: border-color 0.3s linear;
		cursor: pointer;
	}

	.field__container:hover {
		border-color: var(--color--gray-85);
	}

	.field__container:focus {
		border-color: var(--color--primary);
	}

	.field__container--error,
	.field__container--error:hover,
	.field__container--error:focus {
		border-color: var(--color--red);
	}

	.field__placeholder {
		font-weight: 300;
		font-size: 14px;
		line-height: 23px;
		color: var(--color--gray-85);
	}

	.field__placeholder {
		left: 20px;
	}

	.field__error {
		position: absolute;
		top: 100%;
		font-weight: 300;
		font-size: 12px;
		line-height: 14px;

		color: var(--color--red);
	}
	.field__button {
		position: absolute;
		padding: 0;
		right: 5px;
		top: 43px;
		transform: translateY(-50%);
		width: 30px;
		height: 30px;
		display: grid;
		place-items: center;
		border: none;
		background-color: transparent;
		cursor: pointer;
		--color--icon: var(--color--gray-85);
		z-index: 1;
	}

	.field__button:hover,
	.field__button:focus-visible {
		--color--icon: var(--color--primary);
	}

	.field__button:active {
		--color--icon: var(--color--gray-15);
	}

	.field__preview {
		display: grid;
		grid-template-columns: 100px;
		grid-template-rows: 100px;
		place-items: center;
		position: relative;
		height: 100px;
		width: 100px;
	}
	.field__preview--svg {
		grid-template-columns: 30px;
		grid-template-rows: 30px;
		width: 30px;
		height: 30px;
	}
	.field__image {
		height: 100%;
		object-fit: contain;
	}

	.field__spinner {
		position: relative;
		left: 15px;
		--color--icon: var(--color--gray-85);
	}
</style>
