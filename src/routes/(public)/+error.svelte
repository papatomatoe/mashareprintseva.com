<script lang="ts">
	import { page } from '$app/stores';

	const handleGoBack = () => {
		history.back();
	};
</script>

<section class="error">
	{#if $page.status === 404}
		<h2 class="error__title">Page not found...</h2>
		<ul class="error__buttons">
			<li>
				<button class="error__button" type="button" on:click={handleGoBack}>go back</button>
			</li>
			<li>
				<a href="/" class="error__button">home</a>
			</li>
		</ul>
	{/if}
</section>

<style>
	.error {
		height: 100%;
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
	}
	.error__title {
		margin: 0;
		font-size: 24px;
		color: var(--color--primary);
	}

	.error__buttons {
		display: flex;
		justify-content: center;
		margin-top: 30px;
		gap: 20px;
	}

	.error__button {
		display: block;
		padding: 0;
		background-color: transparent;
		border: none;
		text-decoration: underline;
		font-family: var(--font--primary);
		color: var(--color--black);
		cursor: pointer;
		line-height: 1.5;
		font-size: 15px;
	}
	.error__button:hover,
	.error__button:focus {
		color: var(--color--primary);
	}
	.error__button:active {
		opacity: 0.7;
	}
</style>
