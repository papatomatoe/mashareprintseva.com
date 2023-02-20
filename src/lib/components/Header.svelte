<script lang="ts">
	import { page } from '$app/stores';
	import { Logo, Nav } from '$lib/components';

	export let menu: any;
	export let social: any;

	const HOME_PATH = '/';
	let isMenuOpened = false;

	const handleOpenMenu = () => {
		isMenuOpened = true;
	};
	const handleCloseMenu = () => {
		isMenuOpened = false;
	};

	$: currentPath = $page.url.pathname;
</script>

<header class="header" class:inactive={isMenuOpened}>
	{#if currentPath === HOME_PATH}
		<!-- svelte-ignore a11y-missing-attribute -->
		<a class="header__logo" aria-label="Logo Masha Reprintseva">
			<Logo />
		</a>
	{:else}
		<a class="header__logo" href={HOME_PATH} aria-label="Logo Masha Reprintseva">
			<Logo />
		</a>
	{/if}
	<button
		class="header__button"
		type="button"
		aria-label="open main menu"
		on:click={handleOpenMenu}
	>
		<svg width="25" height="21" viewBox="0 0 25 21" xmlns="http://www.w3.org/2000/svg">
			<path d="M0 1.50015H25M0 10.5002H25M0 19.5002H25" stroke-width="3" />
		</svg>
	</button>

	<Nav {menu} {social} {isMenuOpened} on:close={handleCloseMenu} />
</header>

<style>
	.header {
		position: sticky;
		top: 0;
		z-index: 10;

		padding: 20px 0 15px;

		background-color: var(--color-bg);

		margin: 0 auto;

		display: grid;
		width: 87%;

		border-top: none;

		grid-template-columns: 2fr auto;
	}
	.header__logo {
		display: block;
		height: auto;
	}
	.header__button {
		padding: 0 10px;
		background-color: transparent;
		border: none;
	}
	.header__button svg {
		stroke-width: 3;
		stroke: var(--color-accent);
	}

	.inactive {
		top: 100vh;
		transition: top 0.2s linear;
	}

	@media (min-width: 768px) {
		.header {
			padding-top: 30px;
			padding-bottom: 20px;

			gap: 10px;
			grid-template-columns: none;
			grid-template-rows: 1fr 1fr;
		}

		.header__button {
			display: none;
		}
	}

	@media (min-width: 1200px) {
		.header {
			padding-top: 50px;
			padding-bottom: 30px;
			padding-left: 10px;
			padding-right: 10px;

			border: none;

			width: 1140px;

			gap: 0;
			grid-template-columns: 210px auto;
			grid-template-rows: none;
		}
		.header__logo {
			transition: opacity 0.3s linear;
		}
		.header__logo[href]:hover,
		.header__logo[href]:focus {
			opacity: 0.7;
			transition: opacity 0.3s linear;
		}
		.header__logo[href]:active {
			opacity: 0.4;
		}
	}
</style>
