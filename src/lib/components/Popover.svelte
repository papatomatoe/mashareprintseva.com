<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

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
</script>

<div class="popover" class:popover-show={show}>
	<slot />
	<div class="popover__buttons">
		<button class="button button--cancel" type="button" on:click={handleCancel}>Cancel</button>
		<button class="button" type="button" on:click={handleConfirm}>Add</button>
	</div>
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
		right: 0;
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
