<script context="module" lang="ts">
	export interface IOption {
		title: string;
		value: any;
	}
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import { browser } from '$app/environment';

	const dispatch = createEventDispatcher();

	export let options: IOption[] = [];
	export let selected: IOption | null = null;
	export let placeholder = 'select...';
	export let clearable = false;

	let visible = false;
	let ref: HTMLDivElement;
	let optionsRef: HTMLUListElement;
	let dropdownPosition: string = 'calc(100% + 2px)';

	$: {
		if (browser && ref && optionsRef) {
			const positionBottom = ref.getBoundingClientRect().bottom;
			const bodyHeight = document.body.offsetHeight;
			const optionsHeight = optionsRef.offsetHeight;
			dropdownPosition =
				positionBottom + optionsHeight >= bodyHeight
					? `-${optionsHeight + 2}px`
					: 'calc(100% + 2px)';
		}
	}

	$: selectedOption = selected;

	const handleSelect = (option: { title: string; value: string }) => {
		if (!clearable) {
			selectedOption = option;
		}
		dispatch('select', option);
		visible = false;
	};

	const handleVisible = () => {
		visible = !visible;
	};

	const clickOutside = (node: HTMLElement) => {
		const handleClickOutside = (e: MouseEvent) => {
			const target = e.target as HTMLElement;
			if (node && !node.contains(target)) {
				visible = false;
			}
		};

		document.addEventListener('click', handleClickOutside);

		return {
			destroy() {
				document.removeEventListener('click', handleClickOutside);
			}
		};
	};
</script>

<div class="select" use:clickOutside bind:this={ref}>
	<button class="select__button select__button--selected" type="button" on:click={handleVisible}>
		{#if selectedOption}
			{selectedOption.title}
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
				stroke="#D8D8D8"
				stroke-width="2"
				stroke-linecap="round"
				stroke-linejoin="round"
			/>
		</svg>
	</button>
	{#if options.length && visible}
		<ul style:top={dropdownPosition} class="select__options" bind:this={optionsRef}>
			{#each options as option (option.value)}
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
		background-color: #d8d8d8;
	}

	.select__button--selected {
		display: flex;
		align-items: center;
		justify-content: space-between;
		background-color: #fff;
		border: 1px solid #d8d8d8;
	}

	.select__button--selected:hover,
	.select__button--selected:focus-visible {
		background-color: #fff;
		border: 1px solid #d8d8d8;
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
		border: 1px solid #d8d8d8;
		border-radius: 4px;
		background-color: #fff;
		gap: 4px;
	}

	.select__options--top {
		top: -2px;
	}

	.select__placeholder {
		color: #d8d8d8;
	}
</style>
