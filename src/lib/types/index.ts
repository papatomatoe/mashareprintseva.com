import type { Section, Social, Bio, Project } from '@prisma/client';
export type MenuType = Pick<Section, 'id' | 'title' | 'order' | 'slug'>;
export type SocialMenuType = Social;
export type BioPageType = Pick<Bio, 'image' | 'content' | 'epigraph'>;
export type SectionPageType = Pick<
	Section,
	'title' | 'altTitle' | 'subtitle' | 'image' | 'content' | 'slug'
> & {
	projects: ProjectType[];
};
export type ProjectType = Pick<Project, 'id' | 'slug' | 'title' | 'image'>;
