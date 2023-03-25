import type { IProject, ISection, ISocial, ITableData, IUser } from '$lib/components/Table.svelte';

export const searchBySections = (value: string, data: ISection[]) =>
	value
		? data.filter((el) => {
				return (
					String(el.id).toLowerCase().startsWith(value) ||
					String(el.title).toLowerCase().startsWith(value) ||
					String(el.slug).toLowerCase().startsWith(value) ||
					String(el.created).toLowerCase().startsWith(value)
				);
		  })
		: data;

export const searchByProjects = (value: string, data: IProject[]) =>
	value
		? data.filter((el) => {
				return (
					String(el.id).toLowerCase().startsWith(value) ||
					String(el.section).toLowerCase().startsWith(value) ||
					String(el.title).toLowerCase().startsWith(value) ||
					String(el.slug).toLowerCase().startsWith(value) ||
					String(el.created).toLowerCase().startsWith(value)
				);
		  })
		: data;

export const searchBySocials = (value: string, data: ISocial[]) =>
	value
		? data.filter((el) => {
				return (
					String(el.id).toLowerCase().startsWith(value) ||
					String(el.title).toLowerCase().startsWith(value) ||
					String(el.link).toLowerCase().startsWith(value) ||
					String(el.created).toLowerCase().startsWith(value)
				);
		  })
		: data;

export const searchByUsers = (value: string, data: IUser[]) =>
	value
		? data.filter((el) => {
				return (
					String(el.id).toLowerCase().startsWith(value) ||
					String(el.username).toLowerCase().startsWith(value) ||
					String(el.email).toLowerCase().startsWith(value)
				);
		  })
		: data;

export const searchByData = (value: string, tableData: ITableData) => {
	const { data, type } = tableData;
	switch (type) {
		case 'users':
			return searchByUsers(value, data as IUser[]);
		case 'projects':
			return searchByProjects(value, data as IProject[]);
		case 'sections':
			return searchBySections(value, data as ISection[]);
		case 'socials':
			return searchBySocials(value, data as ISocial[]);
	}
};
