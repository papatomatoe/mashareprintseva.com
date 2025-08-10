<script lang="ts">
	import { superForm, type Infer, type SuperValidated } from 'sveltekit-superforms';
	import { Label } from '$lib/components/ui/label/index.js';
	import { Switch } from '$lib/components/ui/switch/index.js';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import { toast } from 'svelte-sonner';
	import Editor from '$lib/components/admin/Editor/Editor.svelte';
	import type { MainPageSchemaType } from '$/lib/validators/main';

	type Props = {
		form: SuperValidated<MainPageSchemaType>;
	};

	let { form }: Props = $props();

	const superform = superForm(form, {
		resetForm: false
	});

	const { form: formData, message, enhance } = superform;

	$effect(() => {
		if ($message) {
			if ($message.status === 'error') {
				toast.error($message.text);
			} else if ($message.status === 'success') {
				toast.success($message.text);
			}
		}
	});

	let title = 'Main Page';
	let slug = '/';
</script>

<form class="px-5 py-7" method="POST" use:enhance novalidate>
	<input type="hidden" name="id" value="main-page" />
	<div class="border-b-1 flex items-center justify-between px-5 pb-5">
		<h1>Mani Page</h1>

		<div class="flex items-center space-x-2">
			<Switch id="published" name="published" bind:checked={$formData.published} />
			<Label for="published">published</Label>
		</div>
	</div>
	<div class="grid grid-cols-2 gap-10 px-5 py-7">
		<Form.Field form={superform} name="title">
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
		<Form.Field form={superform} name="slug">
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
		<Editor label="Content" name="content" bind:value={$formData.content} />
		<Form.Button class="col-span-2 w-fit justify-self-end" type="submit">Save changes</Form.Button>
	</div>
</form>

<style>
</style>
