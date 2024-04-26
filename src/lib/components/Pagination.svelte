<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Select from '$lib/components/Select.svelte';
	import Prev from '$lib/icons/Prev.svelte';
	import Next from '$lib/icons/Next.svelte';

	const dispatch = createEventDispatcher();

	const PER_GROUP = 5;

	export let disableNext = false;
	export let disablePrevious = false;
	export let withoutPages = false;
	export let pages = 0;
	export let perPage = 0;
	export let currentPage = 0;
	export let perPageOptions = [
		{ title: '10', value: 10 },
		{ title: '50', value: 50 },
		{ title: '100', value: 100 }
	];

	$: groups = Math.ceil(pages / PER_GROUP);

	$: pageGroups = Array(groups)
		.fill('')
		.map((_, index) =>
			Array(pages)
				.fill('')
				.map((_, idx) => idx)
				.slice(index * PER_GROUP, index * PER_GROUP + PER_GROUP)
		);

	$: currentGroupIndex = pageGroups.findIndex((el) => el.includes(currentPage));

	$: currentGroup = pageGroups && pageGroups.length ? pageGroups[currentGroupIndex] : [0];

	const handleSelectPerPage = (e: CustomEvent) => {
		perPage = e.detail.value;
		dispatch('select-per-page', { perPage });
	};

	const handleSelectCurrentPage = (page: number) => {
		dispatch('select-page', { page, perPage });
	};

	const handleSelectPrevPage = () => {
		const page = currentPage > 0 ? currentPage - 1 : currentPage;
		dispatch('select-page', { page, perPage });
	};

	const handleSelectNextPage = () => {
		const page = currentPage <= pages ? currentPage + 1 : currentPage;
		dispatch('select-page', { page, perPage });
	};

	const handlePrevious = () => {
		currentPage = currentPage > 1 ? currentPage - 1 : currentPage;
		dispatch('previous', { perPage, page: currentPage });
	};

	const handleNext = () => {
		currentPage = currentPage <= pages ? currentPage + 1 : currentPage;
		dispatch('next', { perPage, page: currentGroup });
	};
</script>

<div class="pagination">
	<ul class="pagination__list">
		{#if withoutPages}
			<li class="pagination__item">
				<button
					class:pagination__button--without-pages={withoutPages}
					class="button pagination__button"
					type="button"
					on:click={handlePrevious}
					disabled={disablePrevious}
				>
					<Prev />
					Previous
				</button>
			</li>

			<li class="pagination__item">
				<button
					class:pagination__button--without-pages={withoutPages}
					class="button pagination__button"
					type="button"
					on:click={handleNext}
					disabled={disableNext}
				>
					Next
					<Next />
				</button>
			</li>
		{:else}
			<li class="pagination__item">
				<button
					class="button pagination__button"
					type="button"
					disabled={currentPage === 0}
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
						{page + 1}
					</button>
				</li>
			{/each}

			<li class="pagination__item">
				<button
					class="button pagination__button"
					disabled={currentPage + 1 >= pages}
					type="button"
					on:click={handleSelectNextPage}
				>
					<Next />
				</button>
			</li>
		{/if}
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
		color: var(--color--black);
		background-color: var(--color--gray-95);
		border-color: var(--color--gray-95);
		--color-icon: var(--color--gray-50);
	}
	.pagination__button:hover,
	.pagination__button:focus-visible {
		background-color: var(--color--gray-50);
		border-color: var(--color--gray-50);
		--color-icon: var(--color--white);
		color: var(--color--white);
	}

	.pagination__button:active,
	.pagination__button--current,
	.pagination__button--current:hover,
	.pagination__button--current:focus-visible {
		background-color: var(--color--primary);
		border-color: var(--color--primary);
		--color-icon: var(--color--white);
		color: var(--color--white);
	}

	.pagination__button:disabled {
		background-color: var(--color--gray-95);
		border-color: var(--color--gray-95);
		cursor: auto;
		--color-icon: var(--color--gray-85);
	}

	.pagination__button--without-pages {
		display: flex;
		padding: 0 10px;
		width: 100px;
		align-items: center;
		justify-content: space-between;
		gap: 20px;

		background-color: var(--color--primary);
		border-color: var(--color--primary);
		--color-icon: var(--color--white);
		color: var(--color--white);
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
