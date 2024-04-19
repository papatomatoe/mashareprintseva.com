<script lang="ts">
	import Form from '$lib/components/Form.svelte';
	import Input from '$lib/components/Input.svelte';
	import File from '$lib/components/File.svelte';

	let title = '';
	let titleError = '';
	let link = '';
	let linkError = '';
	let icons: FileList | null = null;
	let iconsError = '';

	const handleClearTitleError = () => {
		titleError = '';
	};
	const handleClearLinkError = () => {
		linkError = '';
	};
	const handleClearIconsError = () => {
		iconsError = '';
	};
</script>

<Form title="New Item">
	<div class="form__fields form__fields--top">
		<Input label="id" name="id" disabled />
		<Input
			label="title"
			name="title"
			placeholder="enter title"
			error={titleError}
			bind:value={title}
			on:clearError={handleClearTitleError}
			required
		/>
	</div>
	<div class="form__fields">
		<Input
			label="link"
			name="link"
			placeholder="enter link"
			error={linkError}
			bind:value={link}
			on:clearError={handleClearLinkError}
			required
		/>
	</div>
	<div class="form__fields">
		<File
			name="image"
			label="image"
			placeholder="Drag 'n' drop image here, or click to select image"
			required
			error={iconsError}
			bind:files={icons}
			on:clearError={handleClearIconsError}
		/>
	</div>
</Form>

<style>
	.form__fields {
		grid-column: 1 / -1;
		display: grid;
		width: 50%;
	}

	.form__fields--top {
		width: 50%;
		grid-template-columns: 60px 1fr;
		gap: 31px;
	}
</style>
