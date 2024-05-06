<script lang="ts">
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import File from '$lib/components/File.svelte';
	import slugify from 'slugify';
	import Textarea from '$lib/components/Textarea.svelte';
	import Editor from '$lib/components/Editor.svelte';
	import Select from '$lib/components/Select.svelte';
	import type { ComponentEvents } from 'svelte';
	import Notification, { type NotificationType } from '$lib/components/Notification.svelte';

	import type { Project, Section } from '@prisma/client';

	export let form;
	export let project: Project | null = null;

	export let sections: Section[] = [];

	let selectedSection: Section | null = null;

	let id = project?.id ?? '';
	let title = project?.title ?? '';
	let titleError = '';
	let slugError = '';
	let projectPreviewUrl = project?.preview ?? '';
	let projectPreviewThumbnail = project?.previewThumbnail ?? '';
	let projectPreviewUrlError = '';
	let projectImageUrl = project?.image ?? '';
	let projectImageThumbnail = project?.thumbnail ?? '';
	let projectImageUrlError = '';
	let published = Boolean(project?.published);
	let subtitle = project?.subtitle ?? '';
	let content = project?.content ?? '';
	let slug = project?.slug ?? '';

	$: sectionValue = JSON.stringify(selectedSection);

	$: hasErrors =
		Boolean(projectImageUrlError) ||
		Boolean(projectPreviewUrlError) ||
		Boolean(titleError) ||
		Boolean(slugError);

	$: options = sections.map((el) => ({ title: el.title, value: el.id }));

	const handleRegenerateSlug = () => {
		slug = slugify(title, { lower: true });
	};

	const handleClearProjectImageUrlError = () => {
		projectImageUrlError = '';
	};

	const handleClearProjectPreviewError = () => {
		projectPreviewUrlError = '';
	};

	const handleClearTitleError = () => {
		titleError = '';
	};

	const handleClearSlugError = () => {
		slugError = '';
	};

	const handleSubmit = () => {
		if (!projectImageUrl) projectImageUrlError = 'required';
		if (!projectPreviewUrl) projectPreviewUrlError = 'required';
		if (!title) titleError = 'required';
		if (!slug) slugError = 'required';
	};

	const handleDeleteSection = () => {
		selectedSection = null;
	};

	const handleSelectProject = (e: ComponentEvents<Select>['select']) => {
		const selected = sections.find((el) => el.id === e.detail.value);

		if (!selected) return;

		selectedSection = selected;
	};
	$: showNotification = Boolean(form);
	$: notificationMessage = form
		? form?.success
			? 'Successfully saved'
			: form.message ?? 'Error'
		: '';
	$: notificationType = (
		form ? (form.success ? 'success' : 'error') : 'default'
	) as NotificationType;
</script>

<Notification show={showNotification} message={notificationMessage} type={notificationType} />
<Form title="Create New Project" {published} {hasErrors} on:submit={handleSubmit}>
	<div class="row row--top">
		<Input
			label="title"
			name="title"
			placeholder="enter project title"
			bind:value={title}
			on:input={(e) => (slug = slugify(e.detail, { lower: true }))}
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
		<File
			label="preview image"
			required
			on:clearError={handleClearProjectPreviewError}
			bind:fileUrl={projectPreviewUrl}
			bind:preview={projectPreviewThumbnail}
			error={projectPreviewUrlError}
			name="projectPreview"
			thumbnailName="projectPreviewThumbnail"
		/>
		<File
			label="main image"
			required
			on:clearError={handleClearProjectImageUrlError}
			bind:fileUrl={projectImageUrl}
			bind:preview={projectImageThumbnail}
		/>
	</div>
	<div class="editor row row--bottom">
		<Editor name="subtitle" label="subtitle" value={subtitle} />
		<Editor name="content" label="content" value={content} />
	</div>
	<div class="section-form__side" slot="side">
		<Select
			select2
			label="section"
			placeholder="select section..."
			{options}
			on:select={handleSelectProject}
		/>
		{#if selectedSection}
			<ul class="projects">
				<li class="project">
					<div
						class="project__status"
						class:project__status--published={selectedSection.published}
					/>
					<h3 class="project__title">{selectedSection.title}</h3>
					<button
						class="button project__button"
						type="button"
						on:click={handleDeleteSection}
						aria-label="remove project"
					/>
				</li>
			</ul>
		{/if}
		<input name="id" type="hidden" readonly value={id} />
		<input name="section" type="hidden" readonly bind:value={sectionValue} />
	</div>
</Form>

<style>
	.row {
		grid-column: 1 / -1;
		display: grid;
		gap: 30px;
	}
	.row--top {
		grid-row: 1 / 2;
		grid-template-columns: 1fr 1fr;
	}
	.row--mid {
		grid-row: 2 /3;
		grid-auto-flow: column;
		grid-template-columns: 1fr 1fr;
		grid-template-rows: min-content;
	}
	.row--bottom {
		grid-row: 3 / 4;
	}

	.subtitle {
		grid-row: 1/ -1;
	}

	.projects {
		padding: 15px 8px;
		display: grid;
		gap: 15px;
	}
	.project {
		display: grid;
		grid-template-columns: 7px 1fr 30px;
		align-items: center;
		gap: 10px;
	}

	.project__status {
		width: 7px;
		height: 7px;
		border-radius: 50%;
		background-color: var(--color--red-light);
	}

	.project__status--published {
		background-color: var(--color--green-light);
	}

	.project__button {
		position: relative;
		width: 30px;
		height: 30px;
		background-color: transparent;
	}
	.project__button::after {
		position: absolute;
		content: '';
		width: 16px;
		height: 3px;
		top: 50%;
		left: 50%;
		translate: -50%;
		background-color: var(--color--gray-85);
	}
	.project__button:hover,
	.project__button:focus-visible {
		background-color: var(--color--primary);
	}
	.project__button:active {
		background-color: var(--color--gray-30);
	}
	:global(.subtitle .field) {
		height: 100%;
	}
</style>
