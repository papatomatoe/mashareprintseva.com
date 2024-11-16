import type { Section } from '$lib/types/section';
import type { LayoutLoad } from './$types';

export const load = (async ({ fetch }) => {
	const sectionsResponse = await fetch('/api/sections', { method: 'get' });
	const sections = await sectionsResponse.json();
	const socialsResponse = await fetch('/api/socials', { method: 'get' });
	const socials = await socialsResponse.json();

	const menuData = sections ?? [];

	const menu = menuData.map((el: Section) => ({ title: el.title, slug: el.slug }));
	const [data] = socials;

	return { menu, social: data?.items ?? [] };
}) satisfies LayoutLoad;

export const prerender = true;
