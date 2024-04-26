import fs from 'fs/promises';

console.log(process.env.STATIC_PATH);

const IMAGES_PATH = './static/upload';

try {
	const files = await fs.readdir(IMAGES_PATH, { withFileTypes: true });

	files.forEach(async (file) => {
		const fp = file.path;

		const filePath = `${fp}/${file.name}`;
		fs.unlink(filePath);
	});
	console.log('✓ DONE');
} catch (err) {
	console.error(err);
}
