import type { LayoutLoad } from './$types';

export const load = (async () => {
	return { menu: [], social: [] };
}) satisfies LayoutLoad;
