<script lang="ts">
	import { page } from '$app/stores';
	import { applyAction, enhance } from '$app/forms';
	import { invalidateAll } from '$app/navigation';
	import type { ActionData } from './$types';

	import Logo from '$lib/components/Logo.svelte';

	export let form: ActionData;

	let invalid = false;
	let credentials = false;
	let username = '';
	let password = '';
	let usernameError = '';
	let passwordError = '';

	const handleClearErrors = () => {
		invalid = false;
		credentials = false;
	};

	const handleClearUsernameErrors = () => {
		handleClearErrors();
		usernameError = '';
	};
	const handleClearPasswordErrors = () => {
		handleClearErrors();
		passwordError = '';
	};

	const handleSubmit = (e: Event) => {
		if (!username) usernameError = 'This value is required';
		if (!password) passwordError = 'This value is required';
		if (!username || !password) {
			e.preventDefault();
			return;
		}
	};

	$: invalid = form?.invalid;
	$: credentials = form?.credentials;
	$: pageTitle = $page.data.pageTitle;
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="container">
	<form
		class="form"
		action="?/login"
		method="POST"
		on:submit={handleSubmit}
		use:enhance={() => {
			return async ({ result }) => {
				invalidateAll();
				await applyAction(result);
			};
		}}
	>
		<h1 class="v-h">Login</h1>
		<div class="form__logo"><Logo /></div>
		<div class="form__fields">
			<label class="form__field">
				<span class="form__label">Username</span>
				<input
					class="form__input"
					class:form__input--error={usernameError}
					type="text"
					name="username"
					bind:value={username}
					on:input={handleClearUsernameErrors}
					placeholder="enter username"
				/>
				{#if usernameError}
					<p class="form__field-error">{usernameError}</p>
				{/if}
			</label>
			<label class="form__field"
				><span class="form__label">Password</span>
				<input
					class="form__input"
					class:form__input--error={passwordError}
					type="password"
					name="password"
					bind:value={password}
					on:input={handleClearPasswordErrors}
					placeholder="enter password"
				/>
				{#if passwordError}
					<p class="form__field-error">{passwordError}</p>
				{/if}
			</label>

			{#if credentials}
				<p class="form__error">Invalid credentials</p>
			{/if}

			<button class="button form__submit" type="submit">Log in</button>
		</div>
	</form>
</div>

<style>
	.container {
		height: 100%;
		display: grid;
		align-items: center;
	}
	.form {
		max-width: 424px;
		width: 80%;
		margin: 0 auto;
		background: var(--color--white);
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;
	}
	.form__logo {
		padding: 28px;
		display: grid;
		place-items: center;
		border-bottom: 1px solid var(--color--gray-85);
	}

	.form__fields {
		position: relative;
		padding: 50px 0;
		margin: 0 auto;
		width: 90%;
		max-width: 287px;
		display: grid;
		gap: 23px;
	}

	.form__field {
		position: relative;
		display: grid;
	}

	.form__label {
		font-size: 15px;
		line-height: 23px;
		color: var(--color--gray-15);
	}

	.form__input {
		padding: 5px 10px;
		background: var(--color--white);
		border: 1px solid var(--color--gray-85);
		border-radius: 4px;

		font-weight: 300;
		font-size: 14px;
		line-height: 23px;
		font: var(--font--primary);
		color: var(--color--gray-30);
		outline: none;

		transition: border-color 0.3s linear;
	}

	.form__input:hover {
		border-color: var(--color--gray-30);
	}

	.form__input:focus-visible {
		border-color: var(--color--primary);
	}

	.form__input--error {
		border-color: var(--color--red);
	}

	.form__input::placeholder {
		font-weight: 300;
		font-size: 14px;
		line-height: 23px;
		color: var(--color--gray-85);
	}

	.form__field-error {
		position: absolute;
		top: 100%;
		font-weight: 300;
		font-size: 9px;
		line-height: 14px;

		color: var(--color--red);
	}

	.form__error {
		position: absolute;
		width: 100%;
		left: 0;
		bottom: 108px;
		background-color: var(--color--red);
		color: var(--color--white);
		padding: 5px;
		text-align: center;
	}

	.form__submit {
		margin-top: 56px;
		text-transform: uppercase;
	}
</style>
