<script lang="ts">
	import Switch from '$lib/components/Switch.svelte';
	export let title = '';
</script>

<form class="form" method="POST" on:submit>
	<div class="form__top">
		<h1 class="form__title">{title}</h1>
		<Switch name="published" label="published" />
		<button class="button form__submit" type="submit">save</button>
	</div>
	<div class="form__bottom">
		<slot />
	</div>
</form>

<style>
	.form {
		padding: 60px;
	}
	.form__top {
		display: flex;
		align-items: center;
		padding: 0 0 21px;
		margin-bottom: 43px;
		gap: 43px;
		border-bottom: 1px solid #d9d9d9;
	}
	.form__title {
		margin-right: auto;

		font-weight: 700;
		font-size: 24px;
		line-height: 36px;
	}
	.form__submit {
		width: 84px;
	}
	.form__bottom {
		display: grid;
		grid-template-columns: 1fr 1fr;
		gap: 37px;
	}
</style>
