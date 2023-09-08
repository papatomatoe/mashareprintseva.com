<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Spinner from '$lib/components/icons/Spinner.svelte';
	import Clear from '$lib/components/icons/Clear.svelte';

	export let label = '';
	export let error = '';
	export let name = '';
	export let placeholder = "Drag 'n' drop image here, or click to select image";
	export let required = false;
	export let fileUrl = '';
	export let preview = '';

	export let files: FileList | null = null;
	let loading = false;

	const dispatch = createEventDispatcher();

	const handleClearError = () => {
		dispatch('clearError');
	};

	const handleClear = () => {
		files = null;
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

	const toBase64 = (file: File) =>
		new Promise((resolve, reject) => {
			const reader = new FileReader();
			reader.readAsDataURL(file);
			reader.onload = () => resolve(reader.result);
			reader.onerror = (error) => reject(error);
		});

	const uploadFile = async (file: File) => {
		loading = true;
		try {
			const dataURI = await toBase64(file);

			const formData = new FormData();
			formData.append('file', dataURI as string);
			formData.append('fileName', file.name);

			const response = await fetch('/api/file/upload', {
				method: 'POST',
				body: formData
			});

			const { url, thumbnailUrl } = await response.json();
			preview = url;
			fileUrl = thumbnailUrl;
		} catch (e) {
			console.error(e);
		} finally {
			loading = false;
		}
	};

	const handleAddImage = async (
		e: Event & {
			currentTarget: EventTarget & HTMLInputElement;
		}
	) => {
		const file = e?.currentTarget?.files && e.currentTarget.files[0];
		file && (await uploadFile(file));
	};
</script>

<div class="field">
	<label class="field__label-wrapper">
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
		<div class="field__wrapper">
			<input
				accept="image/png, image/jpeg"
				class="field__input"
				type="file"
				bind:files
				on:input={handleClearError}
				on:change={handleAddImage}
				{placeholder}
			/>
			<input class="field__url" type="text" {name} bind:value={fileUrl} />
			<input class="field__url" type="text" name="preview" bind:value={preview} />
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
					<div class="field__preview">
						<img class="field__image" src={preview} alt="preview" />
					</div>
				{:else}
					<p class="field__placeholder">{placeholder}</p>
				{/if}
			</div>
		</div>
	</label>

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
		color: #252525;
	}

	.field__required {
		color: #f00;
	}

	.field__wrapper {
		position: relative;
	}

	.field__input {
		display: none;
	}

	.field__container {
		display: grid;
		place-items: center;
		width: 100%;
		height: 120px;
		padding: 5px 40px 5px 10px;
		background: #ffffff;
		border: 1px solid #d8d8d8;
		border-radius: 4px;

		font-weight: 300;
		font-size: 14px;
		line-height: 23px;
		font: var(--text--font);
		color: #454545;
		outline: none;
		transition: border-color 0.3s linear;
		cursor: pointer;
	}

	.field__container:hover {
		border-color: #454545;
	}

	.field__container:focus {
		border-color: #8a6f48;
	}

	.field__container--error,
	.field__container--error:hover,
	.field__container--error:focus {
		border-color: #ff0000;
	}

	.field__input::placeholder,
	.field__placeholder {
		font-weight: 300;
		font-size: 14px;
		line-height: 23px;
		color: #d8d8d8;
	}

	.field__placeholder {
		position: relative;
		left: 20px;
	}

	.field__error {
		position: absolute;
		top: 100%;
		font-weight: 300;
		font-size: 12px;
		line-height: 14px;

		color: #ff0000;
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
		--color-icon: #d8d8d8;
		z-index: 1;
	}

	.field__button:hover,
	.field__button:focus-visible {
		--color-icon: #8a6f48;
	}

	.field__button:active {
		--color-icon: #252525;
	}

	.field__preview {
		display: grid;
		grid-template-columns: 100px;
		grid-template-rows: 100px;
		place-items: center;
		position: relative;
		left: 15px;
		height: 100px;
		width: 100px;
	}
	.field__image {
		height: 100%;
		object-fit: contain;
	}

	.field__url {
		display: none;
	}

	.field__spinner {
		position: relative;
		left: 15px;
		--color-icon: #d8d8d8;
	}
</style>
