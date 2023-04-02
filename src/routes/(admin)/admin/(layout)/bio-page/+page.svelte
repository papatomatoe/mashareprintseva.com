<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import File from '$lib/components/File.svelte';

	export let data;

	let title = 'Bio';
	let slug = 'bio';
	let epigraph = data.bio?.epigraph || '';
	let content = data.bio?.content || '';
	let fileUrl = data.bio?.image || '';
	let preview = data.bio?.preview || '';
	let fileUrlError = '';
	let published = data.bio?.published;

	const handleSubmit = (e: SubmitEvent) => {
		if (!fileUrl) fileUrlError = 'require';
	};

	const handleClearFileUrlError = () => {
		fileUrlError = '';
	};

	$: hasErrors = Boolean(fileUrlError);
</script>

<Form title="Bio Page" {published} {hasErrors} on:submit={handleSubmit}>
	<Input
		label="title"
		name="title"
		placeholder="enter page title"
		bind:value={title}
		required
		disabled
	/>
	<Input
		label="slug"
		name="slug"
		placeholder="enter slug"
		bind:value={slug}
		isSlug
		required
		disabled
	/>
	<File
		name="image"
		label="image"
		required
		on:clearError={handleClearFileUrlError}
		bind:fileUrl
		bind:preview
		error={fileUrlError}
	/>
	<Textarea name="epigraph" label="epigraph" placeholder="enter epigraph" value={epigraph} />
	<div class="editor">
		<Editor id="bio-page-content" name="content" label="content" bind:value={content} />
	</div>
</Form>

<style>
	.editor {
		grid-column: 1 /-1;
	}
</style>
