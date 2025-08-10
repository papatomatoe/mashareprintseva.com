import type { MainPage, Section, Social, Bio, Project } from '@prisma/client';
export type MainPageType = MainPage;
export type BioPageType = Bio;

export type MenuType = Pick<Section, 'id' | 'title' | 'order' | 'slug'>;

export type SocialMenuType = Social;

export type SectionPageType = Pick<
	Section,
	'title' | 'altTitle' | 'subtitle' | 'image' | 'content' | 'slug'
> & {
	projects: ProjectType[];
};

export type ProjectType = Pick<Project, 'id' | 'slug' | 'title' | 'image'>;

export type FormMessageType = {
	status: 'error' | 'success';
	text: string;
};
