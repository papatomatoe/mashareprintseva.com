<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Form from '$lib/components/Form.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import Notification from '$lib/components/Notification.svelte';
	export let data;
	export let form;

	let title = 'mainPage';
	let slug = '/';
	let content = data.mainPage?.content || '';
	let published = data.mainPage?.published;

	$: console.log(form);

	$: showNotification = Boolean(form);

	$: notificationMessage = form?.success ? 'Successfully saved' : 'Error';
	$: notificationType = form?.success ? 'success' : 'error';
</script>

<Notification show={showNotification} message={notificationMessage} type={notificationType} />
<Form title="Main Page" {published}>
	<Input
		label="title"
		name="title"
		placeholder="enter page title"
		bind:value={title}
		disabled
		required
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
	<div class="editor">
		<Editor id="main-page-content" label="content" name="content" bind:value={content} />
	</div>
</Form>

<style>
	.editor {
		grid-column: 1 /-1;
	}
</style>
