import { json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { STATIC_DIR } from '$env/static/private';
import { getTotalSize } from '$lib/utils/getDirSize';

export const GET: RequestHandler = () => {
	const info = getTotalSize(`./${STATIC_DIR}`);

	return json(info);
};
