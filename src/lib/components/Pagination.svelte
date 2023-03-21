<script lang="ts">
	import Select from '$lib/components/Select.svelte';
</script>

<div class="pagination">
	<ul class="pagination__list">
		<li class="pagination__item">
			<button class="button pagination__button" type="button">
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
		<li class="pagination__item">
			<button class="button pagination__button pagination__button--current" type="button">1</button>
		</li>
		<li class="pagination__item">
			<button class="button pagination__button" type="button">2</button>
		</li>
		<li class="pagination__item">
			<button class="button pagination__button" type="button">3</button>
		</li>
		<li class="pagination__item">
			<button class="button pagination__button" type="button">
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
					{ title: '10', value: '10' },
					{ title: '50', value: '50' },
					{ title: '100', value: '100' }
				]}
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
