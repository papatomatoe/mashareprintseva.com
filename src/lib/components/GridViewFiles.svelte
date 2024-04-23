<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Spinner from '$lib/icons/Spinner.svelte';
	import type { IFile } from '$lib/components/Filemanager.svelte';
	import Image from '$lib/components/Image.svelte';
	export let files: IFile[] = [];
	export let selectedFileIds: string[] = [];

	const dispatch = createEventDispatcher();

	const handleSelect = (id: string) => {
		dispatch('select', id);
	};
</script>

<ul class="files__list">
	{#each files as file (file.id)}
		<li class="files__item">
			{#if !file.loading}
				<div class="files__checkbox">
					<Checkbox
						width={30}
						height={30}
						checked={selectedFileIds.includes(file.id)}
						on:change={() => handleSelect(file.id)}
					/>
				</div>
			{/if}
			<div class="files__image">
				{#if file.loading}
					<Spinner />
				{:else}
					<Image width={100} height={180} {...file} />
				{/if}
			</div>
			<div class="files__info">
				{#if file.name}
					<h2 class="files__item-title">{file.name}</h2>
				{:else}
					<h2 class="files__item-title">loading...</h2>
				{/if}
			</div>
		</li>
	{/each}
</ul>

<style>
	.files__list {
		display: grid;
		grid-template-columns: repeat(auto-fit, 250px);
		gap: 20px;
	}

	.files__item {
		position: relative;
		width: 250px;
		height: 250px;
		border: 1px solid #d9d9d9;
		border-radius: 4px;
	}
	.files__item:hover {
		background-color: #f3f3f3;
	}

	.files__checkbox {
		position: absolute;
		top: 5px;
		left: 5px;
	}
	.files__image {
		width: 100%;
		height: 200px;
		display: flex;
		align-items: center;
		justify-content: center;
	}

	.files__info {
		padding: 10px;
	}
	.files__item-title {
		font-size: 12px;
		white-space: nowrap;
		overflow: hidden;
		text-overflow: ellipsis;
	}
</style>
