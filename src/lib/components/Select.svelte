<script context="module" lang="ts">
	export interface IOption {
		title: string;
		value: unknown;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';
	import { clickOutside } from '$lib/utils/clickOutside';

	const dispatch = createEventDispatcher();

	export let label = '';
	export let options: IOption[] = [];
	export let selected: IOption | null = null;
	export let placeholder = 'select...';
	export let clearable = false;
	export let select2 = false;

	let visible = false;
	let inputValue = '';

	let selectElement: HTMLDivElement;
	let optionsElement: HTMLUListElement;
	let inputElement: HTMLInputElement;

	let dropdownPosition: string = 'calc(100% + 2px)';

	$: inputElement && inputElement.focus();

	$: {
		if (browser && selectElement && optionsElement) {
			const positionBottom = selectElement.getBoundingClientRect().bottom;
			const bodyHeight = document.body.offsetHeight;
			const optionsHeight = optionsElement.offsetHeight;
			dropdownPosition =
				positionBottom + optionsHeight >= bodyHeight
					? `-${optionsHeight + 2}px`
					: 'calc(100% + 2px)';
		}
	}

	$: selectedOption = selected;

	$: filteredOptions = options.filter((option) =>
		option.title.toLowerCase().includes(inputValue.toLowerCase())
	);

	$: {
		if (!inputValue) selectedOption = null;
	}

	const handleSelect = (option: { title: string; value: unknown }) => {
		if (!clearable) {
			selectedOption = option;
			inputValue = '';
		}
		dispatch('select', option);
		visible = false;
	};

	const handleVisible = () => {
		visible = !visible;
	};
</script>

{#if label}<p class="label">{label}</p>{/if}

<div
	class="select"
	use:clickOutside
	on:click-outside={() => {
		visible = false;
	}}
	bind:this={selectElement}
>
	{#if select2}
		{#if visible}
			<label class="select__input">
				<input class="select__field" type="text" bind:this={inputElement} bind:value={inputValue} />
				<svg
					class="icon"
					class:icons--open={visible}
					width="11"
					height="6"
					viewBox="0 0 11 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 1L5.5 5L10 1"
						stroke="var(--color--gray-85)"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</label>
		{:else}
			<button
				class="select__button select__button--selected"
				type="button"
				on:click={() => {
					handleVisible();
				}}
			>
				{#if inputValue}
					{inputValue}
				{:else}
					<span class="select__placeholder">{placeholder}</span>
				{/if}
				<svg
					class="icon"
					class:icons--open={visible}
					width="11"
					height="6"
					viewBox="0 0 11 6"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 1L5.5 5L10 1"
						stroke="var(--color--gray-85)"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		{/if}
	{:else}
		<button class="select__button select__button--selected" type="button" on:click={handleVisible}>
			{#if selected}
				{selected.title}
			{:else}
				<span class="select__placeholder">{placeholder}</span>
			{/if}
			<svg
				class="icon"
				class:icons--open={visible}
				width="11"
				height="6"
				viewBox="0 0 11 6"
				fill="none"
				xmlns="http://www.w3.org/2000/svg"
			>
				<path
					d="M1 1L5.5 5L10 1"
					stroke="var(--color--gray-85)"
					stroke-width="2"
					stroke-linecap="round"
					stroke-linejoin="round"
				/>
			</svg>
		</button>
	{/if}

	{#if filteredOptions.length && visible}
		<ul style:top={dropdownPosition} class="select__options" bind:this={optionsElement}>
			{#each filteredOptions as option (option.value)}
				<li class="select__option">
					<button class="select__button" type="button" on:click={() => handleSelect(option)}>
						{option.title}
					</button>
				</li>
			{/each}
		</ul>
	{/if}
</div>

<style>
	.select {
		position: relative;
		border-radius: 4px;
		height: 34px;
	}

	.select__button {
		border: none;
		width: 100%;
		height: 100%;
		min-height: 34px;
		background-color: transparent;
		padding: 5px 7px;
		cursor: pointer;
		text-align: left;
		border-radius: 4px;
	}
	.select__button:hover,
	.select__button:focus-visible {
		background-color: var(--color--gray-85);
	}

	.select__button--selected {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: var(--color--white);
		border: 1px solid var(--color--gray-85);
	}

	.select__button--selected:hover,
	.select__button--selected:focus-visible {
		background-color: var(--color--white);
		border: 1px solid var(--color--gray-85);
	}
	.icons--open {
		transform: rotateZ(180deg);
	}

	.select__options {
		padding: 2px;
		display: grid;
		position: absolute;
		width: 100%;
		top: calc(100% + 2px);
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;
		background-color: var(--color--white);
		gap: 4px;
		z-index: 1;
	}

	.select__placeholder {
		color: var(--color--gray-85);
	}

	.select__input {
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;
		padding: 5px 7px;
		display: grid;
		height: 100%;
		grid-template-columns: 1fr min-content;
		align-items: center;
		gap: 10px;
	}

	.select__field {
		height: 100%;
		padding: 0;
		border: none;
		outline: 0;
	}
</style>
