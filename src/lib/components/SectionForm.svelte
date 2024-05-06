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

	import type { Section } from '@prisma/client';

	export let form;
	export let section: Section | null = null;

	let projects = [
		{ id: '1', title: 'The Unseen Hues', published: true },
		{ id: '2', title: 'Serendipity of Man', published: true },
		{ id: '3', title: 'Intricate Proportion No.21', published: true },
		{ id: '4', title: 'In a Former Home', published: false },
		{ id: '5', title: 'Vortex Constellation', published: true }
	];

	let selectedProjects = projects;

	let id = section?.id ?? '';
	let order = String(section?.order ?? '');
	let orderError = '';
	let title = section?.title ?? '';
	let titleError = '';
	let slugError = '';
	let imageUrl = section?.image ?? '';
	let imageThumbnail = section?.thumbnail ?? '';
	let imageUrlError = '';
	let published = Boolean(section?.published);
	let subtitle = section?.subtitle ?? '';
	let altTitle = section?.altTitle ?? '';
	let content = section?.content ?? '';
	let slug = section?.slug ?? '';

	$: projectsValue = JSON.stringify(selectedProjects);

	$: hasErrors =
		Boolean(imageUrlError) || Boolean(titleError) || Boolean(slugError) || Boolean(orderError);

	$: options = projects.map((el) => ({ title: el.title, value: el.id }));

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

	const handleDeleteProject = (id: string) => {
		selectedProjects = selectedProjects.filter((project) => project.id !== id);
	};

	const handleSelectProject = (e: ComponentEvents<Select>['select']) => {
		const selectedProject = projects.find((el) => el.id === e.detail.value);

		if (!selectedProject || selectedProjects.find((el) => el.id === e.detail.value)) return;

		selectedProjects = [...selectedProjects, selectedProject];
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
			placeholder="enter section title"
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
		<Input
			label="alternative title"
			name="altTitle"
			placeholder="enter alternative title"
			value={altTitle}
		/>
		<File
			label="image"
			required
			on:clearError={handleClearImageUrlError}
			bind:fileUrl={imageUrl}
			bind:thumbnail={imageThumbnail}
			error={imageUrlError}
		/>
		<div class="subtitle">
			<Textarea name="subtitle" label="subtitle" placeholder="enter subtitle" value={subtitle} />
		</div>
	</div>
	<div class="editor row row--bottom">
		<Editor name="content" label="content" value={content} />
	</div>
	<div class="section-form__side" slot="side">
		<Select
			select2
			label="projects"
			placeholder="select project..."
			{options}
			on:select={handleSelectProject}
		/>
		{#if selectedProjects.length}
			<ul class="projects">
				{#each selectedProjects as project (project.id)}
					<li class="project">
						<div class="project__status" class:project__status--published={project.published} />
						<h3 class="project__title">{project.title}</h3>
						<button
							class="button project__button"
							type="button"
							on:click={() => handleDeleteProject(project.id)}
							aria-label="remove project"
						/>
					</li>
				{/each}
			</ul>
		{/if}
		<input name="id" type="hidden" readonly value={id} />
		<input name="projects" type="hidden" readonly bind:value={projectsValue} />
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
		grid-template-columns: 110px 1fr 1fr;
	}
	.row--mid {
		grid-row: 2 /3;
		grid-auto-flow: column;
		grid-template-columns: 400px 1fr;
		grid-template-rows: min-content min-content;
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
