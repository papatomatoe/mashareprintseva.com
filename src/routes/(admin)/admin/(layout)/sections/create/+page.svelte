<script lang="ts">
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import File from '$lib/components/File.svelte';
	import slugify from 'slugify';
	import Textarea from '$lib/components/Textarea.svelte';
	import Editor from '$lib/components/Editor.svelte';

	let order = '';
	let orderError = '';
	let title = '';
	let titleError = '';
	let slugError = '';
	let imageUrl = '';
	let imagePreview = '';
	let imageUrlError = '';
	let published = false;

	$: slug = slugify(title, { lower: true });

	$: hasErrors =
		Boolean(imageUrlError) || Boolean(titleError) || Boolean(slugError) || Boolean(orderError);

	const handleRegenerateSlug = () => {
		slug = slugify(title, { lower: true });
	};

	const handleClearImageUrlError = () => {
		imageUrlError = '';
	};

	const handleClearOrderError = () => {
		orderError = '';
	};

	const handleClearTitleError = () => {
		titleError = '';
	};

	const handleClearSlugError = () => {
		slugError = '';
	};

	const handleSubmit = () => {
		if (!imageUrl) imageUrlError = 'required';
		if (!order) orderError = 'required';
		if (!title) titleError = 'required';
		if (!slug) slugError = 'required';
	};
</script>

<Form title="Create New Section" {published} {hasErrors} on:submit={handleSubmit}>
	<div class="row row--top">
		<Input
			label="Order in menu"
			name="order"
			placeholder="0"
			bind:value={order}
			error={orderError}
			on:clearError={handleClearOrderError}
			required
		/>
		<Input
			label="title"
			name="title"
			placeholder="enter page title"
			bind:value={title}
			error={titleError}
			on:clearError={handleClearTitleError}
			required
		/>
		<Input
			label="slug"
			name="slug"
			placeholder="enter slug"
			bind:value={slug}
			on:regenerate={handleRegenerateSlug}
			error={slugError}
			on:clearError={handleClearSlugError}
			isSlug
			required
		/>
	</div>
	<div class="row row--mid">
		<Input label="alternative title" name="altTitle" placeholder="enter alternative title" />
		<File
			label="image"
			required
			on:clearError={handleClearImageUrlError}
			bind:fileUrl={imageUrl}
			bind:preview={imagePreview}
			error={imageUrlError}
		/>
		<div class="subtitle">
			<Textarea name="subtitle" label="subtitle" placeholder="enter subtitle" />
		</div>
	</div>
	<div class="editor row row--bottom">
		<Editor name="content" label="content" />
	</div>
	<div slot="side" />
</Form>

<style>
	.row {
		grid-column: 1 /2;
		display: grid;
		gap: 30px;
	}
	.row--top {
		grid-row: 1 / 2;
		grid-template-columns: 110px 1fr 1fr;
	}
	.row--mid {
		grid-row: 2 /3;
		grid-auto-flow: column;
		grid-template-columns: 320px 1fr;
		grid-template-rows: min-content min-content;
	}
	.row--bottom {
		grid-row: 3 / 4;
	}

	.subtitle {
		grid-row: 1/ -1;
	}
	:global(.subtitle .field) {
		height: 100%;
	}
</style>
