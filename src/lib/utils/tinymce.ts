export const conf = {
	skin: 'mashareprintseva',
	skinURL: '/tinymce/skins/ui/mashareprintseva/skin.min.css',
	contentURL: '/tinymce/skins/content/mashareprintseva/content.min.css',
	branding: false,
	promotion: false,
	menubar: false,
	min_height: 270,
	height: 270,
	max_height: 700,
	autoresize_bottom_margin: 30,
	content_style: 'body { font-size: 14px }',
	plugins: [
		'autoresize',
		'autolink',
		'lists',
		'link',
		'image',
		'searchreplace',
		'fullscreen',
		'media',
		'table',
		'code',
		'codesample'
	],

	toolbar:
		'undo redo | styles | alignleft aligncenter alignright | bold italic | bullist numlist | link image | code fullscreen',
	file_picker_types: 'image',
	// @see https://www.tiny.cloud/docs/tinymce/6/file-image-upload/#interactive-example
	file_picker_callback: (cb: (arg0: any, arg1: { title: any }) => void) => {
		// const input = document.createElement('input');
		// input.setAttribute('type', 'file');
		// input.setAttribute('accept', 'image/*');
		// input.addEventListener('change', (e) => {
		// 	const target = e.target as HTMLInputElement;
		// 	const file = target.files?.length && target.files[0];
		// 	const reader = new FileReader();
		// 	reader.addEventListener('load', () => {
		// 		if (reader.result && reader.result !== null) {
		// 			if (!tinymce) return;
		// 			const id = 'blobid' + new Date().getTime();
		// 			const blobCache = tinymce.activeEditor.editorUpload.blobCache;
		// 			const base64 = (reader.result as string).split(',')[1];
		// 			const blobInfo = blobCache.create(id, file, base64);
		// 			blobCache.add(blobInfo);
		// 			file && cb(blobInfo.blobUri(), { title: file.name });
		// 		}
		// 	});
		// 	file && reader.readAsDataURL(file);
		// });
		// input.click();
	}
};
