<script lang="ts">
	import { clickOutside } from '$lib/helpers/clickOutside';
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let disableControls = false;
	export let disableAutoHide = false;

	let show = false;

	export const open = () => {
		show = true;
	};

	export const close = () => {
		show = false;
	};

	const handleCancel = () => {
		dispatch('cancel');
	};

	const handleConfirm = () => {
		dispatch('confirm');
	};
	const handleClickOutside = () => {
		!disableAutoHide && close();
	};
</script>

<div
	use:clickOutside
	on:click-outside={handleClickOutside}
	class="popover"
	class:popover-show={show}
>
	<slot />
	{#if !disableControls}
		<div class="popover__buttons">
			<button class="button button--cancel" type="button" on:click={handleCancel}>Cancel</button>
			<button class="button" type="button" on:click={handleConfirm}>Add</button>
		</div>
	{/if}
</div>

<style>
	.popover {
		display: none;
		position: absolute;
		top: 100%;
		left: -40px;
		flex-direction: column;
		gap: 10px;
		z-index: 1;
		box-shadow: 0 3px 10px -7px var(--color--black);
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;
		background-color: var(--color--white);
		padding: 10px;
		width: 400px;
	}

	.popover-show {
		display: flex;
	}

	.popover__buttons {
		display: flex;
		justify-content: end;
		gap: 10px;
		margin-top: 10px;
	}
</style>
