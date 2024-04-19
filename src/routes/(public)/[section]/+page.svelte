<script lang="ts">
	import type { PageData } from './$types';

	import Projects from '$lib/components/Projects.svelte';

	export let data: PageData;

	$: section = data.section;
</script>

{#if section}
	<div class="section">
		<h1 class="section__title">{section.alternativeTitle || section.title}</h1>
		{#if section.subtitle}
			<p class="section__subtitle">{section.subtitle}</p>
		{/if}
		<section class="section__description">
			<h2 class="v-h">Section description</h2>

			<div class="section__image">
				<img src={section.image} alt={section.title} />
			</div>
			<div class="section__content">
				{@html section.description}
			</div>
		</section>
		<section class="section__projects">
			<h2 class="section__title">Projects</h2>

			{#if section.projects.length}
				<Projects projects={section.projects} section={section.slug} />
			{:else}
				<p class="section__no-projects">The category contains no projects yet. Checkout soon...</p>
			{/if}
		</section>
	</div>
{/if}

<style>
	.section {
		display: block;
		padding-top: 20px;
		height: 100%;

		border-top: 1px solid #d8d8d8;
	}
	.section__title {
		margin-bottom: 50px;

		font-weight: bold;
		font-size: 28px;
		line-height: 1.5;
		font-family: 'Volkhov', 'Times', serif;
		color: #000000;
		font-style: normal;
	}
	.section__subtitle {
		margin-bottom: 60px;
		font-weight: bold;
		font-size: 14px;
		line-height: 1.5;
		font-family: 'Volkhov', 'Times', serif;
		color: #656565;
		font-style: normal;
	}
	.section__description {
		padding-bottom: 30px;
		margin-bottom: 50px;
		border-bottom: 1px solid #d8d8d8;
	}
	.section__image {
		width: 100%;
		overflow: hidden;
		position: relative;
		margin-bottom: 70px;
	}

	.section__no-projects {
		margin: 40px 0;
	}

	@media (min-width: 768px) {
		.section__title {
			margin-top: 30px;
			margin-bottom: 0;
			font-size: 24px;
		}
		.section__subtitle {
			margin-top: 30px;
			margin-bottom: 20px;
		}
		.section__description {
			display: grid;
			align-items: start;

			grid-template-columns: min-content 1fr;
			margin-top: 45px;
			padding-bottom: 60px;

			gap: 50px;
		}
		.section__image {
			width: 237px;
			height: 316px;
			overflow: hidden;
			position: relative;
			grid-row: 1 / -1;
		}

		.section__no-projects {
			margin: 40px 0 0;
		}
	}
	@media (min-width: 1200px) {
		.section {
			width: 100%;
			border: none;
		}
		.section__description {
			gap: 70px;
		}
	}
</style>
