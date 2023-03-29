<script lang="ts">
	import Editor from '@tinymce/tinymce-svelte';
	import { conf } from '$lib/utils/tinymce';

	export let value = '';
	export let id = '';
	export let label = '';
	export let name = '';
</script>

{#if label}
	<p class="main-page__label">{label}</p>
{/if}
<Editor {id} scriptSrc="/tinymce/tinymce.min.js" {conf} bind:value />
<textarea class="editor__textarea" {name} bind:value />

<style>
	.editor__textarea {
		display: none;
	}
</style>
