import { json } from '@sveltejs/kit';
import type { Section } from '$lib/types/section';

async function getSections() {
	const sections: Section[] = [];

	const paths = import.meta.glob('/src/content/sections/*.md', { eager: true });

	for (const path in paths) {
		const file = paths[path];
		const slug = path.split('/').at(-1)?.replace('.md', '');

		if (file && typeof file === 'object' && 'metadata' in file && slug) {
			const metadata = file.metadata as Omit<Section, 'slug'>;
			const section = { ...metadata, slug } satisfies Section;
			if (section.published) sections.push(section);
		}
	}

	return sections.sort((first, second) => first.order - second.order);
}

export async function GET() {
	const sections = await getSections();
	return json(sections);
}
