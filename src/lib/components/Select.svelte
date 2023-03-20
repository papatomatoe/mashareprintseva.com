<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	export let options: { title: string; value: string }[] = [];
	export let selected: { title: string; value: string } | null = null;

	const dispatch = createEventDispatcher();

	let visible = false;

	const handleSelect = (option: { title: string; value: string }) => {
		selectedOption = option;
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

	$: selectedOption = selected ?? options[0] ?? { title: '-', value: '-' };
</script>

<div class="select" use:clickOutside>
	<button class="select__button select__button--selected" type="button" on:click={handleVisible}>
		{selectedOption.title}
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
		<ul class="options">
			{#each options as option (option.value)}
				<li class="option">
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
	.select__button:focus {
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
	.select__button--selected:focus {
		background-color: #fff;
		border: 1px solid #d8d8d8;
	}
	.icons--open {
		transform: rotateZ(180deg);
	}

	.options {
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
</style>
