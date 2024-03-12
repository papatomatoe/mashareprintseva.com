<script lang="ts">
	import Clear from '$lib/icons/Clear.svelte';

	export let open: boolean = false;

	let dialog: HTMLDialogElement;

	$: {
		if (dialog) {
			open ? dialog.showModal() : dialog.close();
		}
	}

	const handleCloseModal = () => {
		dialog.close();
	};
</script>

<dialog class="modal" bind:this={dialog}>
	<button type="button" on:click={handleCloseModal}><Clear /></button>
	<slot />
</dialog>

<style>
	.modal {
		position: absolute;
		padding: 60px;
		width: 80%;
		height: 80%;
		border: none;
		box-shadow: 0px 10px 100px -30px gray;
		z-index: 9999;
	}

	.modal::backdrop {
		background-color: rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(3px);
	}
</style>
