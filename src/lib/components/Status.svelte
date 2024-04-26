<script lang="ts">
	export let title = '';
	export let published: boolean | undefined;
</script>

<div class="status" class:status--dot={!title} class:status--published={published}>{title}</div>

<style>
	.status {
		width: 77px;
		color: var(--color--red-dark);
		background-color: var(--color--red-light);
		padding: 0 10px;
		border-radius: 4px;
		text-align: center;
	}
	.status--published {
		color: var(--color--green-dark);
		background-color: var(--color--green-light);
	}

	.status--dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
	}
</style>
