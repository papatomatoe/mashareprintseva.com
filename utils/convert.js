import { readdir, readFile, unlink } from 'node:fs/promises';
import sharp from 'sharp';

const IMAGES_PATH = { source: './images', dist: './static/images' };
const fileTypes = ['jpeg', 'jpg', 'png'];

async function convertToAvif() {
	try {
		const sourceImages = await readdir(IMAGES_PATH.source, { withFileTypes: true });
		const distImages = await readdir(IMAGES_PATH.dist);

		const _sourceImages = sourceImages.map((file) => file.name.split('.')[0]);
		const _distImages = distImages.map((path) => path.split('.')[0]);
		const setSource = new Set(_sourceImages);
		const distSource = new Set(_distImages);

		if (sourceImages.length > distImages.length) {
			const addedFilesSet = setSource.difference(distSource);

			const addedFiles = [...addedFilesSet];

			const newFiles = sourceImages.filter((file) => addedFiles.includes(file.name.split('.')[0]));

			const promises = newFiles.map(async (file) => {
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
		} else if (sourceImages.length < distImages.length) {
			const unlinkedFilesSet = distSource.difference(setSource);

			const unlinkedFiles = [...unlinkedFilesSet];

			if (unlinkedFiles.length) {
				const promises = unlinkedFiles.map((file) => {
					const path = `./static/images/${file}.avif`;
					const u = unlink(path);
					console.log('DELETED: ', path);
					return u;
				});

				await Promise.all(promises);
				console.log('✓ DONE');
			}
		} else {
			console.log('CONVERT PASS: No new images');
		}
	} catch (err) {
		console.error(err);
	}
}

convertToAvif();
