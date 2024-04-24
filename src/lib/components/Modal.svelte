<script lang="ts">
	import Clear from '$lib/icons/Clear.svelte';
	import type { Action } from 'svelte/action';

	let show = false;
	let dialog: HTMLDialogElement;

	export const open = () => {
		dialog.showModal();
		show = true;
	};

	export const close = () => {
		dialog.close();
		show = false;
	};

	const action: Action<HTMLBodyElement, boolean> = (body) => {
		return {
			update(show) {
				console.log(show);

				show ? body.classList.add('block-scroll') : body.classList.remove('block-scroll');
			},
			destroy() {
				if (body.classList.contains('block-scroll')) body.classList.remove('block-scroll');
			}
		};
	};
</script>

<svelte:body use:action={show} />

<dialog class="modal" bind:this={dialog}>
	<button class="modal__button" type="button" on:click={close}><Clear /></button>
	<slot />
</dialog>

<style>
	:global(.block-scroll) {
		overflow: hidden;
	}
	.modal {
		position: absolute;
		padding: 60px;
		width: 83%;
		height: 90%;
		border: none;
		border-radius: 4px;
		box-shadow: 0px 10px 100px -30px gray;
		z-index: 9999;
	}

	.modal::backdrop {
		background-color: rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(3px);
	}

	.modal__button {
		position: absolute;
		display: grid;
		place-items: center;
		padding: 0;
		width: 40px;
		height: 40px;
		top: 10px;
		right: 10px;
		border: none;
		border-radius: 50%;
		background-color: transparent;
		cursor: pointer;
	}
	.modal__button:hover,
	.modal__button:focus-visible {
		--color-icon: var(--color-icon-accent);
	}

	.modal__button:active {
		--color-icon: var(--color-icon-dark);
	}
</style>
