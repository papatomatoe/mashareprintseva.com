<script lang="ts">
	import slugify from 'slugify';
	import Editor from '$lib/components/EditorOld.svelte';
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import Textarea from '$lib/components/Textarea.svelte';
	import File from '$lib/components/File.svelte';
	import Select, { type IOption } from '$lib/components/Select.svelte';
	import Remove from '$lib/icons/Remove.svelte';

	let order = '1';
	let orderError = '';
	let title = '';
	let titleError = '';
	let slug = '';
	let slugError = '';
	let altTitle = '';
	let description = '';
	let subtitle = '';

	let image = '';
	let imagePreview = '';
	let imageError = '';

	let options = [
		{ title: 'The Unseen Hues', value: '1' },
		{ title: 'Serendipity of Man', value: '2' },
		{ title: 'Intricate Proportion No.21', value: '3' },
		{ title: 'In a Former Home', value: '4' },
		{ title: 'Vortex Constellation', value: '5' }
	];
	let selectedProjects: IOption[] = [];

	$: optionsWithSelected = options.filter((el) => !selectedProjects.includes(el));
	$: slug = slugify(title, { lower: true });

	const handleClearOrderError = () => {
		orderError = '';
	};
	const handleClearTitleError = () => {
		titleError = '';
	};
	const handleClearSlugError = () => {
		slugError = '';
	};

	const handleRegenerateSlug = () => {
		slug = slugify(title, { lower: true });
	};

	const handleSelectProject = (e: CustomEvent) => {
		selectedProjects = [...selectedProjects, e.detail];
	};
	const handleRemoveProject = <T>(id: T) => {
		selectedProjects = selectedProjects.filter((el) => el.value !== id);
	};

	const handleClearImageError = () => {
		imageError = '';
	};

	const handleSubmit = () => {
		if (!image) imageError = '';
	};

	$: hasErrors = Boolean(imageError);
</script>

<Form title="New Item" {hasErrors} on:submit={handleSubmit}>
	<div class="form__fields form__fields--top">
		<Input label="id" name="id" disabled />
		<Input
			label="order"
			name="order"
			error={orderError}
			bind:value={order}
			on:clearError={handleClearOrderError}
			required
		/>
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
	<div class="form__fields form__fields--mid">
		<Input
			label="alternative title"
			name="slug"
			placeholder="enter alternative title"
			bind:value={altTitle}
		/>
		<div class="form__subtitle">
			<Textarea name="subtitle" label="subtitle" value={subtitle} />
		</div>
		<File
			label="image"
			required
			on:clearError={handleClearImageError}
			bind:fileUrl={image}
			bind:preview={imagePreview}
			error={imageError}
		/>
	</div>
	<div class="editor">
		<Editor id="sections-description" label="description" bind:value={description} />
	</div>
	<div slot="side" class="form__select select">
		<div class="select__wrapper">
			<p class="select__label">projects</p>
			<Select
				options={optionsWithSelected}
				on:select={handleSelectProject}
				placeholder="select project"
				clearable
			/>
			{#if selectedProjects}
				<ul class="select__projects">
					{#each selectedProjects as project (project.value)}
						<li class="select__project">
							<span>{project.title}</span>
							<button
								class="button select__button"
								type="button"
								on:click={() => handleRemoveProject(project.value)}
							>
								<Remove />
							</button>
						</li>
					{/each}
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
		grid-template-columns: 60px 60px 1fr 1fr;
		gap: 31px;
	}

	.form__fields--mid {
		grid-template-columns: minmax(100px, 300px) minmax(200px, 1fr);
		grid-template-rows: repeat(2, min-content);
		gap: 31px;
	}

	.form__subtitle {
		grid-row: 1 /-1;
		grid-column: 2 / -1;
		display: flex;
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
		background-color: var(--color--white);
		--color-icon: var(--color--gray-85);
	}

	.select__button:hover,
	.select__button:focus-visible {
		--color-icon: var(--color--primary);
	}
	.select__button:active {
		--color-icon: var(--color--gray-30);
	}
</style>
