<script lang="ts" context="module">
	import type IFile from '$lib/components/Filemanager.svelte';

	export interface IUser {
		id: string;
		role: 'USER' | 'ADMIN' | 'EDITOR';
		active: boolean;
		username: string;
		email: string;
		created: string;
	}
	export interface ISocial {
		id: string;
		published: boolean;
		icon: string;
		title: string;
		link: string;
		created: string;
	}
	export interface ISection {
		id: string;
		published: boolean;
		order: number;
		title: string;
		slug: string;
		created: string;
	}

	export interface IProject {
		id: string;
		published: boolean;
		section: string;
		title: string;
		slug: string;
		created: string;
	}

	export type DataType = 'sections' | 'projects' | 'socials' | 'users' | 'files';

	export type TableData = ISection | IProject | ISocial | IUser | IFile;

	export interface ITableData {
		data: TableData[];
		type: DataType;
	}

	export interface ITableConfig {
		key: string | 'select' | 'edit';
		title?: string;
		render?: new (args: { target: any; props?: any }) => ATypedSvelteComponent;
		sortable?: boolean;
		width?: number;
	}

	export type SortDirection = 'direct' | 'reverse';

	export type SortKey = keyof ISection | keyof IProject | keyof ISocial | keyof IUser | keyof IFile;
</script>

<script lang="ts">
	import { createEventDispatcher } from 'svelte';
	import Checkbox from '$lib/components/Checkbox.svelte';
	import Edit from '$lib/icons/Edit.svelte';
	import Spinner from '$lib/icons/Spinner.svelte';
	// import Inform from '$lib/icons/Inform.svelte';

	const dispatch = createEventDispatcher();

	export let data: any[] = [];
	export let config: ITableConfig[] = [];
	export let selectedRowIds: string[] = [];
	export let isAllRowsSelected = false;

	let sortKey: SortKey | null = null;
	let sortDirection: SortDirection | null = null;

	// $: isAllCheckboxSelected = Boolean(selectedRowIds.length);
	$: sortedData =
		sortKey && sortDirection
			? [...data].sort((a, b) => {
					if (sortKey !== null) {
						//@ts-ignore
						const itemA = a[sortKey];
						//@ts-ignore
						const itemB = b[sortKey];

						if (typeof itemA === 'string' && typeof itemB === 'string')
							return sortDirection === 'direct'
								? itemA.toLowerCase().localeCompare(itemB.toLowerCase())
								: itemB.toLowerCase().localeCompare(itemA.toLowerCase());

						if (typeof itemA === 'number' && typeof itemB === 'number')
							return sortDirection === 'direct' ? itemA - itemB : itemB - itemA;
					}

					return 0;
			  })
			: data;

	const renderTd = (item: Record<string, any>, key: string) => item[key];

	const handleCheckAll = () => dispatch('select-all');

	const handleSelect = (item: TableData) => dispatch('select', item);

	const handleEdit = (item: TableData) => dispatch('edit', item);

	const handleSort = (key: SortKey) => {
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
	<colgroup>
		{#each config as cell (cell.key)}
			<col width={cell.width} />
		{/each}
	</colgroup>
	<thead>
		<tr>
			{#each config as cell (cell.key)}
				<th>
					{#if cell.key === 'select'}
						<Checkbox
							on:change={handleCheckAll}
							checked={Boolean(selectedRowIds.length)}
							isCheckedAll={isAllRowsSelected}
						/>
					{:else if cell.title}
						{#if cell.sortable}
							<button
								class="table__button"
								type="button"
								on:click={() => {
									if (cell.key !== 'select' && cell.key !== 'edit') handleSort(cell.key);
								}}
							>
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
							{#if 'published' in item && cell.key === 'published'}
								<svelte:component
									this={cell.render}
									published={item.published}
									title={item.published ? 'published' : 'draft'}
								/>
							{:else if 'active' in item && cell.key === 'active'}
								<svelte:component
									this={cell.render}
									published={item.active}
									title={item.active ? 'active' : 'inactive'}
								/>
							{:else if 'loading' in item}
								{#if cell.key === 'thumbnail'}
									<div class="table__spinner">
										<Spinner />
									</div>
								{:else if cell.key === 'createdAt'}
									-
								{/if}
							{:else}
								<svelte:component this={cell.render} {...item} />
							{/if}
						{:else if cell.key === 'select'}
							<Checkbox
								on:change={() => handleSelect(item)}
								checked={Boolean(selectedRowIds.find((id) => id === item.id))}
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
		background-color: var(--color--gray-95);
	}

	.table th,
	.table td {
		text-align: left;
		padding: 14px;
	}

	.table thead th {
		position: relative;
	}

	.table thead th::after {
		content: '|';
		color: var(--color--gray-85);
		position: absolute;
		top: 50%;
		right: 0;
		transform: translateY(-50%);
	}

	.table thead th:last-child::after {
		content: '';
	}

	.table tbody tr {
		border-bottom: 1px solid var(--color--gray-95);
	}

	.table tbody tr:hover {
		background-color: var(--color--gray-95);
	}

	.table__button {
		position: relative;
		padding-right: 12px;
		border: none;
		background-color: transparent;
		cursor: pointer;
	}

	.table__button:hover,
	.table__button:focus-visible {
		color: var(--color--gray-50);
		--color-icon: var(--color--gray-50);
	}

	.table__edit {
		display: grid;
		padding: 0;
		width: 40px;
		height: 40px;
		place-items: center;
		background-color: transparent;
		--color-icon: var(--color--black);
	}

	.table__edit:hover,
	.table__edit:focus-visible {
		background-color: transparent;
		--color-icon: var(--color--primary);
	}

	.table__edit:active {
		background-color: transparent;
		--color-icon: var(--color--gray-50);
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
		background-color: var(--color--white);
	}
	.table__no-data {
		width: 100%;
		padding: 40px;
		font-weight: 700;
		text-transform: uppercase;
		text-align: center;
		color: var(--color--gray-50);
	}

	.table__spinner {
		width: 50px;
		height: 50px;
		display: grid;
		place-items: center;
	}
</style>
