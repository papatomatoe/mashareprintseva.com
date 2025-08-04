<script lang="ts">
	import { ADMIN_MENU } from '$lib/constants/adminMenu';
</script>

<h1 class="v-h">Dashboard</h1>

<div class="dashboard">
	<!-- <h2 class="dashboard__title">Sections</h2> -->
	<ul class="dashboard__list">
		<!-- {#each ADMIN_MENU as item (item.id)}
			<li class="dahsboard__item">
				<a class="dashboard__link" href={item.href}>
					<svelte:component this={item.icon} width={30} height={30} />
					<span>{item.title}</span>
				</a>
			</li>
		{/each} -->
	</ul>
</div>

<style>
	.dashboard {
		margin: 135px auto 50px;
		width: 80%;
		max-width: 685px;
	}

	.dashboard__title {
		margin-bottom: 36px;

		color: var(--color--primary);
		font-weight: 600;
		font-size: 16px;
		line-height: 24px;
		text-transform: uppercase;
	}

	.dashboard__list {
		display: grid;
		grid-template-columns: repeat(auto-fill, 125px);
		gap: 15px;
	}

	.dashboard__link {
		display: grid;
		grid-template-rows: 50px min-content;
		align-items: center;
		justify-items: center;
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;
		background: var(--color--white);
		padding: 10px;
		color: var(--color--black);
		font-weight: 400;
	}

	.dashboard__link:hover,
	.dashboard__link:focus-visible {
		border-color: var(--color--primary);
		color: var(--color--primary);
		--color--icon: var(--color--primary);
	}

	.dashboard__link:active {
		border-color: var(--color--gray-85);
		color: var(--color--gray-85);
		--color--icon: var(--color--gray-85);
	}
</style>
