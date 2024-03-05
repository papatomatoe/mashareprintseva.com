import { error, json } from '@sveltejs/kit';
import type { RequestHandler } from './$types';
import { db } from '$lib/database/db';
import fs from 'fs/promises';
import type { IFile } from '$lib/components/Filemanager.svelte';
import { STATIC_PATH } from '$env/static/private';
export const DELETE: RequestHandler = async ({ request }) => {
	const files: IFile[] = await request.json();

	if (!files || files.length === 0) throw error(400, 'Invalid Request Data');

	try {
		await Promise.allSettled(
			files.map(async (file) => {
				const f = await fs.unlink(`./${STATIC_PATH}${file.url}`);
				console.log(f);
				file.thumbnail && (await fs.unlink(`./${STATIC_PATH}${file.thumbnail}`));
			})
		);

		const ids = files.map((file) => file.id);

		const { count } = await db.file.deleteMany({
			where: {
				id: {
					in: ids
				}
			}
		});

		let deletedIds = [];

		if (count === ids.length) {
			deletedIds = [...ids];
		} else {
			const notDeletedFiles = await db.file.findMany({
				where: {
					id: {
						in: ids
					}
				}
			});

			deletedIds = [
				...notDeletedFiles.filter((file) => ids.includes(file.id)).map((file) => file.id)
			];
		}

		return json(deletedIds);
	} catch (e) {
		console.log(e);
		throw error(500, 'Something went wrong...');
	}
};
