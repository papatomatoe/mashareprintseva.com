import { error } from '@sveltejs/kit';
import type { PageLoad } from './$types';

export const load = (async () => {
	try {
		const main = await import('../content/main.md');
		return { main: { ...main.metadata, content: main.default }, pageTitle: 'Main' };
	} catch (e) {
		console.error(e);
		error(404, 'page not found');
	}
}) satisfies PageLoad;
