<script lang="ts">
	import slugify from 'slugify';
	import Editor from '$lib/components/Editor.svelte';
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import File from '$lib/components/File.svelte';

	let title = '';
	let titleError = '';
	let slug = '';
	let epigraph = '';
	let content = '';
	let images: FileList | null = null;

	const handleClearTitleError = () => {
		titleError = '';
	};

	const handleRegenerateSlug = () => {
		slug = slugify(title, { lower: true });
	};

	$: slug = slugify(title, { lower: true });
</script>

<Form title="Bio Page">
	<Input
		label="title"
		name="title"
		placeholder="enter page title"
		error={titleError}
		bind:value={title}
		on:clearError={handleClearTitleError}
		required
	/>
	<Input
		label="slug"
		name="slug"
		placeholder="enter slug"
		error={titleError}
		bind:value={slug}
		on:clearError={handleClearTitleError}
		on:regenerate={handleRegenerateSlug}
		isSlug
		required
	/>
	<File
		name="image"
		label="image"
		placeholder="Drag 'n' drop image here, or click to select image"
		required
		bind:files={images}
	/>
	<Textarea name="epigraph" label="epigraph" value={epigraph} />
	<div class="editor">
		<Editor id="bio-page-content" label="content" bind:value={content} />
	</div>
</Form>

<style>
	.editor {
		grid-column: 1 /-1;
	}
</style>
