import type { Project } from '$lib/types/project';

export type Section = {
	published: boolean;
	order: number;
	title: string;
	slug: string;
	subtitle: string;
	createdAt: string;
	image: string;
	thumbnail: string;
	altTitle: string;
	projects: Project[];
};
