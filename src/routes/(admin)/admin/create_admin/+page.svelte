<script lang="ts">
	import { superForm } from 'sveltekit-superforms';
	import type { PageData } from './$types';
	import { page } from '$app/state';
	import { toast } from 'svelte-sonner';
	import Logo from '$/lib/components/Logo.svelte';
	import * as Form from '$lib/components/ui/form/index.js';
	import { Button } from '$lib/components/ui/button/index.js';
	import { Input } from '$lib/components/ui/input/index.js';
	import * as Card from '$lib/components/ui/card/index.js';

	type Props = {
		data: PageData;
	};

	let { data }: Props = $props();

	const form = superForm(data.form, {
		resetForm: false
	});
	const { form: formData, message, enhance } = form;

	const pageTitle = $derived(page.data.pageTitle);

	$effect(() => {
		if ($message) {
			toast.error($message.message);
		}
	});
</script>

<svelte:head>
	<title>{pageTitle}</title>
</svelte:head>

<div class="grid h-full place-items-center">
	<Card.Root class="w-full max-w-sm">
		<Card.Header>
			<div><Logo /></div>
		</Card.Header>
		<Card.Content>
			<form id="login" method="POST" use:enhance>
				<Form.Field {form} name="email">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Email</Form.Label>
							<Input {...props} bind:value={$formData.email} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="password">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Password</Form.Label>
							<Input {...props} type="password" bind:value={$formData.password} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
				<Form.Field {form} name="confirmPassword">
					<Form.Control>
						{#snippet children({ props })}
							<Form.Label>Confirm Password</Form.Label>
							<Input {...props} type="password" bind:value={$formData.confirmPassword} />
						{/snippet}
					</Form.Control>
					<Form.FieldErrors />
				</Form.Field>
			</form>
		</Card.Content>
		<Card.Footer class="flex-col gap-2">
			<Button form="login" type="submit" class="w-full">Login</Button>
		</Card.Footer>
	</Card.Root>
</div>
