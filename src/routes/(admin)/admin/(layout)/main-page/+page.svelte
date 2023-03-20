<script lang="ts">
	import type { ActionResult } from '@sveltejs/kit';
	import slugify from 'slugify';
	import { applyAction, deserialize } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import Input from '$lib/components/Input.svelte';
	import Form from '$lib/components/Form.svelte';
	import Editor from '$lib/components/Editor.svelte';

	let title = '';
	let titleError = '';
	let slug = '';
	let content = '';

	const handleClearTitleError = () => {
		titleError = '';
	};

	const handleRegenerateSlug = () => {
		slug = slugify(title, { lower: true });
	};

	const handleSubmit = async (e: Event) => {
		e.preventDefault();
		const form = e.target as HTMLFormElement;
		if (!title) titleError = 'required';

		if (titleError) return;

		const data = new FormData(form);
		data.append('content', content);

		const response = await fetch(form.action, {
			method: 'POST',
			body: data
		});
		const result: ActionResult = deserialize(await response.text());

		if (result.type === 'success') {
			await invalidateAll();
		}

		applyAction(result);
	};

	$: slug = slugify(title, { lower: true });
</script>

<Form title="Main Page" on:submit={handleSubmit}>
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
	<div class="editor">
		<Editor id="main-page-content" label="content" bind:value={content} />
	</div>
</Form>

<style>
	.editor {
		grid-column: 1 /-1;
	}
</style>
