<script lang="ts">
	import Projects from '$lib/components/Projects.svelte';
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	const project = $derived(data.project);
</script>

<section class="project">
	<div class="project__wrapper">
		<h2 class="project__title">{project.title}</h2>
		{#if project.subtitle}
			<div class="project__subtitle">
				{@html project.subtitle}
			</div>
		{/if}

		<div class="project__image">
			<img src={project.image} alt={project.title} />
		</div>
	</div>
	<div class="project__content">
		{@html project.content}
	</div>
	{#if project.restProjects && project.restProjects.length}
		<section class="projects">
			<h2 class="projects__title">Projects</h2>
			<Projects projects={project.restProjects} section={project.section ?? ''} />
		</section>
	{/if}
</section>

<style>
	.project {
		display: block;

		padding-top: 25px;
		height: 100%;
	}

	.project__title {
		margin: 0 auto;
		margin-bottom: 50px;
		padding-top: 15px;
		width: 100%;
		color: var(--color--black);
		font-style: normal;

		font-weight: 700;
		font-size: 28px;
		line-height: 1.5;
		font-family: var(--font--secondary);
	}

	.project__image {
		position: relative;
		margin-bottom: 100px;
		width: 100%;
		overflow: hidden;
	}

	.projects {
		margin-top: 100px;
		border-top: 1px solid var(--color--gray-85);
		padding-top: 50px;
	}
	@media (min-width: 768px) {
		.project {
			margin: 0 auto;
			padding-top: 50px;
			width: 90%;
		}
		.project__wrapper {
			margin-bottom: 100px;
		}
		.project__title {
			align-self: center;
			margin-bottom: 85px;
			padding-top: 0;

			font-weight: 400;
			font-size: 46px;
		}

		.project__image {
			grid-row: 1 / 3;
			grid-column: 2 / -1;
			margin-bottom: 0;
			height: fit-content;
		}

		.project__image img {
			margin: 0 auto;
		}

		.projects {
			grid-column: 1 / -1;
		}
	}
	@media (min-width: 1200px) {
		.project {
			border-top: none;
			padding-top: 150px;
			width: 100%;
		}
		.project__wrapper {
			display: grid;
			grid-template-columns: 1fr 1fr;
			gap: 20px;
			margin-bottom: 50px;
		}
		.project__title {
			margin: 0;
			width: 90%;
			font-size: 72px;
		}

		.project__image {
			position: relative;
			margin-bottom: 100px;
			width: 100%;
			overflow: hidden;
		}
	}
</style>
