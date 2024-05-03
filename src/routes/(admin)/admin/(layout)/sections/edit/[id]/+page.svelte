<script lang="ts">
	import SectionForm from '$lib/components/SectionForm.svelte';
	import type { ActionData, PageData } from './$types.js';

	export let data: PageData;
	export let form: ActionData;

	$: section = data.section;
</script>

<SectionForm {section} {form} />
