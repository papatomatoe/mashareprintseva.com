<script lang="ts">
	import Projects from '$lib/components/Projects.svelte';
	import type { PageData } from './$types';

	export let data: PageData;

	$: project = data.project;
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
			<Projects projects={project.restProjects} section={project.section} />
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
		width: 100%;
		margin: 0 auto;
		margin-bottom: 50px;
		padding-top: 15px;

		font-weight: 700;
		font-size: 28px;
		line-height: 1.5;
		font-family: Volkhov, Times, serif;
		color: #000;
		font-style: normal;
	}

	.project__image {
		position: relative;
		width: 100%;
		overflow: hidden;
		margin-bottom: 100px;
	}

	.projects {
		padding-top: 50px;
		margin-top: 100px;
		border-top: 1px solid #d8d8d8;
	}
	@media (min-width: 768px) {
		.project {
			width: 90%;
			padding-top: 50px;
		}
		.project__wrapper {
			margin-bottom: 100px;
		}
		.project__title {
			font-size: 46px;
			margin-bottom: 85px;
			padding-top: 0;
			align-self: center;

			font-weight: 400;
		}

		.project__image {
			grid-column: 2 / -1;
			grid-row: 1 / 3;
			height: fit-content;
			margin-bottom: 0;
		}

		.projects {
			grid-column: 1 / -1;
		}
	}
	@media (min-width: 1200px) {
		.project {
			width: 100%;
			padding-top: 150px;
			border-top: none;
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
			width: 100%;
			overflow: hidden;
			margin-bottom: 100px;
		}
	}
</style>
