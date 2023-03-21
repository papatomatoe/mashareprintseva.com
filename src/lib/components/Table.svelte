<script lang="ts">
	import Checkbox from '$lib/components/Checkbox.svelte';

	export let data: {
		id: string;
		published: boolean;
		order: number;
		title: string;
		slug: string;
		created: string;
	}[] = [];

	export let config: {
		key: string;
		title?: string;
		render?: any;
	}[] = [];

	const renderTd = (item: Record<string, any>, key: string) => item[key];
</script>

<table class="table">
	<thead>
		<tr>
			{#each config as cell (cell.key)}
				<th>
					{#if cell.key === 'select'}
						<Checkbox on:change={() => console.log('check all')} isCheckedAll />
					{:else if cell.title}
						<button class="table__button" type="button">
							<span>{cell.title}</span>
							<svg
								width="8"
								height="5"
								viewBox="0 0 8 5"
								fill="none"
								xmlns="http://www.w3.org/2000/svg"
							>
								<path d="M4 0L7.4641 4.5H0.535898L4 0Z" fill="var(--color-icon)" />
							</svg>
						</button>
					{/if}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each data as item (item.id)}
			<tr>
				{#each config as cell (cell.key)}
					<td>
						{#if cell.render}
							{#if cell.key === 'published'}
								<svelte:component
									this={cell.render}
									published={item[cell.key]}
									title={item[cell.key] ? 'published' : 'draft'}
								/>
							{:else}
								<svelte:component this={cell.render} />
							{/if}
						{:else if cell.key === 'select'}
							<Checkbox on:change={() => console.log(`check ${item.id}`)} />
						{:else if cell.key === 'edit'}
							<button
								class="button button--edit"
								type="button"
								on:click={() => console.log(`edit ${item.id}`)}
							>
								<svg
									width="21"
									height="21"
									viewBox="0 0 21 21"
									fill="none"
									xmlns="http://www.w3.org/2000/svg"
								>
									<path
										d="M20.1454 0.707743L20.12 0.684689C19.6345 0.243177 19.0052 0 18.348 0C17.6113 0 16.9039 0.310533 16.4072 0.851904L7.01552 11.0893C6.92991 11.1826 6.86499 11.2927 6.82484 11.4125L5.72052 14.7088C5.59284 15.0899 5.65692 15.5114 5.89191 15.8362C6.12877 16.1635 6.51036 16.3589 6.91274 16.3589C7.08679 16.3589 7.25697 16.3233 7.41833 16.253L10.6158 14.8602C10.732 14.8096 10.8363 14.7353 10.9219 14.642L20.3136 4.40464C21.2909 3.33942 21.2155 1.68111 20.1454 0.707743ZM7.83637 14.0999L8.48438 12.1657L8.53903 12.1061L9.76723 13.223L9.71258 13.2826L7.83637 14.0999ZM18.9745 3.18677L10.9904 11.8898L9.76221 10.7729L17.7463 2.06978C17.9025 1.89955 18.1162 1.80577 18.3481 1.80577C18.5515 1.80577 18.7464 1.88113 18.8972 2.01825L18.9225 2.04131C19.254 2.34281 19.2773 2.85667 18.9745 3.18677Z"
										fill="var(--color-icon)"
									/>
									<path
										d="M18.3234 8.32991C17.8226 8.32991 17.4166 8.73416 17.4166 9.2328V16.8981C17.4166 18.1642 16.382 19.1943 15.1104 19.1943H4.1198C2.84814 19.1943 1.81364 18.1642 1.81364 16.8981V6.0441C1.81364 4.77802 2.8482 3.74794 4.1198 3.74794H12.0748C12.5757 3.74794 12.9817 3.34369 12.9817 2.84506C12.9817 2.34642 12.5757 1.94217 12.0748 1.94217H4.1198C1.8481 1.94217 0 3.78231 0 6.0441V16.8981C0 19.1599 1.84816 21 4.1198 21H15.1103C17.382 21 19.2301 19.1599 19.2301 16.8981V9.2328C19.2302 8.73416 18.8242 8.32991 18.3234 8.32991Z"
										fill="var(--color-icon)"
									/>
								</svg>
							</button>
						{:else}
							{renderTd(item, cell.key)}
						{/if}
					</td>
				{/each}
			</tr>
		{/each}
	</tbody>
</table>

<style>
	.table {
		width: 100%;
		border-collapse: collapse;
		border-radius: 4px 4px 0 0;
		overflow: hidden;
	}

	.table thead {
		border-radius: 4px 4px 0 0;
		background-color: #efefef;
	}

	.table th,
	.table td {
		text-align: left;
		padding: 14px;
	}

	.table tbody tr {
		border-bottom: 1px solid #efefef;
	}

	.table tbody tr:hover {
		background-color: #fcfcfc;
	}

	.table__button {
		display: flex;
		align-items: center;
		gap: 5px;
		border: none;
		background-color: transparent;
	}

	.button--edit {
		display: grid;
		padding: 0;
		width: 40px;
		height: 40px;
		place-items: center;
		background-color: #efefef;
		--color-icon: #000;
	}
</style>
