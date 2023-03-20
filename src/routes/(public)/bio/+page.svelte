<script lang="ts">
	import type { PageData } from './$types';

	export let data: PageData;

	$: bio = data.bio;
</script>

{#if bio}
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
{/if}

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
		padding: 20px 0;

		font-weight: bold;
		font-size: 17px;
		line-height: 1.5;
		font-family: 'Volkhov', 'Times', serif;
		color: #000000;
		font-style: normal;
		letter-spacing: -0.4px;

		border-top: 1px solid #d8d8d8;
		border-bottom: 1px solid #d8d8d8;
	}

	@media (min-width: 768px) {
		.bio__image {
			display: block;
			width: 540px;
			height: 340px;
			margin: 30px auto 50px;
			padding-bottom: 0;
		}

		.bio__epigraph {
			margin: 5px auto 30px;
		}
	}
	@media (min-width: 1200px) {
		.bio {
			width: 100%;
			border: none;
		}
		.bio__image {
			margin: 40px auto 60px;
			width: 665px;
			height: 445px;
		}
		.bio__epigraph {
			width: 100%;
			margin-top: 40px;
			margin-bottom: 40px;
			padding: 40px 0;
		}
	}
</style>
