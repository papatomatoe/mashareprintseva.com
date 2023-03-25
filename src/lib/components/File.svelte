<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { Clear } from '$lib/components/icons';
	export let label = '';
	export let files: FileList | null = null;
	export let error = '';
	export let name = '';
	export let placeholder = '';
	export let required = false;

	const dispatch = createEventDispatcher();

	const handleClearError = () => {
		dispatch('clearError');
	};

	const handleClear = () => {
		files = null;
		error = '';
	};

	const handleDrop = (e: DragEvent) => {
		if (e.dataTransfer?.items) {
			[...e.dataTransfer.items].forEach((item, i) => {
				if (item.kind === 'file') {
					const file = item.getAsFile();
					// @ts-ignore
					console.log(`… file[${i}].name = ${file.name}`);
				}
			});
		} else {
			[...(e.dataTransfer?.files || [])].forEach((file, i) => {
				console.log(`… file[${i}].name = ${file.name}`);
			});
		}
	};
</script>

<label class="field">
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
			class:field__input--error={error}
			type="file"
			bind:files
			on:input={handleClearError}
			{name}
			{placeholder}
		/>
		<div class="field__container" on:drop|preventDefault={handleDrop} on:dragover|preventDefault />
		<button class="field__button" type="button" on:click={handleClear}>
			<Clear />
		</button>
	</div>
	{#if error}
		<p class="field__error">{error}</p>
	{/if}
</label>

<style>
	.field {
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

	.field__input--error {
		border-color: #ff0000;
	}

	.field__input::placeholder {
		font-weight: 300;
		font-size: 14px;
		line-height: 23px;
		color: #d8d8d8;
	}

	.field__error {
		position: absolute;
		top: 100%;
		font-weight: 300;
		font-size: 9px;
		line-height: 14px;

		color: #ff0000;
	}
	.field__button {
		position: absolute;
		padding: 0;
		right: 5px;
		top: 18px;
		transform: translateY(-50%);
		width: 30px;
		height: 30px;
		display: grid;
		place-items: center;
		border: none;
		background-color: transparent;
		cursor: pointer;
		--color-icon: #d8d8d8;
	}

	.field__button:hover,
	.field__button:focus-visible {
		--color-icon: #8a6f48;
	}

	.field__button:active {
		--color-icon: #252525;
	}
</style>
