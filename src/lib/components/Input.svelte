<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Repeat from '$lib/icons/Repeat.svelte';
	import Clear from '$lib/icons/Clear.svelte';

	export let label = '';
	export let value = '';
	export let error = '';
	export let name = '';
	export let placeholder = '';
	export let type = 'text';
	export let required = false;
	export let isSlug = false;
	export let disabled = false;

	const typeAction = (node: HTMLInputElement) => {
		node.type = type;
	};

	const dispatch = createEventDispatcher();

	const handleClear = () => {
		value = '';
		error = '';
		dispatch('clearError');
		dispatch('input', '');
	};

	const handleRegenerate = () => {
		dispatch('regenerate');
	};

	const handleInput = (e: Event) => {
		const target = e.target as HTMLInputElement;
		dispatch('clearError');
		dispatch('input', target.value);
	};

	$: withIcon = $$slots.icon;
</script>

<label class="field" class:field__disabled={disabled}>
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
		<div class="field__icon"><slot name="icon" /></div>
		<input
			class="field__input"
			class:field__input--error={error}
			class:field__input--with-icon={withIcon}
			use:typeAction
			bind:value
			on:change
			on:input={handleInput}
			{name}
			{placeholder}
			{disabled}
		/>
		{#if !disabled}
			{#if isSlug}
				<button class="field__button" type="button" on:click={handleRegenerate}>
					<Repeat />
				</button>
			{:else}
				<button
					class:field__button--visible={value}
					class="field__button field__button--clear"
					type="button"
					on:click={handleClear}
				>
					<Clear />
				</button>
			{/if}
		{/if}
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
		color: var(--color--gray-15);
	}

	.field__required {
		color: var(--color--red);
	}

	.field__wrapper {
		position: relative;
	}

	.field__input {
		width: 100%;
		padding: 5px 40px 5px 10px;
		background: var(--color--white);
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;

		font-weight: 300;
		font-size: 14px;
		line-height: 23px;
		font: var(--font--primary);
		color: var(--color--gray-30);
		outline: none;

		transition: border-color 0.3s linear;
	}

	.field__input:hover {
		border-color: var(--color--gray-30);
	}

	.field__input:focus-visible {
		border-color: var(--color--primary);
	}

	.field__input--error {
		border-color: var(--color--red);
	}

	.field__input::placeholder {
		font-weight: 300;
		font-size: 14px;
		line-height: 23px;
		color: var(--color--gray-85);
	}

	.field__error {
		position: absolute;
		top: 100%;
		font-weight: 300;
		font-size: 9px;
		line-height: 14px;

		color: var(--color--red);
	}
	.field__button {
		position: absolute;
		padding: 0;
		right: 5px;
		top: 50%;
		transform: translateY(-50%);
		width: 30px;
		height: 30px;
		display: grid;
		place-items: center;
		border: none;
		background-color: transparent;
		cursor: pointer;
		--color-icon: var(--color--gray-85);
	}

	.field__button:hover,
	.field__button:focus-visible {
		--color-icon: var(--color--primary);
	}

	.field__button:active {
		--color-icon: var(--color--gray-15);
	}

	.field__button--clear {
		display: none;
	}

	.field__button--visible {
		display: block;
	}
	.field__input--with-icon {
		padding-left: 25px;
	}

	.field__icon {
		height: fit-content;
		position: absolute;
		width: 17px;
		height: 17px;
		top: 50%;
		left: 5px;
		transform: translate(0, -50%);

		--color-icon: var(--color--gray-85);
	}

	.field__disabled .field__label .field__text {
		color: var(--color--gray-85);
	}
	.field__disabled .field__input,
	.field__disabled .field__input:hover {
		border-color: var(--color--gray-85);
		color: var(--color--gray-85);
	}
</style>
