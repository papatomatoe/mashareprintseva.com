<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Select from '$lib/components/Select.svelte';

	const dispatch = createEventDispatcher();

	const perGroup = 5;

	export let pages = 0;
	export let perPage = 10;
	export let currentPage = 1;

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

	$: currentGroup = pageGroups[currentGroupIndex];

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
				<svg
					width="9"
					height="17"
					viewBox="0 0 9 17"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M8 1L1 8.5L8 16"
						stroke="var(--color-icon)"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
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
				<svg
					width="9"
					height="17"
					viewBox="0 0 9 17"
					fill="none"
					xmlns="http://www.w3.org/2000/svg"
				>
					<path
						d="M1 15.9999L8 8.49994L1 0.999938"
						stroke="var(--color-icon)"
						stroke-width="2"
						stroke-linecap="round"
						stroke-linejoin="round"
					/>
				</svg>
			</button>
		</li>
	</ul>
	<div class="pagination__pages">
		<p class="pagination__label">entries per page</p>
		<div class="pagination__select">
			<Select
				options={[
					{ title: '10', value: 10 },
					{ title: '50', value: 50 },
					{ title: '100', value: 100 }
				]}
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
	.pagination__button:focus {
		background-color: #858585;
		border-color: #858585;
		--color-icon: #fff;
		color: #fff;
	}

	.pagination__button:active,
	.pagination__button--current,
	.pagination__button--current:hover,
	.pagination__button--current:focus {
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
