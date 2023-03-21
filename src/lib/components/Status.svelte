<script lang="ts">
	export let title = '';
	export let published: boolean | undefined;
</script>

<div class="status" class:status--dot={!title} class:status--published={published}>{title}</div>

<style>
	.status {
		width: 77px;
		color: #822121;
		background-color: #f39090;
		padding: 0 10px;
		border-radius: 4px;
		text-align: center;
	}
	.status--published {
		color: #21824e;
		background-color: #90f3be;
	}

	.status--dot {
		width: 7px;
		height: 7px;
		border-radius: 50%;
	}
</style>
