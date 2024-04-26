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
	<div class="modal__container">
		<div class="modal__content">
			<button class="modal__button" type="button" on:click={close}><Clear /></button>

			<slot />
		</div>
		{#if $$slots.bottom}
			<div class="modal__bottom">
				<slot name="bottom" />
			</div>
		{/if}
	</div>
</dialog>

<style>
	:global(.block-scroll) {
		overflow: hidden;
	}
	.modal {
		position: absolute;
		width: 83%;
		height: 90%;
		border: none;
		padding: 0;
		border-radius: 4px;
		box-shadow: 0px 10px 100px -30px gray;
		z-index: 9999;
		overflow: hidden;
	}

	.modal__container {
		padding: 60px;
		padding-right: 0;
		height: 100%;
		width: 100%;
	}

	.modal::backdrop {
		background-color: rgba(0, 0, 0, 0.1);
		backdrop-filter: blur(3px);
	}

	.modal__content {
		height: 100%;
		padding: 0;
		padding-right: 60px;
		overflow-y: auto;
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
		--color--icon: var(--color--primary);
	}

	.modal__button:active {
		--color--icon: var(--color--gray-15);
	}

	.modal__bottom {
		position: absolute;
		bottom: 10px;
		background-color: var(--color-bg);
		width: calc(100% - 120px);
	}
</style>
