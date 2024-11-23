import { readdir, readFile } from 'node:fs/promises';
import sharp from 'sharp';

const IMAGES_PATH = { source: './images', dist: './static/images' };
const fileTypes = ['jpeg', 'jpg', 'png'];

async function convertToAvif() {
	try {
		const fileNames = await readdir(IMAGES_PATH.source, { withFileTypes: true });

		const promises = fileNames.map(async (file) => {
			const isFile = file.isFile();
			const splittedFileType = file.name.split('.');
			const fileType = splittedFileType[splittedFileType.length - 1];
			const fileName = splittedFileType.slice(0, splittedFileType.length - 1).join('.');
			const filePath = `${IMAGES_PATH.source}/${file.name}`;

			if (isFile && fileTypes.includes(fileType)) {
				const buffer = await readFile(filePath);
				const path = `${IMAGES_PATH.dist}/${fileName}.avif`;
				const job = sharp(buffer);
				const avif = job.avif({ quality: 70 });
				const file = await avif.toFile(path);
				console.log('SUCCESS: ', path);
				return file;
			}
		});

		await Promise.all(promises);
		console.log('✓ DONE');
	} catch (err) {
		console.error(err);
	}
}

convertToAvif();
