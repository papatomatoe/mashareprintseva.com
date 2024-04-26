<script lang="ts">
	import { createEventDispatcher } from 'svelte';

	const dispatch = createEventDispatcher();

	export let disabled = false;

	const handleCancel = () => {
		dispatch('cancel');
	};
	const handleConfirm = () => {
		dispatch('confirm');
	};
</script>

<div class="confirm-panel">
	<button type="button" class="button button--cancel" on:click={handleCancel}>Cancel</button>
	<button type="button" class="button" {disabled} on:click={handleConfirm}>Select</button>
</div>

<style>
	.confirm-panel {
		display: flex;
		justify-content: flex-end;
		gap: 10px;
	}
</style>
