<script lang="ts">
	import { clickOutside } from '$lib/utils/clickOutside';
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
		position: absolute;
		padding: 10px;
		display: none;
		flex-direction: column;
		gap: 10px;
		background-color: var(--color--white);
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;
		width: 400px;
		top: 100%;
		left: -40px;
		z-index: 1;
		box-shadow: 0 3px 10px -7px var(--color--black);
	}

	.popover-show {
		display: flex;
	}

	.popover__buttons {
		display: flex;
		gap: 10px;
		justify-content: end;
		margin-top: 10px;
	}
</style>
