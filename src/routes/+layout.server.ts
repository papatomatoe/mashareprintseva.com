import type { LayoutServerLoad } from './$types';
import { BASE_URL } from '$env/static/private';

export const load = (async ({ locals }) => {
	const menuData = await locals.pb
		.collection('sections')
		.getFullList(200, { filter: 'published=true' });
	const socialData = await locals.pb
		.collection('social')
		.getFullList(200, { filter: 'published=true' });

	const menu = menuData.map((el) => ({
		id: el.id,
		title: el.title,
		order: el.order,
		slug: el.slug
	}));

	const social = socialData
		.filter((elem) => elem.published)
		.map((el) => ({
			id: el.id,
			title: el.title,
			link: el.link,
			icon: `${BASE_URL}/api/files/${el.collectionId}/${el.id}/${el.icon}`
		}));

	return { menu, social };
}) satisfies LayoutServerLoad;
