<script lang="ts">
	import { page } from '$app/state';

	const handleGoBack = () => {
		history.back();
	};
</script>

<section class="error">
	{#if page.status === 404}
		<h2 class="error__title">Page not found...</h2>
		<ul class="error__buttons">
			<li>
				<button class="error__button" type="button" onclick={handleGoBack}>go back</button>
			</li>
			<li>
				<a href="/" class="error__button">home</a>
			</li>
		</ul>
	{/if}
</section>

<style>
	.error {
		display: flex;
		flex-direction: column;
		justify-content: center;
		align-items: center;
		height: 100%;
	}
	.error__title {
		margin: 0;
		color: var(--color--primary);
		font-size: 24px;
	}

	.error__buttons {
		display: flex;
		justify-content: center;
		gap: 20px;
		margin-top: 30px;
	}

	.error__button {
		display: block;
		cursor: pointer;
		border: none;
		background-color: transparent;
		padding: 0;
		color: var(--color--black);
		font-size: 15px;
		line-height: 1.5;
		font-family: var(--font--primary);
		text-decoration: underline;
	}
	.error__button:hover,
	.error__button:focus {
		color: var(--color--primary);
	}
	.error__button:active {
		opacity: 0.7;
	}
</style>
