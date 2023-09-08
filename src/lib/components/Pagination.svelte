<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Select from '$lib/components/Select.svelte';
	import Prev from '$lib/components/icons/Prev.svelte';
	import Next from '$lib/components/icons/Next.svelte';

	const dispatch = createEventDispatcher();

	const perGroup = 5;

	export let pages = 0;
	export let perPage = 0;
	export let currentPage = 1;
	export let perPageOptions = [
		{ title: '10', value: 10 },
		{ title: '50', value: 50 },
		{ title: '100', value: 100 }
	];

	$: groups = Math.ceil(pages / 5);

	$: pageGroups = Array(groups)
		.fill('')
		.map((_, index) =>
			Array(pages)
				.fill('')
				.map((_, idx) => idx + 1)
				.slice(index * perGroup, index * perGroup + perGroup)
		);

	$: currentGroupIndex = pageGroups.findIndex((el) => el.includes(currentPage));

	$: currentGroup = pageGroups && pageGroups.length ? pageGroups[currentGroupIndex] : [1];

	const handleSelectPerPage = (e: CustomEvent) => {
		dispatch('select-per-page', e.detail.value);
		dispatch('select-page', 1);
	};

	const handleSelectCurrentPage = (page: number) => {
		dispatch('select-page', page);
	};

	const handleSelectPrevPage = () => {
		const page = currentPage > 1 ? currentPage - 1 : currentPage;
		dispatch('select-page', page);
	};

	const handleSelectNextPage = () => {
		const page = currentPage <= pages ? currentPage + 1 : currentPage;
		dispatch('select-page', page);
	};
</script>

<div class="pagination">
	<ul class="pagination__list">
		<li class="pagination__item">
			<button
				class="button pagination__button"
				type="button"
				disabled={currentPage === 1}
				on:click={handleSelectPrevPage}
			>
				<Prev />
			</button>
		</li>
		{#each currentGroup as page, index (index)}
			<li class="pagination__item">
				<button
					class="button pagination__button"
					class:pagination__button--current={page === currentPage}
					type="button"
					on:click={() => handleSelectCurrentPage(page)}
				>
					{page}
				</button>
			</li>
		{/each}

		<li class="pagination__item">
			<button
				class="button pagination__button"
				disabled={currentPage >= pages}
				type="button"
				on:click={handleSelectNextPage}
			>
				<Next />
			</button>
		</li>
	</ul>
	<div class="pagination__pages">
		<p class="pagination__label">entries per page</p>
		<div class="pagination__select">
			<Select
				options={perPageOptions}
				selected={perPageOptions.find((el) => el.value === perPage)}
				on:select={handleSelectPerPage}
			/>
		</div>
	</div>
</div>

<style>
	.pagination {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		justify-content: space-between;
		margin-top: 42px;
	}

	.pagination__list {
		display: flex;
		flex-wrap: wrap;
		gap: 10px;
	}

	.pagination__button {
		width: 40px;
		height: 40px;
		display: grid;
		place-items: center;
		color: #000;
		background-color: #efefef;
		border-color: #efefef;
		--color-icon: #858585;
	}
	.pagination__button:hover,
	.pagination__button:focus-visible {
		background-color: #858585;
		border-color: #858585;
		--color-icon: #fff;
		color: #fff;
	}

	.pagination__button:active,
	.pagination__button--current,
	.pagination__button--current:hover,
	.pagination__button--current:focus-visible {
		background-color: #8a6f48;
		border-color: #8a6f48;
		--color-icon: #fff;
		color: #fff;
	}

	.pagination__button:disabled {
		background-color: #efefef;
		border-color: #efefef;
		cursor: auto;
		--color-icon: #d8d8d8;
	}

	.pagination__select {
		width: 81px;
	}

	.pagination__pages {
		display: flex;
		flex-wrap: wrap;
		align-items: center;
		gap: 10px;
	}
</style>
