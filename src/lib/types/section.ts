import type { Project } from '$lib/types/project';

export type Section = {
	order: number;
	title: string;
	slug: string;
	subtitle: string;
	published: boolean;
	image: string;
	altTitle: string;
	projects: Project[];
};
