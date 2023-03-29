<script lang="ts">
	import { fly } from 'svelte/transition';
	import { Clear } from '$lib/components/icons';

	export let message = '';
	export let type: 'success' | 'error' | 'default' = 'default';
	export let show = false;
	export let duration = 5000;

	let timeout: NodeJS.Timeout;

	$: if (show) {
		timeout = setTimeout(() => {
			show = false;
		}, duration);
	}

	const handleCloseNotification = () => {
		show = false;
		clearTimeout(timeout);
	};
</script>

{#if show}
	<div class="container">
		<div transition:fly={{ x: 200, duration: 300 }} class="notification nitification__{type}">
			<p>{message}</p>
			<button class="button notification__button" type="button" on:click={handleCloseNotification}>
				<Clear />
			</button>
		</div>
	</div>
{/if}

<style>
	.container {
		position: absolute;
		width: 100%;
		height: 100%;
		top: 0;
		left: 0;
		overflow: hidden;
		pointer-events: none;
	}
	.notification {
		position: absolute;
		top: 100px;
		right: 20px;
		width: 250px;
		min-height: 50px;
		background-color: #fff;
		border-radius: 4px;
		box-shadow: 0px 4px 15px -2px rgba(0, 0, 0, 0.2);
		pointer-events: all;
	}
	.notification__button {
		position: absolute;
		width: 30px;
		height: 30px;
		display: grid;
		place-items: center;
		padding: 0;
		background-color: #fff;
		--color-icon: #d8d8d8;
		top: 0;
		right: 0;
	}
</style>
