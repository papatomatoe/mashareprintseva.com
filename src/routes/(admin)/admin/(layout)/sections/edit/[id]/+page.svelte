<script lang="ts">
	import SectionForm from '$lib/components/SectionForm.svelte';
	import type { ActionData, PageData } from './$types.js';

	export let data: PageData;
	export let form: ActionData;

	$: console.log(form);

	$: section = data.section;
</script>

<SectionForm {section} {form} />

<style>
</style>
