<script lang="ts">
	import type { PageData } from './$types';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();
	const bio = $derived(data.bio);
</script>

<div class="bio">
	<div class="bio__section">
		<img class="bio__image" src={bio.image} alt="Masha Reprintseva" />
	</div>

	<section class="bio__section">
		<h2 class="v-h">Bio Description</h2>
		<p class="bio__epigraph">{bio.epigraph}</p>

		<div class="bio__content">
			{@html bio.content}
		</div>
	</section>
</div>

<style>
	.bio {
		padding-top: 20px;
		height: 100%;
	}
	.bio__section {
		width: 100%;
	}

	.bio__epigraph {
		margin-bottom: 30px;

		border-top: 1px solid var(--color--gray-85);
		border-bottom: 1px solid var(--color--gray-85);
		padding: 20px 0;
		color: var(--color--black);
		font-style: normal;

		font-weight: bold;
		font-size: 17px;
		line-height: 1.5;
		font-family: var(--font--secondary);
		letter-spacing: -0.4px;
	}

	@media (min-width: 768px) {
		.bio__image {
			display: block;
			margin: 30px auto 50px;
			padding-bottom: 0;
			width: 540px;
			height: 340px;
		}

		.bio__epigraph {
			margin: 5px auto 30px;
		}
	}
	@media (min-width: 1200px) {
		.bio {
			border: none;
			width: 100%;
		}
		.bio__image {
			margin: 40px auto 60px;
			width: 665px;
			height: 445px;
		}
		.bio__epigraph {
			margin-top: 40px;
			margin-bottom: 40px;
			padding: 40px 0;
			width: 100%;
		}
	}
</style>
