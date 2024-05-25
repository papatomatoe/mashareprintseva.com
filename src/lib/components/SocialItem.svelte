<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Delete from '$lib/icons/Delete.svelte';
	import Edit from '$lib/icons/Edit.svelte';
	import type { Social } from '@prisma/client';

	const dispatch = createEventDispatcher();

	export let item: Social;

	const handleDeleteItem = (item: Social) => {
		dispatch('delete', item);
	};
	const handleEditItem = (item: Social) => {
		dispatch('edit', item);
	};
</script>

<div class="social__item-buttons">
	<button
		class="button social__item-button"
		type="button"
		aria-label="delete {item.title} item"
		on:click={() => handleDeleteItem(item)}><Delete /></button
	>
	<button
		class="button social__item-button"
		type="button"
		aria-label="edit {item.title} item"
		on:click={() => handleEditItem(item)}><Edit /></button
	>
</div>
<a class="social__link" href={item.link} target="_blank" rel="noopener noreferrer nofollow">
	<h3 class="social__title">{item.title}</h3>
</a>
<img class="social__icon" src={item.icon} alt="{item.title} icon" width="40" height="40" />

<style>
	.social__item-buttons {
		opacity: 0;
		top: 0;
		right: 0;
		padding: 5px;
		position: absolute;
		display: grid;
		/* gap: 5px; */
	}

	.social__item-button {
		width: 30px;
		height: 30px;
		padding: 0;
		display: grid;
		place-items: center;
		background-color: var(--color--white);
		--color--icon: var(--color--gray-15);
	}

	.social__item-button:hover,
	.social__item-button:focus-visible {
		background-color: var(--color--gray-85);
	}
	.social__item-button:active {
		background-color: var(--color--gray-50);
		--color--icon: var(--color--white);
	}

	.social__item-buttons:has(.social__item-button:focus) {
		opacity: 1;
	}

	:global(.social__item-button svg) {
		width: 17px;
		height: 17px;
	}

	.social__icon {
		flex-grow: 1;
		height: 40px;
		width: 40px;
		object-fit: contain;
	}
</style>
