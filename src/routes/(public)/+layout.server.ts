import type { LayoutServerLoad } from './$types';
import { getMainMenuData, getSocialMenuData } from '$lib/services/menu';

export const load = (async () => {
	const menu = await getMainMenuData();
	const social = await getSocialMenuData();

	return { menu, social };
}) satisfies LayoutServerLoad;
