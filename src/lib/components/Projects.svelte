<script lang="ts">
	import type { Project } from '$lib/types/project';
	let { projects, section }: { projects: Project[]; section: string } = $props();
</script>

<ul class="projects">
	{#each projects as project (project.slug)}
		<li class="projects__item">
			<a class="projects__link" href={`/${section}/${project.slug}`}>
				<h3 class="projects__title">{project.title}</h3>
				<div class="projects__image">
					<img src={project.preview} alt={project.title} />
				</div>
			</a>
		</li>
	{/each}
</ul>

<style>
	.projects {
		margin-top: 40px;
	}
	.projects__item {
		margin-bottom: 40pxl;
	}
	.projects__link {
		display: flex;
		flex-direction: column;
		gap: 10px;
		height: 100%;
	}
	.projects__title {
		font-weight: bold;
		font-size: 17px;
		line-height: 24px;
		font-family: var(--font--secondary);
		color: var(--color--gray-30);
		font-style: normal;
	}
	.projects__image {
		width: 100%;
		overflow: hidden;
		position: relative;
	}

	@media (min-width: 768px) {
		.projects {
			display: grid;

			gap: 25px;
			grid-template-columns: 1fr 1fr 1fr;
		}
		.projects__item {
			margin-bottom: 0;
		}

		.projects__title {
			margin-top: auto;
		}
	}
	@media (min-width: 1200px) {
		.projects {
			gap: 80px;
		}

		.projects__title {
			transition: color 0.3s linear;
		}

		.projects__link img {
			transform: scale(1);
			transition: transform 0.2s linear;
		}

		.projects__link:hover img,
		.projects__link:focus-visible img {
			transform: scale(1.04);
		}
		.projects__link:hover .projects__title {
			color: var(--color--primary);
		}
		.projects__link:active img {
			opacity: 0.8;
		}
		.projects__link:active {
			opacity: 0.8;
		}
	}
</style>
