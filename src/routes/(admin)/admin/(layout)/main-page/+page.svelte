<script lang="ts">
	import Input from '$lib/components/Input.svelte';
	import Form from '$lib/components/Form.svelte';
	import Editor from '$lib/components/EditorOld.svelte';
	import Notification, { type NotificationType } from '$lib/components/Notification.svelte';

	export let data;
	export let form;

	let title = 'mainPage';
	let slug = '/';
	let content = data.mainPage?.content || '';
	let published = data.mainPage?.published;

	$: showNotification = Boolean(form);

	$: notificationMessage = form ? (form?.success ? 'Successfully saved' : 'Error') : '';
	$: notificationType = (
		form ? (form.success ? 'success' : 'error') : 'default'
	) as NotificationType;
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
