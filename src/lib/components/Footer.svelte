<script lang="ts">
	import SocialItem from './Social.svelte';
	import type { Social } from '$lib/types/socials';
	let { social }: { social: Social[] } = $props();
</script>

<footer class="footer">
	<div class="footer__wrapper">
		<SocialItem items={social} place="footer" />
	</div>
	<p class="footer__copy">&copy; {new Date().getFullYear()} by Masha Reprintseva</p>
</footer>

<style>
	.footer {
		padding-bottom: 20px;
		display: block;
		width: 87%;
		margin: 0 auto;
	}

	.footer__wrapper {
		border-top: 1px solid var(--color--gray-85);
		border-bottom: 1px solid var(--color--gray-85);
	}

	.footer__copy {
		margin-top: 20px;
		margin-bottom: 0;

		font-weight: 400;
		font-size: 12px;
		line-height: 1.5;
		font-family: var(--font--secondary);
		text-align: center;
		color: var(--color--gray-50);
		font-style: normal;
	}
	@media (min-width: 768px) {
		.footer {
			padding-bottom: 30px;
		}
	}
	@media (min-width: 1200px) {
		.footer {
			border-top: 1px solid var(--color--gray-85);
			width: 100%;
			padding-top: 25px;
			padding-bottom: 25px;
			display: flex;
			justify-content: space-between;
			flex-direction: row-reverse;
		}
		.footer__wrapper {
			border: none;
		}
	}
</style>
