<script lang="ts">
	import Clear from '$lib/icons/Clear.svelte';

	let dialog: HTMLDialogElement;

	export const open = () => {
		dialog.showModal();
	};

	export const close = () => {
		dialog.close();
	};
</script>

<dialog class="modal" bind:this={dialog}>
	<button type="button" on:click={close}><Clear /></button>
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
