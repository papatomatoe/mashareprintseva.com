import { readdir, readFile, unlink, copyFile } from 'node:fs/promises';
import sharp from 'sharp';

const FILE_PATH = { source: './uploads', images: './static/images', files: './static/files' };
const IMAGE_TYPES = ['jpeg', 'jpg', 'png'];
const DOC_TYPES = ['pdf'];

const checkFileType = (fileType) =>
	(IMAGE_TYPES.includes(fileType) && 'image') || (DOC_TYPES.includes(fileType) && 'pdf');

async function processDocuments(sourceFiles) {
	const distDocs = await readdir(FILE_PATH.files);

	const sourceDocs = sourceFiles.filter((file) => DOC_TYPES.includes(file.name.split('.').at(-1)));

	const _sourceDocs = sourceDocs.map((file) => file.name.split('.').at(0));
	const _distDocs = distDocs.map((path) => path.split('.')[0]);

	const setSourceDocs = new Set(_sourceDocs);
	const setDistDocs = new Set(_distDocs);

	if (setSourceDocs.size > setDistDocs.size) {
		const addedDocsSet = setSourceDocs.difference(setDistDocs);
		const addedDocs = [...addedDocsSet];
		const newDocs = sourceDocs.filter((doc) => addedDocs.includes(doc.name.split('.').at(0)));

		const promises = newDocs.map(async (doc) => {
			const docDistPath = `${FILE_PATH.files}/${doc.name}`;
			const docSourcePath = `${FILE_PATH.source}/${doc.name}`;
			await copyFile(docSourcePath, docDistPath);
			console.log('COPY: ', docSourcePath, ' -> ', docDistPath);
		});

		await Promise.all(promises);
		console.log('✓ DONE');
	} else if (setSourceDocs.size < setDistDocs.size) {
		const unlinkedDocsSet = setDistDocs.difference(setSourceDocs);
		const unlinkedDocs = [...unlinkedDocsSet];

		const deletedDocs = distDocs.filter((doc) => unlinkedDocs.includes(doc.split('.').at(0)));

		if (deletedDocs.length) {
			const promises = deletedDocs.map(async (file) => {
				const path = `${FILE_PATH.files}/${file}`;
				const unlinked = await unlink(path);
				console.log('DELETED: ', path);
				return unlinked;
			});
			await Promise.all(promises);
			console.log('✓ DONE');
		}
	} else {
		console.log('DOCUMENTS COPY PASS: No new files\n');
	}
}

async function processImages(sourceFiles) {
	const distImages = await readdir(FILE_PATH.images);
	const sourceImages = sourceFiles.filter((file) => {
		return IMAGE_TYPES.includes(file.name.split('.').at(-1));
	});

	const _sourceImages = sourceImages.map((file) => file.name.split('.').at(0));
	const _distImages = distImages.map((path) => path.split('.')[0]);

	const setSourceImages = new Set(_sourceImages);
	const setDistImages = new Set(_distImages);

	if (setSourceImages.size > setDistImages.size) {
		const addedImagesSet = setSourceImages.difference(setDistImages);

		const addedImages = [...addedImagesSet];

		const newFiles = sourceImages.filter((file) => addedImages.includes(file.name.split('.')[0]));

		const promises = newFiles.map(async (file) => {
			const isFile = file.isFile();
			const splittedFileType = file.name.split('.');
			const fileType = splittedFileType[splittedFileType.length - 1];
			const fileName = splittedFileType.slice(0, splittedFileType.length - 1).join('.');
			const filePath = `${FILE_PATH.source}/${file.name}`;

			if (isFile) {
				const checkedFileType = checkFileType(fileType);

				if (!checkFileType || checkedFileType !== 'image') return;

				const buffer = await readFile(filePath);
				const path = `${FILE_PATH.images}/${fileName}.avif`;
				const job = sharp(buffer);
				const avif = job.avif({ quality: 70 });
				const file = await avif.toFile(path);
				console.log('SUCCESS: ', path);
				return file;
			}
		});

		await Promise.all(promises);
		console.log('✓ DONE');
	} else if (setSourceImages.size < setDistImages.size) {
		const unlinkedFilesSet = setDistImages.difference(setSourceImages);
		const unlinkedFiles = [...unlinkedFilesSet];
		if (unlinkedFiles.length) {
			const promises = unlinkedFiles.map((file) => {
				const path = `./${FILE_PATH.images}/${file}.avif`;
				const u = unlink(path);
				console.log('DELETED: ', path);
				return u;
			});
			await Promise.all(promises);
			console.log('✓ DONE');
		}
	} else {
		console.log('IMAGES CONVERT PASS: No new images');
	}
}

async function filesProcess() {
	try {
		const sourceFiles = await readdir(FILE_PATH.source, { withFileTypes: true });

		await processDocuments(sourceFiles);
		await processImages(sourceFiles);
	} catch (err) {
		console.error(err);
	}
}

filesProcess();
