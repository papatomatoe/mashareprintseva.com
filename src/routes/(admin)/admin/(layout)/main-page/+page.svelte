<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';

	// import Form from '$/lib/components/Form.svelte';
	// import { NotificationType } from '$/lib/components/Notification.svelte';
	// import { Input } from '$/lib/components/ui/input';
	// import { Editor } from '@tiptap/core';
	import type { PageData } from './$types.js';
	import { toast } from 'svelte-sonner';

	// import Input from '$lib/components/Input.svelte';
	// import Form from '$lib/components/Form.svelte';
	import Editor from '$lib/components/Editor.svelte';
	// import Notification, { type NotificationType } from '$lib/components/Notification.svelte';
	// import { Page } from '$/lib/components/ui/breadcrumb';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	const form = superForm(data.form, {
		resetForm: false
	});

	const { form: formData, message, enhance } = form;

	$effect(() => {
		if ($message) {
			if ($message.status === 'error') {
				toast.error($message.message);
			} else if ($message.status === 'success') {
				toast.success($message.message);
			}
		}
	});

	let title = 'mainPage';
	let slug = '/';
	let content = $derived(data.mainPage?.content || '');
	let published = $derived(data.mainPage?.published ?? false);

	// $: showNotification = Boolean(form);

	// $: notificationMessage = form ? (form?.success ? 'Successfully saved' : 'Error') : '';
	// $: notificationType = (
	// 	form ? (form.success ? 'success' : 'error') : 'default'
	// ) as NotificationType;
</script>

<form class="px-5 py-7" method="POST" novalidate use:enhance>
	<div class="border-b-1 flex items-center justify-between px-5 pb-5">
		<h1>Mani Page</h1>

		<div class="flex items-center space-x-2">
			<Switch id="published" name="published" bind:checked={published} />
			<Label for="published">published</Label>
		</div>
	</div>
	<div class="grid grid-cols-2 gap-10 px-5 py-7">
		<Form.Field {form} name="title">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Title<sup class="text-red-500">*</sup></Form.Label>
					<Input
						class=" bg-neutral-100 text-neutral-500 focus-visible:border-[var(--input)] focus-visible:ring-transparent"
						{...props}
						value={title}
						required
						readonly
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Form.Field {form} name="slug">
			<Form.Control>
				{#snippet children({ props })}
					<Form.Label>Slug<sup class="text-red-500">*</sup></Form.Label>
					<Input
						class=" bg-neutral-100 text-neutral-500 focus-visible:border-[var(--input)] focus-visible:ring-transparent"
						{...props}
						value={slug}
						required
						readonly
					/>
				{/snippet}
			</Form.Control>
			<Form.FieldErrors />
		</Form.Field>
		<Editor label="content" name="content" bind:value={content} />
	</div>
	<Form.Button type="submit">Save</Form.Button>
</form>

<!-- <Notification show={showNotification} message={notificationMessage} type={notificationType} /> -->
<!-- <Form title="Main Page" {published}> -->
<!-- <div slot="preview"> -->
<!-- <Page
			data={{
				social: [],
				menu: [],
				pageTitle: 'Main Page',
				main: { id: 'main-page-preview', published: true, title, slug, content }
			}}
		/> -->
<!-- </div> -->

<!-- <Input
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
		<Editor label="content" name="content" bind:value={content} />
	</div> -->
<!-- </Form> -->

<style>
	.editor {
		grid-column: 1 /-1;
	}
</style>
