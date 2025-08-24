<script lang="ts">
	import type { Menu } from '$lib/types/menu';
	import type { Social } from '$lib/types/socials';
	import Logo from '$lib/components/Logo.svelte';
	import Nav from '$lib/components/Nav.svelte';

	type Props = { menu: Menu[]; social: Social[] };

	let { menu, social }: Props = $props();

	const HOME_PATH = '/';
	let isMenuOpened = $state(false);

	const handleOpenMenu = () => {
		isMenuOpened = true;
	};
	const handleCloseMenu = () => {
		isMenuOpened = false;
	};
</script>

<header class="header" class:inactive={isMenuOpened}>
	<a class="header__logo" href={HOME_PATH} aria-label="Logo Masha Reprintseva">
		<Logo />
	</a>
	<button class="header__button" type="button" aria-label="open main menu" onclick={handleOpenMenu}>
		<svg width="25" height="21" viewBox="0 0 25 21" xmlns="http://www.w3.org/2000/svg">
			<path d="M0 1.50015H25M0 10.5002H25M0 19.5002H25" stroke-width="3" />
		</svg>
	</button>

	<Nav {menu} {social} {isMenuOpened} onClose={handleCloseMenu} />
</header>

<style>
	.header {
		display: grid;
		position: sticky;
		top: 0;
		grid-template-columns: 2fr auto;
		z-index: 10;
		margin: 0 auto;
		border-top: none;
		background-color: var(--color--white);
		padding: 20px 0 15px;
		width: 87%;
	}
	.header__logo {
		display: block;
		width: fit-content;
		height: auto;
	}
	.header__button {
		border: none;
		background-color: transparent;
		padding: 0 10px;
	}
	.header__button svg {
		stroke-width: 3;
		stroke: var(--color--primary);
	}

	.inactive {
		top: 100vh;
		transition: top 0.2s linear;
	}

	@media (min-width: 768px) {
		.header {
			grid-template-rows: 1fr 1fr;
			grid-template-columns: none;

			gap: 10px;
			padding-top: 30px;
			padding-bottom: 20px;
		}

		.header__button {
			display: none;
		}
	}

	@media (min-width: 1200px) {
		.header {
			grid-template-rows: none;
			grid-template-columns: 210px auto;

			gap: 0;

			border: none;
			padding-top: 50px;
			padding-right: 10px;
			padding-bottom: 30px;
			padding-left: 10px;

			width: 1140px;
		}
		.header__logo {
			transition: opacity 0.3s linear;
		}
		.header__logo[href]:hover,
		.header__logo[href]:focus-visible {
			opacity: 0.7;
			transition: opacity 0.3s linear;
		}
		.header__logo[href]:active {
			opacity: 0.4;
		}
	}
</style>
