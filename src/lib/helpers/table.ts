import type { ITableData, TableData } from '$lib/components/Table.svelte';

export const search = <T extends TableData>(value: string, data: T[]): T[] =>
	value
		? data.filter((el) => {
				return Object.values(el).some((e) => {
					return typeof e === 'string' ? e.toLowerCase().startsWith(value) : false;
				});
		  })
		: data;

export const searchByData = (value: string, tableData: ITableData) => {
	const { data } = tableData;
	return search(value, data);
};
