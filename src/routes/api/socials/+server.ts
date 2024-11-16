import { json } from '@sveltejs/kit';
import type { Social } from '$lib/types/socials';

async function getSocials() {
	const socials: Social[] = [];

	const paths = import.meta.glob('/src/content/socials/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const social = file.metadata as Social;
			socials.push(social);
		}
	}

	return socials;
}

export async function GET() {
	const socials = await getSocials();
	return json(socials);
}

export const prerender = true;
