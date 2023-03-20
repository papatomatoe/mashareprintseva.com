<script lang="ts">
	import Editor from '@tinymce/tinymce-svelte';
	import { conf } from '$lib/utils/tinymce';

	export let value = '';
	export let id = '';
	export let label = '';
</script>

{#if label}
	<p class="main-page__label">{label}</p>
{/if}
<Editor {id} scriptSrc="/tinymce/tinymce.min.js" {conf} bind:value />
