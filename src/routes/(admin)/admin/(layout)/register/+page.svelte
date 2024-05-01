<script lang="ts">
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';

	import type { ActionData } from './$types';

	export let form: ActionData;
</script>

<div class="container">
	<h1 class="title">Registration</h1>

	<form
		class="form"
		method="POST"
		use:enhance={() => {
			return async ({ result }) => {
				invalidateAll();
				await applyAction(result);
			};
		}}
	>
		<label class="form__field">
			<span class="form__label">Username</span>
			<input class="form__input" type="text" name="username" required />
		</label>
		<label class="form__field">
			<span class="form__label">Password</span>
			<input class="form__input" type="password" name="password" required />
		</label>

		{#if form?.user}
			<p class="error">Username is taken</p>
		{/if}
		<button type="submit">Register</button>
	</form>
</div>

<style>
</style>
