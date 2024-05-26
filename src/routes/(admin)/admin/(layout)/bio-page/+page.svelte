<script lang="ts">
	import Editor from '$lib/components/Editor.svelte';
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import File from '$lib/components/File.svelte';
	import Notification, { type NotificationType } from '$lib/components/Notification.svelte';
	import Page from '$routes/(public)/bio/+page.svelte';

	export let data;
	export let form;

	let title = 'Bio';
	let slug = 'bio';
	let epigraph = data.bio?.epigraph || '';
	let content = data.bio?.content || '';
	let fileUrl = data.bio?.image || '';
	let thumbnail = data.bio?.thumbnail || '';
	let fileUrlError = '';
	let published = data.bio?.published;

	const handleSubmit = (e: SubmitEvent) => {
		if (!fileUrl) fileUrlError = 'require';
	};

	const handleClearFileUrlError = () => {
		fileUrlError = '';
	};

	$: hasErrors = Boolean(fileUrlError);
	$: showNotification = Boolean(form);
	$: notificationMessage = form ? (form?.success ? 'Successfully saved' : 'Error') : '';
	$: notificationType = (
		form ? (form.success ? 'success' : 'error') : 'default'
	) as NotificationType;
</script>

<Notification show={showNotification} message={notificationMessage} type={notificationType} />
<Form title="Bio Page" {published} {hasErrors} on:submit={handleSubmit}>
	<div slot="preview">
		<Page
			data={{
				menu: [],
				social: [],
				pageTitle: 'Bio Page',
				bio: {
					id: 'bio-page-preview',
					published: true,
					title,
					slug,
					epigraph,
					content,
					image: fileUrl,
					thumbnail
				}
			}}
		/>
	</div>
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
		label="image"
		required
		on:clearError={handleClearFileUrlError}
		bind:fileUrl
		bind:thumbnail
		error={fileUrlError}
	/>
	<Textarea name="epigraph" label="epigraph" placeholder="enter epigraph" value={epigraph} />

	<div class="editor">
		<Editor name="content" label="content" bind:value={content} />
	</div>
</Form>

<style>
	.editor {
		grid-column: 1 /-1;
	}
</style>
