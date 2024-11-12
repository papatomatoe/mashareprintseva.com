<script lang="ts">
	import MainMenu from './Menu.svelte';
	import SocialItem from './Social.svelte';
	import type { Social } from '$lib/types/socials';
	import type { Menu } from '$lib/types/menu';

	let {
		menu,
		social,
		isMenuOpened,
		onClose
	}: { menu: Menu[]; social: Social[]; isMenuOpened: boolean; onClose: () => void } = $props();
</script>

<nav class="nav" class:nav--show={isMenuOpened}>
	<div class="nav__container">
		<p class="nav__title">Menu</p>
		<MainMenu items={menu} {onClose} />
		<SocialItem place="header" items={social} {onClose} />

		<button class="nav__button" type="button" aria-label="close main menu" onclick={onClose}>
			<svg width="24" height="23" viewBox="0 0 24 23" xmlns="http://www.w3.org/2000/svg">
				<path d="M22 21.799L2.20102 2.00003M2 21.7991L21.7989 2" stroke-width="3" />
			</svg>
		</button>
	</div>
</nav>

<style>
	.nav {
		position: fixed;
		top: 0;
		left: 0;

		display: flex;
		width: 100%;
		height: 100%;
		overflow-y: auto;

		background-color: var(--color--gray-15);
		transform: translateY(-110%);

		transition: transform 0.2s linear;
	}
	.nav__container {
		width: 87%;
		margin: 0 auto;

		display: flex;
		flex-direction: column;
		justify-content: space-between;
		height: 100%;
		padding-top: 20px;
		padding-bottom: 20px;

		border-top: none;
	}
	.nav__title {
		margin: 0;
		margin-bottom: auto;

		font-weight: 400;
		font-size: 22px;
		line-height: 1.5;
		font-family: var(--font--secondary);
		color: var(--color--gray-95);
		font-style: normal;
	}

	.nav__button {
		display: block;
		margin: 0 auto;
		margin-top: 25px;
		padding: 10px;
		background-color: transparent;
		border: none;
	}
	.nav__button svg {
		stroke: var(--color--white);
		stroke-width: 3;
	}
	.nav--show {
		z-index: 100;

		transform: translateY(0);

		transition: transform 0.2s linear;
	}
	@media (orientation: landscape) {
		.nav__container {
			height: calc(100% + 200px);
		}
	}
	@media (min-width: 768px) {
		.nav {
			position: relative;

			display: block;

			background-color: transparent;
			transform: translateX(0);

			transition: none;
		}
		.nav__container {
			flex-direction: row;
			width: 100%;
			height: inherit;
			margin: 0;
			margin-left: auto;
			padding: 0;
		}
		.nav__title {
			display: none;
		}
		.nav__button {
			display: none;
		}
		.nav__button {
			display: none;
		}
	}
	@media (min-width: 1200px) {
		.nav {
			height: auto;
		}
		.nav__container {
			align-items: center;
			width: 770px;
			height: 100%;
			margin-right: 0;
			margin-left: 60px;
		}
	}
</style>
