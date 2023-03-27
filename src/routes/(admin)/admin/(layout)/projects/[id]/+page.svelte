<script lang="ts">
	import slugify from 'slugify';
	import Editor from '$lib/components/Editor.svelte';
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import File from '$lib/components/File.svelte';
	import Select, { type IOption } from '$lib/components/Select.svelte';
	import { Remove } from '$lib/components/icons';

	let title = '';
	let titleError = '';
	let slug = '';
	let slugError = '';
	let description = '';
	let subtitle = '';
	let images: FileList | null = null;
	let preview: FileList | null = null;
	let options = [
		{ title: 'The Unseen Hues', value: '1' },
		{ title: 'Serendipity of Man', value: '2' },
		{ title: 'Intricate Proportion No.21', value: '3' },
		{ title: 'In a Former Home', value: '4' },
		{ title: 'Vortex Constellation', value: '5' }
	];
	let selectedSection: IOption | null = null;

	$: optionsWithSelected = options.filter((el) => el.value !== selectedSection?.value);
	$: slug = slugify(title, { lower: true });

	const handleClearTitleError = () => {
		titleError = '';
	};
	const handleClearSlugError = () => {
		slugError = '';
	};

	const handleRegenerateSlug = () => {
		slug = slugify(title, { lower: true });
	};

	const handleSelectSection = (e: CustomEvent) => {
		selectedSection = e.detail;
	};
	const handleRemoveSection = (id) => {
		selectedSection = null;
	};
</script>

<Form title="New Item">
	<div class="form__fields form__fields--top">
		<Input label="id" name="id" disabled />
		<Input
			label="title"
			name="title"
			placeholder="enter title"
			error={titleError}
			bind:value={slug}
			on:clearError={handleClearTitleError}
			required
		/>
		<Input
			label="slug"
			name="slug"
			placeholder="enter slug"
			error={slugError}
			bind:value={slug}
			on:clearError={handleClearSlugError}
			on:regenerate={handleRegenerateSlug}
			isSlug
			required
		/>
	</div>
	<div class="editor">
		<Editor id="project-subtitle" label="subtitle" bind:value={subtitle} />
	</div>
	<div class="form__fields form__fields--mid">
		<File
			name="image"
			label="preview"
			placeholder="Drag 'n' drop image here, or click to select image"
			required
			bind:files={preview}
		/>
		<File
			name="image"
			label="image"
			placeholder="Drag 'n' drop image here, or click to select image"
			required
			bind:files={images}
		/>
	</div>
	<div class="editor">
		<Editor id="project-description" label="description" bind:value={description} />
	</div>
	<div slot="side" class="form__select select">
		<div class="select__wrapper">
			<p class="select__label">section</p>
			<Select
				options={optionsWithSelected}
				on:select={handleSelectSection}
				placeholder="select project"
				clearable
			/>
			{#if selectedSection}
				<ul class="select__projects">
					<li class="select__project">
						<span>{selectedSection.title}</span>
						<button
							class="button select__button"
							type="button"
							on:click={() => handleRemoveSection(selectedSection?.value)}
						>
							<Remove />
						</button>
					</li>
				</ul>
			{/if}
		</div>
	</div>
</Form>

<style>
	.form__fields {
		grid-column: 1 / -1;
		display: grid;
	}

	.form__fields--top {
		grid-template-columns: 60px 1fr 1fr;
		gap: 31px;
	}

	.form__fields--mid {
		grid-template-columns: 1fr 1fr;
		gap: 31px;
	}

	.editor {
		grid-column: 1 /-1;
	}

	.select__projects {
		margin-top: 20px;
		display: grid;
		gap: 6px;
	}
	.select__project {
		display: grid;
		grid-template-columns: 1fr 32px;
		align-items: center;
	}

	.select__button {
		display: grid;
		place-items: center;
		width: 32px;
		height: 32px;
		background-color: #fff;
		--color-icon: #d8d8d8;
	}

	.select__button:hover,
	.select__button:focus-visible {
		--color-icon: #8a6f48;
	}
	.select__button:active {
		--color-icon: #454545;
	}
</style>
