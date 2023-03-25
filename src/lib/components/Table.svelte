<script lang="ts" context="module">
	export interface IUser {
		id: number;
		role: 'USER' | 'ADMIN' | 'EDITOR';
		active: boolean;
		username: string;
		email: string;
		created: string;
	}
	export interface ISocial {
		id: number;
		published: boolean;
		icon: string;
		title: string;
		link: string;
		created: string;
	}
	export interface ISection {
		id: number;
		published: boolean;
		order: number;
		title: string;
		slug: string;
		created: string;
	}

	export interface IProject {
		id: number;
		published: boolean;
		section: string;
		title: string;
		slug: string;
		created: string;
	}

	export type DataType = 'sections' | 'projects' | 'socials' | 'users';

	export type TableData = ISection | IProject | ISocial | IUser;

	export interface ITableData {
		data: TableData[];
		type: DataType;
	}

	export interface ITableConfig {
		key: string;
		title?: string;
		render?: any;
		sortable?: boolean;
	}

	export type SortDirection = 'direct' | 'reverse';
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import { Edit } from '$lib/components/icons';

	const dispatch = createEventDispatcher();

	export let data: TableData[] = [];
	export let config: ITableConfig[] = [];
	export let selectedRows: TableData[] = [];

	let sortKey = '';
	let sortDirection: SortDirection | null = null;

	$: isAllCheckboxSelected = Boolean(selectedRows.length);
	$: sortedData =
		sortKey && sortDirection
			? [...data].sort((a, b) => {
					const itemA = a[sortKey];
					const itemB = b[sortKey];
					if (typeof itemA === 'string' && typeof itemB === 'string') {
						return sortDirection === 'direct'
							? itemA.toLowerCase().localeCompare(itemB.toLowerCase())
							: itemB.toLowerCase().localeCompare(itemA.toLowerCase());
					}

					return sortDirection === 'direct' ? itemA - itemB : itemB - itemA;
			  })
			: data;

	const renderTd = (item: Record<string, any>, key: string) => item[key];

	const handleCheckAll = () => dispatch('select-all');

	const handleSelect = (item: TableData) => dispatch('select', item);

	const handleEdit = (item: TableData) => dispatch('edit', item);

	const handleSort = (key: string) => {
		if (sortKey === key) {
			if (!sortDirection) {
				sortDirection = 'direct';
			} else if (sortDirection === 'direct') {
				sortDirection = 'reverse';
			} else {
				sortDirection = null;
			}
		} else {
			sortDirection = 'direct';
		}
		sortKey = key;
	};
</script>

<table class="table">
	<thead>
		<tr>
			{#each config as cell (cell.key)}
				<th>
					{#if cell.key === 'select'}
						<Checkbox on:change={handleCheckAll} checked={isAllCheckboxSelected} isCheckedAll />
					{:else if cell.title}
						{#if cell.sortable}
							<button class="table__button" type="button" on:click={() => handleSort(cell.key)}>
								<span>{cell.title}</span>
								{#if cell.key === sortKey}
									<svg
										class="table__sort {sortDirection ? `table__sort--${sortDirection}` : ''}"
										width="8"
										height="5"
										viewBox="0 0 8 5"
										fill="none"
										xmlns="http://www.w3.org/2000/svg"
									>
										<path d="M4 0L7.4641 4.5H0.535898L4 0Z" fill="var(--color-icon)" />
									</svg>
								{/if}
							</button>
						{:else}
							{cell.title}
						{/if}
					{/if}
				</th>
			{/each}
		</tr>
	</thead>
	<tbody>
		{#each sortedData as item (item.id)}
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
							{:else if cell.key === 'active'}
								<svelte:component
									this={cell.render}
									published={item[cell.key]}
									title={item[cell.key] ? 'active' : 'inactive'}
								/>
							{:else}
								<svelte:component this={cell.render} />
							{/if}
						{:else if cell.key === 'select'}
							<Checkbox
								on:change={() => handleSelect(item)}
								checked={Boolean(selectedRows.find((row) => row.id === item.id))}
							/>
						{:else if cell.key === 'edit'}
							<button class="button table__edit" type="button" on:click={() => handleEdit(item)}>
								<Edit />
							</button>
						{:else}
							{renderTd(item, cell.key)}
						{/if}
					</td>
				{/each}
			</tr>
		{:else}
			<tr class="table__tr--no-data"
				><td colspan={config.length}><p class="table__no-data">No data</p></td></tr
			>
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
		position: relative;
		padding-right: 12px;
		border: none;
		background-color: transparent;
		cursor: pointer;
	}

	.table__button:hover,
	.table__button:focus {
		color: #858585;
		--color-icon: #858585;
	}

	.table__edit {
		display: grid;
		padding: 0;
		width: 40px;
		height: 40px;
		place-items: center;
		background-color: transparent;
		--color-icon: #000;
	}

	.table__edit:hover,
	.table__edit:focus {
		background-color: transparent;
		--color-icon: #8a6f48;
	}

	.table__edit:active {
		background-color: transparent;
		--color-icon: #858585;
	}

	.table__sort {
		position: absolute;
		display: none;
		right: 0;
		top: 50%;
		transform: translate(0, -50%);
	}
	.table__sort--direct {
		display: block;
	}
	.table__sort--reverse {
		display: block;
		transform: rotateZ(180deg);
		top: calc(50% - 1px);
	}

	table tbody tr.table__tr--no-data:hover {
		background-color: #fff;
	}
	.table__no-data {
		width: 100%;
		padding: 40px;
		font-weight: 700;
		text-transform: uppercase;
		text-align: center;
		color: #858585;
	}
</style>
