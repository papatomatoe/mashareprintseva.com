<script lang="ts">
	import { ADMIN_MENU } from '$lib/constants/adminMenu';
</script>

<h1 class="v-h">Dashboard</h1>

<div class="dashboard">
	<h2 class="dashboard__title">Sections</h2>
	<ul class="dashboard__list">
		{#each ADMIN_MENU as item (item.id)}
			<li class="dahsboard__item">
				<a class="dashboard__link" href={item.href}>
					<svelte:component this={item.icon} width={30} height={30} />
					<span>{item.title}</span>
				</a>
			</li>
		{/each}
	</ul>
</div>

<style>
	.dashboard {
		width: 80%;
		max-width: 685px;
		margin: 135px auto 50px;
	}

	.dashboard__title {
		margin-bottom: 36px;
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
		text-transform: uppercase;

		color: #8a6f48;
	}

	.dashboard__list {
		display: grid;
		grid-template-columns: repeat(auto-fill, 125px);
		gap: 15px;
	}

	.dashboard__link {
		display: grid;
		grid-template-rows: 50px min-content;
		padding: 10px;
		background: #ffffff;
		border: 1px solid #d8d8d8;
		border-radius: 4px;
		align-items: center;
		justify-items: center;
		font-weight: 400;
		color: #000;
	}

	.dashboard__link:hover,
	.dashboard__link:focus-visible {
		border-color: #8a6f48;
		color: #8a6f48;
		--color-icon: #8a6f48;
	}

	.dashboard__link:active {
		border-color: #d8d8d8;
		color: #d8d8d8;
		--color-icon: #d8d8d8;
	}
</style>
